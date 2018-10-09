import shadowStyles from './shadow.css';

const template = `
	<style>${shadowStyles.toString()}</style>
	<input />
	<slot name="icon"></slot>
`;

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
			"disabled",
			"type"
		]
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		this._elements.input[attrName] = newVal;
		this._elements.hiddenInput[attrName] = newVal;
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
		this._elements.hiddenInput.dispatchEvent(new InputEvent('input'));
		this.value = this._elements.input.value;
	}

	set value (newVal) {
		this._elements.input.value = newVal;
		this._elements.hiddenInput.value = newVal;
	}

	get value () {
		return this._elements.input.value
	}
}

customElements.define('form-input', FormInput);

export default FormInput;