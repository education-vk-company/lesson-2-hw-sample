import shadowStyles from './shadow.css';

import {imagePattern} from '../../../../utils/file'

const template = `
	<style>${shadowStyles.toString()}</style>
	<section></section>
	<time></time>
`;

const stateClasses = {
	myMessages: 'my',
	image: 'image'
};

class Message extends HTMLElement {
	constructor () {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = template;
	}

	setMessage (message) {
		const timeElem = this.shadowRoot.querySelector('time');
		const contentElem = this.shadowRoot.querySelector('section');
		if (message.files) {
			const size = document.createElement('span');
			const file = message.files.list[0];
			size.innerText = message.files.size;
			this.shadowRoot.insertBefore(size, timeElem);
			if (file.type.match(imagePattern)) {
				let image = document.createElement('img');
				image.src = URL.createObjectURL(file);
				image.onload = () => URL.revokeObjectURL(image.src);
				contentElem.appendChild(image);
				this.classList.add(stateClasses.image)
			} else {
				const name = document.createElement('a');
				name.href = URL.createObjectURL(file);
				name.innerText = file.name;
				contentElem.appendChild(name);
			}
		} else if (message.text) {
			contentElem.innerText = message.text;
		}
		timeElem.innerText = [
			message.time.getHours(),
			message.time.getMinutes()
		].map(num => num < 10 ? '0' + num : num).join(':');
	}

	set my (val) {
		this.classList[val ? 'add' : 'remove'](stateClasses.myMessages);
	}
}

customElements.define('list-message', Message);

export default Message;