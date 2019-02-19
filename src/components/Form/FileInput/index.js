import React, { Component } from 'react';
import FormInput from '../FormInput';
import './styles.css';

class FileInput extends Component {
	render () {
		return (
			<div className="file-input">
				<label>
					<FormInput type="file" onChange={this.props.onChange} />
				</label>
			</div>
		);
	}
}

customElements.define('file-input', FileInput);

export default FileInput;