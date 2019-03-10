import { html, css } from 'lit-element';
import { PageViewElement } from '../components/page-view-element.js';

import { getSingleBath } from '../services/data.js';

// These are the shared styles needed by this element.
import { SharedStyles } from '../components/shared-styles.js';

class BathroomDetail extends PageViewElement {
  static get styles() {
    return [
      SharedStyles,
      css`
        h2 {
          color: var(--app-primary-color);
        }
      `
    ];
  }

  static get properties() {
    return {
      lat: { type: String },
      long: { type: String },
      bathroom: { type: Object }
    }
  }

  async firstUpdated() {
    const urlParams = new URLSearchParams(window.location.search);
    this.lat = urlParams.get('lat');
    this.long = urlParams.get('long');

    console.log(this.lat, this.long);

    this.bathroom = await getSingleBath(this.lat, this.long);
    console.log(this.bathroom);
  }

  render() {
    return html`
      <section>
        <h2>${this.bathroom ? this.bathroom.name : 'loading...'}</h2>
      </section>
    `
  }
}

window.customElements.define('bathroom-detail', BathroomDetail);
