import shadowStyles from './shadow.css';
import FormInput from '../form/-input';
import GeoInput from '../form/-geo-input';

const template = `
	<style>${shadowStyles.toString()}</style>
	<form>
		<form-input name="message_text" placeholder="Введите сообщение" slot="message-input">
			<div slot="icon">
				<button type="button">g</button>
				<button type="submit">></button>
			</div>
		</form-input>
		<geo-input name="message-pos"></geo-input>
	</form>
`;

const stateClasses = {
	withMessage: 'with-message'
};

class MessageForm extends HTMLElement {
	constructor () {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = template;
		this._initElements();
		this._addHandlers();
	}

	static get observedAttributes() {
		return [
			"action",
			"method"
		]
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		this._elements.form[attrName] = newVal;
	}

	_initElements () {
		var form = this.shadowRoot.querySelector('form');
		var message = this.shadowRoot.querySelector('form-input');
		this._elements = {
			form: form,
			message: message
		};
	}

	_addHandlers () {
		this._elements.form.addEventListener('submit', this._onSubmit.bind(this));
		this._elements.message.addEventListener('input', this._onInput.bind(this));
		this._elements.form.addEventListener('keypress', this._onKeyPress.bind(this));
	}

	_onSubmit (event) {
		const message = {
			text: this._elements.message.value,
			time: new Date(),
			my: true
		};
		this._elements.message.value = '';
		this._elements.form.classList.remove(stateClasses.withMessage);
		const messageEvent = new CustomEvent('new-message', {
			bubbles: false,
			detail: message
		});
		this.dispatchEvent(messageEvent);
		event.preventDefault();
	}

	_onKeyPress (event) {
		if (event.keyCode == 13) {
			this._elements.form.dispatchEvent(new Event('submit'));
		}
	}

	_onInput () {
		if (this._elements.message.value.length > 0) {
			this._elements.form.classList.add(stateClasses.withMessage);
		} else {
			this._elements.form.classList.remove(stateClasses.withMessage);
		}
	}
}

function serializeForm () {

}

customElements.define('message-form', MessageForm);

export default MessageForm;