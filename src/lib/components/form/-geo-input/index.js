import shadowStyles from './shadow.css';

import FormInput from '../-input';
import getPosition from '../../../../utils/geolocation'

const geoOptions = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 36e5
};


class GeoInput extends FormInput {
	constructor () {
		super();
		this._addStyles();
		this._getPosition();
	}

	_addStyles () {
		const style = document.createElement('style');
		style.appendChild(document.createTextNode(shadowStyles));
		this.shadowRoot.appendChild(style);
	}

	_getPosition () {
		getPosition(geoOptions).then(position => {
			this._elements.hiddenInput.value = [
				position.coords.latitude, position.coords.longitude
			].join(',');
		}).catch(console.error);
	}
}

customElements.define('geo-input', GeoInput);

export default GeoInput;