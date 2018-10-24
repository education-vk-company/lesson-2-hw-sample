import shadowStyles from './shadow.css';

import Message from './-message';

const template = `
	<style>${shadowStyles.toString()}</style>
	<div id="container"></div>
`;

class MessagesList extends HTMLElement {
	constructor () {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = template;
		this._getElements();
		this._messages = {};
		this.addMessage({text: 'Привет, как дела?', time: new Date, my: false});
	}

	addMessage (message) {
		if (!(message.time in this._messages)) {
			const messageElem = MessagesList.createMessage(message);
			const container = this._elements.container;
			container.appendChild(messageElem);
			this.scrollTop = this.scrollHeight - this.offsetHeight;
			return messageElem;
		}
		return null;
	}

	_getElements () {
		this._elements = {
			container: this.shadowRoot.getElementById('container')
		};
	}

	static createMessage (message) {
		const messageElem = document.createElement('list-message');
		messageElem.my = message.my;
		messageElem.setMessage(message);
		return messageElem;
	}
}

customElements.define('messages-list', MessagesList);

export default MessagesList;