import React, { Component } from 'react';
import styles from './styles.module.css';
import FormInput from '../Form/FormInput';
import FileInput from '../Form/FileInput';

function Button (props) {
	const isVisible = props.visible;
	if (isVisible) {
		return <button type="submit" />
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
					autocomplete="off"
				>
						<div className={styles["message-form-children"]}>
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

	onFileInput (file) {
		const message = this.createMessage({
			text: null,
			my: true,
			attach: file
		});
		this.sendMessage(message);
	}

	onSubmit (event) {
		event.preventDefault();
		if (this.state.value) {
			let message = this.createMessage({
				text: this.state.value
			});
			this.sendMessage(message);
			this.setState({
				value: '',
				withMessage: false
			});
		}
	}

	createMessage (params) {
		let message =  Object.create({});
		Object.keys(params).forEach((key) => message[key] = params[key]);
		Object.defineProperty(message, 'my', {
			configurable: true,
			enumerable: true,
			value: true,
			editable: false
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