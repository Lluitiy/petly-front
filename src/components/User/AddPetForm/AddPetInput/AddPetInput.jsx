import { ValidationError } from 'components/Authorization/ValidationError/ValidationError';
import styles from './AddPetInput.module.scss';

export const AddPetInput = ({ register, errors, settings, textarea, notices= false }) => {
	const {
		label,
		name,
		type,
		placeholder,
		required,
		requiredMessage,
		pattern = null,
		patternMessage = null,
		maxLength = null,
		minLength = null,
	} = settings;

	return (
		<label className={styles.label}>
			<p className={(textarea && !notices) ? styles.label__textarea : styles.label__text}>
				{label}
			</p>
			{!textarea ? (
				<input
					type={type}
					{...register(name, {
						required: {
							value: required,
							message: requiredMessage,
						},
						pattern: pattern && {
							value: pattern,
							message: patternMessage,
						},
						maxLength: {
							value: maxLength,
							message: patternMessage,
						},
						minLength: {
							value: minLength,
							message: patternMessage,
						},
					})}
					placeholder={placeholder}
					className={styles.input}
				/>
			) : (
				<div className={!notices ? styles.textarea__wrapper : styles.textarea__wrapperNotices}>
					<textarea
						type={type}
						{...register(name, {
							required: {
								value: required,
								message: requiredMessage,
							},
							pattern: pattern && {
								value: pattern,
								message: patternMessage,
							},
							maxLength: {
								value: maxLength,
								message: patternMessage,
							},
							minLength: {
								value: minLength,
								message: patternMessage,
							},
						})}
						placeholder={placeholder}
						className={styles.textarea}
					></textarea>
				</div>
			)}
			{errors[name] && (
				<ValidationError>{errors[name]?.message}</ValidationError>
			)}
		</label>
	);
};
