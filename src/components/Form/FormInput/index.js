import React, { Component } from 'react';
import './styles.css';

class FormInput extends Component {
	render() {
		return (
			<div className="form-input">
				<input
					name={this.props.name}
					type={this.props.type || 'text'}
					value={this.props.value}
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