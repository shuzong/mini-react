// v1
// const child =  document.createElement('div')
// child.id = 'oneDom'
// document.querySelector('#root').append(child)

// const t = document.createTextNode("")
// t.nodeValue = 'aaaz';
// child.append(t)

// v2
import ReactDom from './core/ReactDom.js'
import App from './App.js'
ReactDom.createRoot(document.querySelector("#app")).render(App)

