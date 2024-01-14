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

function render(el, container) {
    const dom = el.type === 'TEXT_ELEMENT' ? document.createTextNode("") : document.createElement(el.type)
    Object.keys(el.props).forEach((key) => {
        if(key !== 'children') {
            dom[key] = el.props[key]
        }
    });
    const childs = el.props.children
    childs.forEach(child => {
        render(child, dom)
    })
    container.append(dom)
}

const React = {
    render,
    createElement
}
export default React