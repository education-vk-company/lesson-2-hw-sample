import styles from './index.css';
import shadowStyles from './shadow.css';

const template = `
	<style>${shadowStyles.toString()}</style>
	<input />
	<slot name="icon"></slot>
`;

//const iconTemplate = `
//	<div class="${styles.icon}" />
//`;

class FormInput extends HTMLElement {
	constructor () {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = template;
		this._initElements();
		this._addHandlers();
	}

	static get observedAttributes() {
		return [
			"name",
			"placeholder",
			"value",
			"disabled"
		]
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		this._elements.input[attrName] = newVal;
	}

	_initElements () {
		var hiddenInput = document.createElement('input');
		var input = this.shadowRoot.querySelector('input');
		this.appendChild(hiddenInput);
		this._elements = {
			input: input,
			hiddenInput: hiddenInput
		};
	}

	_addHandlers () {
		this._elements.input.addEventListener('input', this._onInput.bind(this));
	}

	_onInput () {
		this._elements.hiddenInput.value = this._elements.input.value;
	}
}

customElements.define('form-input', FormInput);