let nextOfWork = null;
function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child => {
                return {
                    type: 'TEXT_ELEMENT',
                    props: {
                        nodeValue: child,
                        children: []
                    }
                }

            })
        }
    }
}
function workLoop(deadLine) {
    let shouldYield = false;
    while (!shouldYield && nextOfWork) {
        nextOfWork = performWorkOfUnit(nextOfWork)
        shouldYield = deadLine.timeRemaining() < 1;
    }
    requestIdleCallback(workLoop)
}
function createElementNode(type) {
    return type === 'TEXT_ELEMENT' ? document.createTextNode("") : document.createElement(type)
}
function updateProps(props, dom) {
    Object.keys(props).forEach((key) => {
        if (key !== 'children') {
            dom[key] = props[key]
        }
    });
}
function performWorkOfUnit(work) {
    // 创建dom
    if (!work.dom) {
        const dom = (work.dom = createElementNode(work.type))
        work.parent.dom.append(dom)
        // 处理props
        updateProps(work.props, dom)
    }

    // 转换链表
    const children = work.props.children
    let prevChild = null
    children.forEach((item, index) => {
        const newWork = {
            type: item.type,
            props: item.props,
            parent: work,
            child: null,
            sibiling: null,
            dom: null
        }
        if (index === 0) {
            work.child = newWork
        } else {
            prevChild.sibiling = newWork
        }
        prevChild = newWork
    })
    // 寻找下一个
    if (work.child) {
        return work.child
    }
    if (work.sibiling) {
        return work.sibiling
    }
    return work.parent?.sibiling
}
function render(el, container) {
    nextOfWork = {
        dom: container,
        props: {
            children: [el]
        }
    }
}
requestIdleCallback(workLoop)
const React = {
    render,
    createElement
}
export default React