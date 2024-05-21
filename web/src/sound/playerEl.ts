import { LitElement, css, html } from "lit"
import { customElement } from "lit/decorators.js"
import { play, stop } from "@app/sound/player"

@customElement('b-player')
export class BPlayer extends LitElement {
    static styles = css`
        :host {
            display: block;
            height: 100%;
            border: 1px solid black;
        }
    `
    
    render() {
        return html`
            
            <play-button @click=${play}>Play</play-button>
            <button @click=${stop}>Stop</button>
        `
    }
}
