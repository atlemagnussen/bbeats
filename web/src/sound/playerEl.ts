import { Signal } from "signal-polyfill"
import { LitElement, css, html } from "lit"
import { customElement } from "lit/decorators.js"
import { play, stop, isPlayingState, playingFreq, freqs } from "@app/sound/player"

@customElement('b-player')
export class BPlayer extends LitElement {
    static styles = css`
        :host {
            display: block;
            height: 100%;
            border: 1px solid black;
        }
    `

    private __watcher = new Signal.subtle.Watcher(() => {
        console.log("signal changed")
        this.requestUpdate()
    })
    
    connectedCallback() {
        super.connectedCallback()
        this.__watcher.watch(isPlayingState)
        this.__watcher.watch(freqs)
    }
    
    changeFreq(e: Event) {
        const target = e.target as HTMLInputElement
        if (target.value) {
            const req = parseFloat(target.value)
            playingFreq.set(req)
        }
    }
    render() {
        let isPlaying = isPlayingState.get()
        let freq = playingFreq.get()
        let frqs = freqs.get()
        return html`
            ${isPlaying ? html`<pause-button @click=${stop}>Stop</pause-button>`:
            html`<play-button @click=${play}>Play</play-button>`}
            
            <input type="number" value=${freq} @change=${this.changeFreq} />
            <p>${frqs.left} | ${frqs.right}</p>
        `
    }
}
