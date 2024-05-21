import { Workbox } from "workbox-window"
import config from "./config"

let wb: Workbox
// let swRegistration: ServiceWorkerRegistration | undefined


const setupWb = () => {
    wb = new Workbox("/sw.js")
    
	wb.addEventListener("waiting", () => {
        console.log("waiting, now do skip waiting")
        wb.messageSkipWaiting()
	})
    wb.addEventListener("controlling", () => {
        console.log("now controlling, reload")
        window.location.reload()
    })
	wb.register() //.then(reg => swRegistration = reg)
}

export const readyForData = () => {
    wb.messageSW({readyForData: true})
}

if ('serviceWorker' in navigator) {
    if (config.useSw) {
        console.log("serviceworker enabled")
        setupWb()
    }
    else
        console.log("serviceworker disabled")
}
