import {
    LOAD_ERROR,
    NOT_BOOTSTRAPPED,
    LOADING_SOURCE_CODE,
    SKIP_BECAUSE_BROKEN,
    NOT_LOADED,
    objectType,
    toName,
} from "../applications/app.helpers.js";
import { ensureValidAppTimeouts } from "../applications/timeouts.js";
import {
    handleAppError,
    formatErrorMessage,
} from "../applications/app-errors.js";
import {
    flattenFnArray,
    smellsLikeAPromise,
    validLifecycleFn,
} from "./lifecycle.helpers.js";
import { getProps } from "./prop.helpers.js";
import { assign } from "../utils/assign.js";
window.__DEV__ = true;
export function toLoadPromise(app) {
    return Promise.resolve().then(() => {
        if (app.loadPromise) {
            return app.loadPromise;
        }

        if (app.status !== NOT_LOADED && app.status !== LOAD_ERROR) {
            return app;
        }

        app.status = LOADING_SOURCE_CODE;
        let appOpts, isUserErr;
        return (app.loadPromise = Promise.resolve()
            .then(() => {
                const loadPromise = app.loadApp(getProps(app));

                console.log("log===loadPromise1=======>>>")
                return loadPromise.then((val) => {
                    console.log("log===loadPromise2=======>>>", val)
                    app.loadErrorTime = null;

                    appOpts = val;

                    let validationErrMessage, validationErrCode;

                    const type = objectType(appOpts);

                    if (appOpts.devtools && appOpts.devtools.overlays) {
                        app.devtools.overlays = assign({},
                            app.devtools.overlays,
                            appOpts.devtools.overlays
                        );
                    }

                    app.status = NOT_BOOTSTRAPPED;
                    app.bootstrap = flattenFnArray(appOpts, "bootstrap");
                    app.mount = flattenFnArray(appOpts, "mount");
                    app.unmount = flattenFnArray(appOpts, "unmount");
                    app.unload = flattenFnArray(appOpts, "unload");
                    app.timeouts = ensureValidAppTimeouts(appOpts.timeouts);

                    delete app.loadPromise;
                    console.log("=============>", app)

                    return app;
                });
            })
            .catch((err) => {
                delete app.loadPromise;

                let newStatus;
                if (isUserErr) {
                    newStatus = SKIP_BECAUSE_BROKEN;
                } else {
                    newStatus = LOAD_ERROR;
                    app.loadErrorTime = new Date().getTime();
                }
                handleAppError(err, app, newStatus);

                return app;
            }));
    });
}
