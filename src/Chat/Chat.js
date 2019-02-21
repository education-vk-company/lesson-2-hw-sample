import React, { Component } from 'react';
import MessagesList from '../components/MessagesList';
import MessageForm from '../components/MessageForm';

class Chat extends Component {
	constructor (props) {
		super(props);
		this.state = {
			messages: [{text: 'Привет, как дела?', time: new Date(), my: false}]
		}
	}

	render() {
		return (
			<React.Fragment>
				<MessagesList messages={this.state.messages} />
				<MessageForm onMessage={this.onMessage.bind(this)}/>
			</React.Fragment>
		);
	}

	onMessage(message) {
		this.setState({messages: this.state.messages.concat(message)});
	}
}

export default Chat;
