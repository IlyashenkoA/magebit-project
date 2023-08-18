import { useState } from 'react';

import { ReactComponent as FacebookIcon } from './assets/icons/ic_facebook.svg';
import { ReactComponent as InstagramIcon } from './assets/icons/ic_instagram.svg';
import { ReactComponent as TwitterIcon } from './assets/icons/ic_twitter.svg';
import { ReactComponent as YoutubeIcon } from './assets/icons/ic_youtube.svg';
import { ReactComponent as SuccessIcon } from './assets/icons/ic_success.svg';
import mobileLogo from './assets/logo/mobile-logo.svg';
import desktopLogo from './assets/logo/desktop-logo.svg';

const formMessages = {
  invalidEmail: 'Please provide a valid e-mail address',
  unmarkedCheckbox: 'You must accept the terms and conditions',
  noEmail: 'Email address is required',
  colombiaEmail: 'We are not accepting subscriptions from Colombia emails',
};

function App() {
  const [email, setEmail] = useState('');
  const [checkedTOS, setCheckedTOS] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateTOS = tos => {
    if (!tos) {
      setErrorMessage(formMessages.unmarkedCheckbox);
      setError(true);

      return false;
    }
    return true;
  };

  const validateEmail = email => {
    // Validate if email is not empty
    if (email.length === 0) {
      setErrorMessage(formMessages.noEmail);
      setError(true);

      return false;
    }

    // Validate if email is valid
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
      const emailArray = email.split('.');
      const countryCode = emailArray[emailArray.length - 1];

      // Validate if Colombia email
      if (countryCode === 'co') {
        setErrorMessage(formMessages.colombiaEmail);
        setError(true);

        return false;
      }
    } else {
      setErrorMessage(formMessages.invalidEmail);
      setError(true);

      return false;
    }
    setError(false);

    return true;
  };

  const onEmailChange = e => {
    const { value } = e.target;
    setEmail(value);

    // Validate TOS if email is correct
    if (validateEmail(value)) {
      validateTOS(checkedTOS);
    }
  };

  const onCheckboxChange = e => {
    const { checked } = e.target;

    setCheckedTOS(checked);

    // Validate email if TOS are accepted
    if (validateTOS(checked)) {
      validateEmail(email);
    }
  };

  const isSubmitButtonDisabled = error || email.length === 0 || !checkedTOS;

  const onFormSubmit = e => {
    e.preventDefault();

    if (!isSubmitButtonDisabled) {
      setIsSubmitted(true);
    }
  };

  return (
    <>
      <div className='subscribe'>
        <header className='header'>
          <picture className='header__logo'>
            <source media='(min-width:43rem)' srcSet={desktopLogo} />
            <img src={mobileLogo} alt='Pineapple logo' />
          </picture>
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
          {isSubmitted ? (
            <>
              <SuccessIcon className='subscribe__container-success-icon' />
              <h1 className='subscribe__container-title'>
                Thanks for subscribing!
              </h1>
              <h2 className='subscribe__container-description'>
                You have successfully subscribed to our email listing. Check
                your email for the discount code.
              </h2>
            </>
          ) : (
            <>
              <h1 className='subscribe__container-title'>
                Subscribe to newsletter
              </h1>
              <h2 className='subscribe__container-description'>
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
                    className={`input__control ${
                      error && errorMessage !== formMessages.unmarkedCheckbox
                        ? 'invalid'
                        : ''
                    }`}
                    type='email'
                    name='email'
                    value={email}
                    placeholder='Type your email address here…'
                    onChange={onEmailChange}
                  />
                  <button
                    className='input__submit'
                    type='submit'
                    form='subscribe-form'
                    disabled={isSubmitButtonDisabled}
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
                  <div className='checkbox__container'>
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
                      checked={checkedTOS}
                      onChange={onCheckboxChange}
                    />
                    <label
                      className='checkbox__checkmark'
                      htmlFor='tos'
                    ></label>
                  </div>
                </div>
              </form>
            </>
          )}
          <div className='subscribe__container-social-links'>
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
          </div>
        </main>
      </div>
      <div className='image-background'></div>
    </>
  );
}

export default App;
