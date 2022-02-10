import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { registerApplication, start } from "./packages/single-spa/single-spa";
window.__DEV__ = true;
Vue.config.productionTip = false;

// 远程加载子应用
function createScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        const firstScript = document.getElementsByTagName("script")[0];
        firstScript.parentNode.insertBefore(script, firstScript);
    });
}

// 记载函数，返回一个 promise
function loadApp(url, globalVar) {
    debugger
    // 支持远程加载子应用
    return async() => {
        await createScript(url + "/js/chunk-vendors.js");
        await createScript(url + "/js/app.js");
        // 这里的return很重要，需要从这个全局对象中拿到子应用暴露出来的生命周期函数
        console.log("log=====window=====>>>", window[globalVar]);
        return window[globalVar];
    };
}

// 子应用列表
const apps = [{
        name: "App1", // 子应用名称
        app: loadApp("http://localhost:8081", "App1"), // 子应用加载函数，是一个promise
        activeWhen: (location) => location.pathname.startsWith("/app1"), // 当路由满足条件时（返回true），激活（挂载）子应用
        customProps: {}, // 传递给子应用的对象
    },
    {
        name: "App2",
        app: loadApp("http://localhost:8082", "App2"),
        activeWhen: (location) => location.pathname.startsWith("/app2"),
        customProps: {},
    },
];

// 注册多个子应用
apps.forEach((app) => {
    registerApplication(app);
});

new Vue({
    router,
    mounted() {
        // 启动  会挂载应用
        start();
    },
    render: (h) => h(App),
}).$mount("#app");

// 获取页面上所有的button
