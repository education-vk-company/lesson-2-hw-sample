import shadowStyles from './shadow.css';

const template = `
	<style>${shadowStyles.toString()}</style>
	<time></time>
`;

class Message extends HTMLElement {
	constructor () {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = template;
	}

	setMessage (message) {
		const text = document.createTextNode(message.text);
		this.shadowRoot.children[1].innerText = [
			message.time.getHours(),
			message.time.getMinutes()
		].map(num => num < 10 ? '0' + num : num).join(':');
		this.shadowRoot.childNodes[0].after(text);
	}
}

customElements.define('list-message', Message);

export default Message;