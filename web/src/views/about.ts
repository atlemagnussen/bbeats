import {SignalWatcher} from "@lit-labs/preact-signals"
import { LitElement, css, html } from "lit"
import { customElement } from "lit/decorators.js"

@customElement('about-view')
export class AboutView extends SignalWatcher(LitElement) {
    static styles = css`
        :host {
            display: flex;
            flex-direction: row;
            padding: 1rem;
            overflow-y: auto;
            height: 100%;
        }
        article {
            flex: 1 1 30%
        }
    `
    
    render() {
        return html`
            <article>
                <p>About</p>
            </article>
        `
    }
}
