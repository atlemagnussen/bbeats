import { LitElement, css, html } from "lit"
import { customElement } from "lit/decorators.js"

@customElement('t-button')
export class TButton extends LitElement {
    static styles = css`
        :host {
            display: inline-flex;
            color: var(--button-color);
            cursor: pointer;
        }
        button {
            padding: 0.6em 0.3em;
            border: 1px solid rgb(255, 255, 255);
            border-radius: 4px;
            background: rgba(0, 0, 0, 0.1);
            color: var(--button-color);
            text-align: center;
            opacity: 0.5;
            outline: none;
        }
        button:hover {
            opacity: 1;
        }
        
    `
    
    render() {
        return html`
            <button>
                <slot></slot>
            </button>
        `
    }
}
