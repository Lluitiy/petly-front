import { ReactComponent as MaleSvg } from 'shared/images/Notices/el_male.svg';
import { ReactComponent as FemaleSvg } from 'shared/images/Notices/el_female.svg';
import { ReactComponent as UploadCross } from 'shared/images/user/uploadCross.svg';
import { Button } from 'components/Reuse/Button/Button';
import styles from '../NoticesAddPetForm.module.scss';
// import { AddPetItem } from '../AddPetItem/AddPetItem';
import { AddPetRadioItem } from '../AddPetRadioItem/AddPetSex';
import { AddPetInput } from 'components/User/AddPetForm/AddPetInput/AddPetInput';
import {
	petsLocation,
	petComment,
	petPrice,
} from 'components/Authorization/Input/inputOptions';
import { ValidationError } from 'components/Authorization/ValidationError/ValidationError';
// import { ValidationError } from 'components/Authorization/ValidationError/ValidationError';

export const SecondStep = ({ register, onSubmit, downPage, watch, errors }) => {
	const newImage = watch('avatar');
	const categorySelected = watch('category');
	const isSellCategorySelected = categorySelected === 'sell';

	console.log(errors);

	return (
		<>
			<div className={styles.sex__wrapper}>
				<p className={styles.sex__paragraph}>
					The sex
					<span className={styles.start}>&#42;</span>:
				</p>
				<ul className={styles.sex}>
					<li className={styles.sex__item}>
						<AddPetRadioItem
							data="petMale"
							img={<MaleSvg className={styles.sexSvg} />}
							text="Male"
							value="male"
							field="sex"
							register={register}
						/>
					</li>
					<li className={styles.sex__item}>
						<AddPetRadioItem
							data="petFeMale"
							img={<FemaleSvg />}
							text="Female"
							value="female"
							field="sex"
							register={register}
						/>
					</li>
				</ul>
				{errors['sex'] && (
					<ValidationError customStyle={{ bottom: '5px' }}>
						{errors['sex']?.message}
					</ValidationError>
				)}
			</div>
			<div className={styles.input__wrapper}>
				<AddPetInput
					register={register}
					errors={errors}
					settings={petsLocation}
				/>

				{isSellCategorySelected && (
					<AddPetInput
						register={register}
						errors={errors}
						settings={petPrice}
					/>
				)}

				<div className={styles.upload}>
					<div className={styles.upload__label}>
						<p className={styles.upload__text}>Load the pets image:</p>
						<label htmlFor="petImg" className={styles.upload__wrapper}>
							{newImage?.length ? (
								<img src={URL.createObjectURL(newImage[0])} alt="poster" />
							) : (
								<UploadCross
									width={48}
									height={48}
									stroke="rgba(17, 17, 17, 0.6)"
								/>
							)}
						</label>
						<input
							type="file"
							{...register('avatar')}
							id="petImg"
							name="avatar"
							placeholder="Type name pet"
							className={styles.upload__input}
						/>
					</div>
				</div>
				<AddPetInput
					register={register}
					textarea
					errors={errors}
					settings={petComment}
					notices
				/>
			</div>
			<div className={styles.buttonWrap}>
				<button
					type="submit"
					onSubmit={onSubmit}
					className={styles.buttonWrap__done}
				>
					Done
				</button>
				<Button
					type={'button'}
					text={'Back'}
					colorType={'white'}
					onClickFunc={downPage}
				/>
			</div>
		</>
	);
};
