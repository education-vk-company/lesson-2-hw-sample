import React, { Component } from 'react';
import MessagesList from '../components/MessagesList';
import MessageForm from '../components/MessageForm';
import workerCode from './sharedWorker';

class Chat extends Component {
	constructor (props) {
		super(props);
		this.state = {
			messages: [{text: 'Привет, как дела?', time: new Date(), my: false}],
			worker: this.getSharedWorker()
		};
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
		this.state.worker.then((worker) => {
			worker.port.postMessage(message);
		});
		this.setState({messages: this.state.messages.concat(message)});
	}

	getSharedWorker () {
		const workerFile = new Blob([`(${workerCode})(self)`], {type: 'text/javascript'});
		return new Promise((res, rej) => {
			const reader = new FileReader();
			reader.addEventListener('loadend', (event) => {
				const worker = new SharedWorker(event.target.result);
				worker.port.addEventListener('message', this.onWorkerMessage.bind(this));
				worker.port.start();
				window.addEventListener('beforeunload', () => {
					worker.port.postMessage('disconnect');
				});
				res(worker);
			});
			reader.addEventListener('error', rej);
			reader.readAsDataURL(workerFile);
		});
	}

	onWorkerMessage (event) {
		this.setState({messages: this.state.messages.concat(event.data)});
	}
}

export default Chat;
