import { handleAppError } from "./app-errors.js";

// App statuses
export const NOT_LOADED = "NOT_LOADED"; // The app has not been loaded
export const LOADING_SOURCE_CODE = "LOADING_SOURCE_CODE"; // The app is loading source code
export const NOT_BOOTSTRAPPED = "NOT_BOOTSTRAPPED"; // The app has loaded source code but not bootstrapped
export const BOOTSTRAPPING = "BOOTSTRAPPING"; // The app is bootstrapping
export const NOT_MOUNTED = "NOT_MOUNTED"; // The app has been bootstrapped but not mounted
export const MOUNTING = "MOUNTING"; // The app is mounting
export const MOUNTED = "MOUNTED"; // The app is mounted
export const UPDATING = "UPDATING"; // The app is updating
export const UNMOUNTING = "UNMOUNTING"; // The app is unmounting
export const UNLOADING = "UNLOADING"; // The app is unloading
export const LOAD_ERROR = "LOAD_ERROR"; // The app errored while loading
export const SKIP_BECAUSE_BROKEN = "SKIP_BECAUSE_BROKEN"; // The app errored while loading
export function isActive(app) {
    return app.status === MOUNTED;
}

export function shouldBeActive(app) {
    try {
        return app.activeWhen(window.location);
    } catch (err) {
        handleAppError(err, app, SKIP_BECAUSE_BROKEN);
        return false;
    }
}

export function toName(app) {
    return app.name;
}

export function isParcel(appOrParcel) {
    return Boolean(appOrParcel.unmountThisParcel);
}

export function objectType(appOrParcel) {
    return isParcel(appOrParcel) ? "parcel" : "application";
}
