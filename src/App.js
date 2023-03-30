import { useState } from 'react';

import { ReactComponent as FacebookIcon } from './assets/icons/ic_facebook.svg';
import { ReactComponent as InstagramIcon } from './assets/icons/ic_instagram.svg';
import { ReactComponent as TwitterIcon } from './assets/icons/ic_twitter.svg';
import { ReactComponent as YoutubeIcon } from './assets/icons/ic_youtube.svg';

const formMessages = {
	invalidEmail: 'Please provide a valid e-mail address',
	unmarkedCheckbox: 'You must accept the terms and conditions',
	noEmail: 'Email address is required',
	colombiaEmail: 'We are not accepting subscriptions from Colombia emails',
};

function App() {
	const [email, setEmail] = useState('');
	const [checked, setChecked] = useState(false);
	const [error, setError] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');

	const onFormSubmit = (e) => {
		e.preventDefault();

		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
			const emailArray = email.split('.');
			const countryCode = emailArray[emailArray.length - 1];

			if (countryCode === 'co') {
				setErrorMessage(formMessages.colombiaEmail);
				setError(true);

				return;
			}

			if (!checked) {
				setErrorMessage(formMessages.unmarkedCheckbox);
				setError(true);

				return;
			}
		} else {
			setErrorMessage(formMessages.invalidEmail);
			setError(true);

			return;
		}

		if (email.length === 0) {
			setErrorMessage(formMessages.noEmail);
			setError(true);

			return;
		}

		setError(false);
	};

	return (
		<>
			<div className='subscribe'>
				<header className='header'>
					<i className='header__logo'></i>
					<nav className='nav'>
						<ul className='nav__list'>
							<li className='nav__list-item'>
								<a href='#' className='link'>
									About
								</a>
							</li>
							<li className='nav__list-item'>
								<a href='#' className='link'>
									How it works
								</a>
							</li>
							<li className='nav__list-item'>
								<a href='#' className='link'>
									Contact
								</a>
							</li>
						</ul>
					</nav>
				</header>
				<main className='subscribe__container'>
					<h1 className='subscribe__container-title'>
						Subscribe to newsletter
					</h1>
					<h2 className='subscribe__container-subtitle'>
						Subscribe to our newsletter and get 10% discount on pineapple
						glasses.
					</h2>
					<form
						className='subscribe__form'
						id='subscribe-form'
						onSubmit={onFormSubmit}
					>
						<div className='input__group'>
							<input
								className='input__control'
								type='email'
								name='email'
								value={email}
								placeholder='Type your email address here…'
								onChange={(e) => setEmail(e.target.value)}
								onMouseEnter={(e) => setEmail(`email | ${e.target.value}`)}
								onMouseLeave={(e) => {
									setEmail(e.target.value.replace('email |', ''));
								}}
								onFocus={(e) => setEmail(e.target.value)}
							/>
							<button
								className='input__submit'
								type='submit'
								form='subscribe-form'
							>
								<svg
									width='24'
									height='14'
									viewBox='0 0 24 14'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										opacity='0.3'
										d='M17.7071 0.2929C17.3166 -0.0976334 16.6834 -0.0976334 16.2929 0.2929C15.9023 0.683403 15.9023 1.31658 16.2929 1.70708L20.5858 5.99999H1C0.447693 5.99999 0 6.44772 0 6.99999C0 7.55227 0.447693 7.99999 1 7.99999H20.5858L16.2929 12.2929C15.9023 12.6834 15.9023 13.3166 16.2929 13.7071C16.6834 14.0976 17.3166 14.0976 17.7071 13.7071L23.7071 7.70708C24.0977 7.31658 24.0977 6.6834 23.7071 6.2929L17.7071 0.2929Z'
										fill='#131821'
									/>
								</svg>
							</button>
						</div>
						{error && <p className='error-message'>{errorMessage}</p>}
						<div className='tos-container'>
							<label className='checkbox__container' htmlFor='tos'>
								<p>
									I agree to{' '}
									<a href='#' className='link'>
										terms of service
									</a>
								</p>
								<input
									id='tos'
									className='checkbox__input'
									type='checkbox'
									name='tos'
									checked={checked}
									onChange={(e) => setChecked(e.target.checked)}
								/>
								<span className='checkbox__checkmark'></span>
							</label>
						</div>
					</form>
					<section className='subscribe__container-social-links'>
						<span />
						<ul className='social__links-list'>
							<li className='social__links-item social-icon facebook'>
								<a href='#'>
									<FacebookIcon />
								</a>
							</li>
							<li className='social__links-item social-icon instagram'>
								<a href='#'>
									<InstagramIcon />
								</a>
							</li>
							<li className='social__links-item social-icon twitter'>
								<a href='#'>
									<TwitterIcon />
								</a>
							</li>
							<li className='social__links-item social-icon youtube'>
								<a href='#'>
									<YoutubeIcon />
								</a>
							</li>
						</ul>
					</section>
				</main>
			</div>
			<div className='image-background'></div>
		</>
	);
}

export default App;
