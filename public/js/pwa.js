document.addEventListener("DOMContentLoaded", init, false);
function init() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then((reg) => {
                console.log("Service-worker registered", reg);
            })
            .catch((err) => {
                console.error("No service-worker registered", err);
            });
    } else {
        console.warn("Service Worker is not supported");
    }
}
