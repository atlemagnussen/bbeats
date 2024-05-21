declare const self: ServiceWorkerGlobalScope

import {precacheAndRoute, createHandlerBoundToURL} from "workbox-precaching"
import {clientsClaim} from "workbox-core"
import {registerRoute, NavigationRoute} from "workbox-routing"

// declare var clients: Clients
clientsClaim()

// Use the imported Workbox libraries to implement caching,
precacheAndRoute(self.__WB_MANIFEST)

const handler = createHandlerBoundToURL('/index.html')
const navigationRoute = new NavigationRoute(handler, {
    denylist: [
        new RegExp('/callback.html'),
        new RegExp('/silent-renew.html')
    ]
})
registerRoute(navigationRoute)

addEventListener("message", (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting()
    }
})