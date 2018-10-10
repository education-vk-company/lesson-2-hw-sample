import shadowStyles from './shadow.css';

import Message from './-message';

const template = `
	<style>${shadowStyles.toString()}</style>
`;

class MessagesList extends HTMLElement {
	constructor () {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = template;
		this._messages = {};
		this.addMessage({text: 'Привет, как дела?', time: new Date, my: false});
	}

	addMessage (message) {
		if (!(message.time in this._messages)) {
			const messageElem = MessagesList.createMessage(message);
			this.shadowRoot.appendChild(messageElem);
			return messageElem;
		}
		return null;
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