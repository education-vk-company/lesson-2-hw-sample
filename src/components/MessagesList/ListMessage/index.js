import styles from './styles.module.css';
import React, { Component } from 'react';

function FileSize (props) {
	if (props.size) {
		return <span>{props.size}</span>
	}
	return null;
}

function Content (props) {
	const file = props.file;
	if (props.text) {
		return props.text
	} else if (file) {
		if (file.image) {
			return <img src={file.image} onLoad={() => URL.revokeObjectURL(file.image)} alt={file.name} />
		} else if (file.name) {
			return <a href={file.href}>{file.name}</a>
		}
	}
	return null;
}

class Message extends Component {
	constructor (props) {
		super(props);
		const attach = props.attach;
		let state = {};
		if (attach) {
			let fileUrl = URL.createObjectURL(attach);
			let file = {
				size: getReadableSize(attach.size),
				name: attach.name
			};
			if (attach.type.match(imagePattern)) {
				file.image = fileUrl;
			} else {
				file.href = fileUrl;
			}
			state.file = file;
		} else if (props.text) {
			state.text = props.text;
		}
		state.time = [
			props.time.getHours(),
			props.time.getMinutes()
		].map(num => num < 10 ? '0' + num : num).join(':');
		this.state = state;
	}

	render () {
		let classes = [styles['list-message']];
		if (this.props.my) classes.push(styles['list-message_my']);
		if (this.state.file && this.state.file.image) classes.push(styles['list-message_image']);
		return (
			<div className={classes.join(' ')}>
				<section>
					<Content text={this.state.text} file={this.state.file} />
				</section>
				<FileSize {...this.state.file}/>
				<time>{this.state.time}</time>
			</div>
		);
	}
}

const KB = Math.pow(2, 10);
const MB = Math.pow(KB, 2);

const sizes = [
	{
		name: 'Кбайт',
		size: KB
	},
	{
		name: 'Мбайт',
		size: MB
	}
];

const imagePattern = /^image\.*/;

function getReadableSize (size) {
	return sizes.reduce((result, current, index, array) => {
		if (!result.length && (
			100 * current.size > size || index === array.length - 1
		)) {
			result = (size / current.size);
			result = [result.toFixed(result > 1 ? 0 : 2), current.name].join(' ');
		}
		return result;
	}, '');
}

export default Message;