import React, { Component } from 'react';
import './styles.css';
import FormInput from '../Form/FormInput';
import FileInput from '../Form/FileInput';
// import GeoInput from '../form/-geo-input';
// import logo from "../../../src/logo.svg";

function Button (props) {
	const isVisible = props.visible;
	if (isVisible) {
		return <button type="submit">></button>
	}
	return null;
}

class MessageForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			withMessage: false,
			value: ''
		};
	}
	render() {
		return (
			<form onSubmit={this.onSubmit.bind(this)}>
				<FormInput
					name="message_text"
					placeholder="Введите сообщение"
					onInput={this.onInput.bind(this)}
					value={this.state.value}
				>
						<div className="message-form-children">
							<FileInput onChange={this.onFileInput.bind(this)}/>
							<Button visible={this.state.withMessage}/>
						</div>
				</FormInput>
			</form>
		);
	}

	onInput(event) {
		let message = event.target.value;
		this.setState({
			withMessage: message.length > 0,
			value: message
		})
	}

	onFileInput (event) {
		const message = this.createMessage({
			text: null,
			my: true,
			attach: event.target.files[0]
		});
		this.sendMessage(message);
	}

	onSubmit (event) {
		event.preventDefault();
		let message = this.createMessage({
			text: this.state.value
		});
		this.sendMessage(message);
		this.setState({
			value: ''
		});
	}

	createMessage (params) {
		let message =  Object.create({});
		Object.keys(params).forEach((key) => message[key] = params[key]);
		Object.defineProperty(message, 'my', {
			configurable: true,
			enumerable: false,
			value: true
		});
		message.time = new Date();
		return message;
	}

	sendMessage (message) {
		if (typeof this.props.onMessage === 'function') {
			this.props.onMessage(message);
		}
	}
}

// 	_sendMessage (message) {
// 		message.sending = fetch(this.action, {
// 			method: 'POST',
// 			body: Object.keys(message).reduce((formData, key) => {
// 				if (message[key]) formData.append(key, message[key]);
// 				return formData;
// 			}, new FormData)
// 		});
// 		const messageEvent = new CustomEvent('new-message', {
// 			bubbles: false,
// 			detail: message
// 		});
// 		this.dispatchEvent(messageEvent);
// 	}
// }


export default MessageForm;