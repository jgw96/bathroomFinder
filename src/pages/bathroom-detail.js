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

        #map {
          height: 4em;
          width: 4em;
        }

        h3 {
          margin-top: 8px;
        }

        #detailsDiv, #directionsDiv {
          padding: 1em;
          margin-top: 1em;
          border-radius: 20px;
          box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        }

        #navigateButton {
          position: fixed;
          bottom: 16px;
          right: 16px;
          border-radius: 50%;
          border: none;
          height: 56px;
          width: 56px;
          background: var(--app-primary-color);
          box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
        }

        #navigateButton ion-icon {
          font-size: 1.8em;
          color: white;
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

  async updated() {
    const urlParams = new URLSearchParams(window.location.search);
    const newLat = urlParams.get('lat');
    const newLong = urlParams.get('long');

    if (this.lat !== newLat && this.long !== newLong) {
      this.bathroom = null;
      console.log(this.lat, this.long);
      this.lat = newLat;
      this.long = newLong;

      this.bathroom = await getSingleBath(this.lat, this.long);
      console.log(this.bathroom);
      return true;
    }
    else {
      return false;
    }
  }

  render() {
    return html`
      <section>
        <h2>${this.bathroom ? this.bathroom.name : 'loading...'}</h2>

        <div id="bathDetail">
          <p>${this.bathroom ? this.bathroom.comment : 'loading...'}</p>

          <div id="detailsDiv">
            <h3>Details</h3>

            <p>Changing Table: ${
              this.bathroom ? this.bathroom.changing_table ? 'yes' : 'no' : null
            }
            </p> 

            <p>Unisex: ${
              this.bathroom ? this.bathroom.unisex ? 'yes' : 'no' : null
            }</p>

            <p>Accessible: ${
              this.bathroom ? this.bathroom.accessible ? 'yes' : 'no' : null
            }</p>
          </div>

          <div id="directionsDiv">
            <h3>Directions</h3>

            <p>${this.bathroom ? this.bathroom.directions : null}</p>
          </div>
        </div>

        <button id="navigateButton">
          <ion-icon name="navigate"></ion-icon>
        </button>
      </section>
    `
  }
}

window.customElements.define('bathroom-detail', BathroomDetail);
