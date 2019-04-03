import React from 'react';

const InputField = ({ name, ariaDesc, placeholder, label, onChange }) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input 
				type="text"
				className="form-control"
				name={name}
				aria-describedby={ariaDesc}
				placeholder={placeholder}
				onChange={(e) => onChange(e)}
			/>
		</div>
	);
}

export default InputField;

