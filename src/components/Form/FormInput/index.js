import React, { Component } from 'react';
import styles from './styles.module.css';

class FormInput extends Component {
	render() {
		let classes = [styles['form-input']];
		if (this.props.hidden) classes.push(styles['form-input__hidden']);
		return (
			<div className={classes.join(' ')}>
				<input
					name={this.props.name}
					type={this.props.type || 'text'}
					value={this.props.value}
					autoComplete={this.props.autocomplete}
					disabled={this.props.disabled}
					placeholder={this.props.placeholder}
					onInput={this.props.onInput}
					onChange={this.props.onChange || this.props.onInput}
				/>
				{this.props.children}
			</div>
		);
	}
}

export default FormInput;