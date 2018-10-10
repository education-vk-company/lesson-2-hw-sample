import shadowStyles from './shadow.css';

import FormInput from '../-input';
import {getReadableSize} from '../../../../utils/file'

class FileInput extends FormInput {
	constructor () {
		super();
		this._customizeInput();
		this._addStyles();
		this._addChangeHandler();
	}

	_addStyles () {
		const style = document.createElement('style');
		style.appendChild(document.createTextNode(shadowStyles));
		this.shadowRoot.appendChild(style);
	}

	_customizeInput () {
		const input = this._elements.input;
		const label = document.createElement('label');
		input.type = 'file';
		input.parentNode.insertBefore(label, input);
		label.appendChild(input);
	}

	_addChangeHandler () {
		this._elements.input.addEventListener('change', (event) => {
			var fileEvent = new Event('change');
			this.dispatchEvent(fileEvent);
		});
	}

	getFilesObject () {
		const filesArray = Array.from(this._elements.input.files);
		return {
			list: filesArray,
			size: getReadableSize(filesArray.reduce((result, file) => result + file.size, 0))
		};
	}

	get files () {
		return this.getFilesObject();
	}

	set value (newVal) {
		if (newVal === '') {
			this._elements.input.value = newVal;
		}
	}
}

customElements.define('file-input', FileInput);

export default FileInput;