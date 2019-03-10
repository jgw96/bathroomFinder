/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, css } from 'lit-element';
import { PageViewElement } from '../components/page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from '../components/shared-styles.js';

import { getNearbyStops } from '../services/data.js';

import '../components/bathroom-item.js';

class MyView1 extends PageViewElement {
  static get styles() {
    return [
      SharedStyles,
      css`
        #locationDiv {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2em;
          height: 14em;
          background: white;
          box-shadow: 0 -5px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
          border-radius: 20px 20px 0 0;
          transition: transform 0.3s ease-in-out;
        }

        #locationDiv p {
          font-weight: bold;
          width: 15em;
          text-align: center;
          font-size: 22px;
        }

        #locationDiv button {
          background: var(--app-primary-color);
          color: white;
          border: none;
          font-weight: bold;
          font-size: 14px;
          border-radius: 24px;
          height: 2.8em;
          width: 10em;
          outline: none;
          cursor: pointer;
        }

        img {
          width: 100%;
        }

        #bathroomList {
          animation-name: fadein;
          animation-duration: 400ms;
        }

        h2 {
          animation-name: fadein;
          animation-duration: 400ms;
          color: var(--app-primary-color);
        }

        ul {
          list-style: none;
          padding: 0;
        }

        section {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        @keyframes fadein {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `
    ];
  }

  static get properties() {
    return {
      // This is the data from the store.
      _location: { type: Object },
      _gettingLocation: { type: Boolean },
      _bathrooms: { type: Array }
    };
  }

  constructor() {
    super();

    this._location = null;
    this._gettingLocation = false;
    this._bathrooms = [];

    console.log(this._location);
  }

  getLocation() {
    console.log('location');
    this._gettingLocation = true;

    navigator.geolocation.getCurrentPosition(async (position) => {
      console.log(position.coords);
      this._gettingLocation = false;

      const locAni = this.shadowRoot.querySelector('#locationDiv').animate([
        {
          transform: 'translateY(0)',
          opacity: 1
        },
        {
          transform: 'translateY(100%)',
          opacity: 0
        }
      ], {
        duration: 600,
        easing: 'ease-in',
        fill: 'forwards'
      });

      this.shadowRoot.querySelector('img').animate([
        {
          transform: 'translateX(0)',
          opacity: 1
        },
        {
          transform: 'translateX(100%)',
          opacity: 0
        }
      ], {
        duration: 400,
        easing: 'ease-in',
        fill: 'forwards'
      })

      locAni.onfinish = () => {
        setTimeout(async () => {
          this._location = position.coords;
          this._bathrooms = await getNearbyStops(position.coords);
        }, 250);
      }
    })
  }

  render() {
    return html`
      <section>
        ${
          this._location === null ? html`
            <img id="backGraphic" src="images/homeGraphic.svg">

            <div id="locationDiv">
              <p>Find inclusive / accessible bathrooms near you</p>
              <button @click="${this.getLocation}">${
                this._gettingLocation === false ? html`Find Bathrooms` : html`Locating...`
              }</button>
            </div>
          ` : html`<h2>Nearby Bathrooms</h2>
            <ul id="bathroomList">
              ${
                this._bathrooms.map((bathroom) => {
                  return html`
                    <bathroom-item .bathroom="${bathroom}"></bathroom-item>
                  `
                })
              }
            </ul>
          `
        }
      </section>
    `;
  }
}

window.customElements.define('my-view1', MyView1);
