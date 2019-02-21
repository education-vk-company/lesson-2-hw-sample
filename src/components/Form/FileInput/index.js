import React, { Component } from 'react';
import FormInput from '../FormInput';
import styles from './styles.module.css';

class FileInput extends Component {
	render () {
		return (
			<div className={styles["file-input"]}>
				<label>
					<FormInput hidden={true} type="file" onChange={this.props.onChange} />
				</label>
			</div>
		);
	}
}

export default FileInput;