/* @flow */

import React from 'react';
import PropTypes from 'prop-types';

import s from './styles.css';

const refresh = () => {
  location.reload(true);
};

const ErrorPage = ({ error, children }) => (
  <div className={s.error}>
    <div className={s['error__inner']}>
      <h1 className={s['error__title']}>Error has occurred</h1>
      <p className={s['error__subtitle']}>{error}</p>
      <div className={s['error__desc']}>
        <p>{children}</p>
        <p><a className="u-external" href={`mailto:`}>Report the error</a></p>
      </div>
      <div className={s['button-container']}>
      </div>
    </div>
  </div>
);

ErrorPage.propTypes = {
  error: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default ErrorPage;
