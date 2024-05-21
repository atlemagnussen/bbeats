import { LitElement, css, html } from "lit"
import { customElement } from "lit/decorators.js"
import { play, playSynth } from "@app/sound/player"

@customElement('home-view')
export class HomeView extends LitElement {
    static styles = css`
        :host {
            display: block;
            padding: 1rem;
            height: 100%;
        }
        canvas-drawer {
            height: 100%;
        }
    `
    
    render() {
        return html`
            <p>Bineural</p>
            <button @click=${playSynth}>Play</button>
        `
    }
}
