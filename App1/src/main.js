import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import singleSpaVue from 'single-spa-vue'

Vue.config.productionTip = false

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')


const appOptions = {
    el: '#microApp', // 挂载到父应用的ID 为 microApp的标签中
    router,
    render: h => h(App)
}

// 支持应用独立运行、部署，不依赖于基座应用
if (!window.singleSpaNavigate) {
    delete appOptions.el
    new Vue(appOptions).$mount('#app')
} else {
    // __webpack_public_path__ = ""
}

// 基于基座应用，导出生命周期函数
const vueLifecycle = singleSpaVue({
    Vue,
    appOptions
})

export function bootstrap(props) {
    console.log('app1 bootstrap=============>', props)
    return vueLifecycle.bootstrap(() => {})
}

export function mount(props) {
    console.log('app1 mount')
    return vueLifecycle.mount(() => {})
}

export function unmount(props) {
    console.log('app1 unmount')
    return vueLifecycle.unmount(() => {})
}


function hasChange(a, b, c) {
    console.log("log=1====>", a)
    console.log("log=2====>", b)
    console.log("log=3====>", c)
}

function hasChange1(a, b, c) {
    console.log("log=11====>", a)
    console.log("log=22====>", b)
    console.log("log=33====>", c)
}

// We will trigger an app change for any routing events.
window.addEventListener("hashchange", hasChange);
window.addEventListener("popstate", hasChange1);


// // Monkeypatch addEventListener so that we can ensure correct timing
// const originalAddEventListener = window.addEventListener;
// const originalRemoveEventListener = window.removeEventListener;
// window.addEventListener = function(eventName, fn) {
//     if (typeof fn === "function") {
//         if (
//             routingEventsListeningTo.indexOf(eventName) >= 0 &&
//             !find(capturedEventListeners[eventName], (listener) => listener === fn)
//         ) {
//             capturedEventListeners[eventName].push(fn);
//             return;
//         }
//     }

//     return originalAddEventListener.apply(this, arguments);
// };

// window.removeEventListener = function(eventName, listenerFn) {
//     if (typeof listenerFn === "function") {
//         if (routingEventsListeningTo.indexOf(eventName) >= 0) {
//             capturedEventListeners[eventName] = capturedEventListeners[
//                 eventName
//             ].filter((fn) => fn !== listenerFn);
//             return;
//         }
//     }

//     return originalRemoveEventListener.apply(this, arguments);
// };

// window.history.pushState = patchedUpdateState(
//     window.history.pushState,
//     "pushState"
// );
// window.history.replaceState = patchedUpdateState(
//     window.history.replaceState,
//     "replaceState"
// );

// if (window.singleSpaNavigate) {
//     console.warn(
//         formatErrorMessage(
//             41,
//             __DEV__ &&
//             "single-spa has been loaded twice on the page. This can result in unexpected behavior."
//         )
//     );
// } else {
//     /* For convenience in `onclick` attributes, we expose a global function for navigating to
//      * whatever an <a> tag's href is.
//      */
//     window.singleSpaNavigate = navigateToUrl;
// }
// }
