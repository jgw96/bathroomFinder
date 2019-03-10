import { LitElement, html, css } from 'lit-element';


// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
class BathroomItem extends LitElement {
  static get properties() {
    return {
      bathroom: { type: Object}
    }
  }

  static get styles() {
    return [
      css`
        h4, p {
          margin: 0;
        }

        p {
          color: grey;
        }

        li {
          margin-top: 1em;
          border-left: solid 4px var(--app-primary-color);
          padding-left: 1em;
        }

        a {
          text-decoration: none;
          color: initial;
        }
      `
    ];
  }

  constructor() {
    super();

    this.bathroom = null;
  }

  render() {
    return html`
      <a href="${`/bathroomDetail?lat=${this.bathroom.latitude}&long=${this.bathroom.longitude}`}">
        <li>
          <h4>${this.bathroom.name}</h4>

          <div id='listDetail'>
            <p>${this.bathroom.distance.toFixed(2)} miles</p>
          </div>
        </li>
      </a>
    `;
  }
}

window.customElements.define('bathroom-item', BathroomItem);
