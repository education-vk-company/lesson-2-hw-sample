import React, { Component } from 'react';
import FormInput from '../FormInput';
import styles from './styles.module.css';
import Worker from './dedicated.worker.js';
const imagePattern = /^image\.*/;

class FileInput extends Component {
	constructor (props) {
		super(props);
		this.state = {
			worker: null
		};
	}
	render () {
		return (
			<div className={styles["file-input"]}>
				<label>
					<FormInput hidden={true} type="file" onChange={this.onChange.bind(this)} />
				</label>
			</div>
		);
	}

	onChange (event) {
		const worker = this.getWorker();
		const file = event.target.files[0];
		if (file.type.match(imagePattern)) {
			createImageBitmap(file).then((bitmap) => {
				const canvas = getCanvas(bitmap);
				const context = canvas.getContext('2d');
				context.drawImage(bitmap, 0, 0);
				const pixels = context.getImageData(0, 0, bitmap.width, bitmap.height);
				worker.postMessage({
					pixels, file: {
						type: file.type
					}
				});
			});
		} else {
			this.props.onChange(file);
		}
	}

	onWorkerMessage (event) {
		if (typeof this.props.onChange === 'function') {
			const data = event.data;
			const pixels = data.pixels;
			const canvas = getCanvas(pixels);
			const context = canvas.getContext('2d');
			context.putImageData(pixels, 0, 0);
			canvas.toBlob((file) => this.props.onChange(file), data.file.type);
		}
	}

	getWorker () {
		let worker = this.state.worker;
		if (!worker) {
			worker = new Worker();
			this.setState({worker});
			worker.addEventListener('message', this.onWorkerMessage.bind(this))
		}
		return worker;
	}
}

function getCanvas (bitmap) { //TODO: OffscreenCanvas
	const canvas = document.createElement('canvas');
	canvas.width = bitmap.width;
	canvas.height = bitmap.height;
	return canvas;
}

export default FileInput;