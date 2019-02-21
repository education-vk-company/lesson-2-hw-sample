import styles from './styles.module.css';
import React, { Component } from 'react';

import ListMessage from './ListMessage';

class MessagesList extends Component {

	render () {
		const messages = this.props.messages.map((message, id) => {
			return (<ListMessage {...message} key={id}/>)
		});
		return (
			<div ref="parent" className={styles["message-list"]}>
				<div ref="container" className={styles["message-list__container"]}>
					{messages}
				</div>
			</div>
		);
	}

	componentDidUpdate() {
		const parent = this.refs.parent;
		parent.scrollTop = parent.scrollHeight - parent.offsetHeight;
	}
}

export default MessagesList;