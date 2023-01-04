import React, { useRef } from 'react';
import styles from '../Authorization.module.scss';

import { useForm } from 'react-hook-form';
import { useState } from 'react';

export const RegisterForm = () => {
	const [nextStep, setNextStep] = useState(false);
	const {
		register,
    handleSubmit,
    watch,
		formState: { errors, isValid,},
  } = useForm({
    mode: 'onBlur',
  });

  const password = useRef({});

  password.current = watch("password", "");
  

	const onSubmit = ({ email, password, city, phone, name }) => {
		let res = {
			name,
			email,
			password,
			city,
			phone,
		};
		console.log(res);
	};
	const handleNextBtn = () => {
		setNextStep(true);
  };
  
  const handleBackBtn = () => {
    setNextStep(false)
  }

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			{!nextStep && (
        <>
          <div className={styles.inputWrapper}>
					<input
						className={styles.input}
						type="email"
						placeholder="Email"
						{...register('email', {
							required: {
								value: true,
								message: 'Email is required',
							},
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'Invalid email address',
							},
						})}
            />
            {errors.email && <span>{errors.email?.message}</span>}
          </div>
          <div className={styles.inputWrapper}>
					<input
						className={styles.input}
						type="password"
            placeholder="Password"
          ref={password}
						{...register('password', {
							required: {
								value: true,
								message: 'Password is required',
							},
							pattern: {
								value: /^\S{7,32}$/i,
								message: 'Invalid password',
							},
						})}
          />
            {errors.password && <span>{errors.password?.message}</span>}
          </div>
          <div className={styles.inputWrapper}>
          <input
						className={styles.input}
						type="password"
						placeholder="Confirm Password"
						{...register('passwordConfirm', {
							required: {
								value: true,
								message: 'Confirm your password, please',
							},
					
              validate: value => value === password.current || "passwords do not match"
      
						})}
          />
          {errors.passwordConfirm && <span>{errors.passwordConfirm?.message}</span>}
          </div>
					<button
						className={styles.btn}
						disabled={!isValid}
						onClick={handleNextBtn}
					>
						Next
					</button>
				</>
			)}
			{nextStep && (
        <>
          <div className={styles.inputWrapper}>
					<input
						className={styles.input}
						type="text"
						placeholder="Name"
						{...register('name', {
              required: {
                value: true,
								message: 'Name is required',
							},
							pattern: {
                value: /^[a-zA-Z]+$/i,
								message: 'Invalid name',
							},
						})}
            />
            {errors.name && <span>{errors.name?.message}</span>}
          </div>
          <div className={styles.inputWrapper}>
					<input
						className={styles.input}
						type="text"
						placeholder="City, region"
						{...register('city', {
							required: {
								value: true,
								message: 'City and region are required',
							},
							pattern: {
								value: /^\s*(?:\w+\s*,\s*){1,}(?:\w+\s*)$/i,
								message: 'Brovary, Kyiv',
							},
						})}
					/>
            {errors.city && <span>{errors.city?.message}</span>}
          </div>
          <div className={styles.inputWrapper}>
					<input
						className={styles.input}
						type="tel"
						placeholder="Phone"
						{...register('phone', {
							required: {
								value: true,
								message: 'Phone is required',
							},
							pattern: {
								value: /^\d{10}$/i,
								message: '0971234567',
							},
						})}
          />
            {errors.phone && <span>{errors.phone?.message}</span>}
            </div>

					<button className={styles.btn} type="submit">
						Register
					</button>
					<button onClick={handleBackBtn} className={styles.lightBtn} type="button">
						Back
					</button>
				</>
      )}
      
		</form>
	);
};