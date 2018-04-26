import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connect } from 'react-redux';

import s from './styles.css';
import Link from '../Link';

class Header extends React.Component {

  static propTypes = {
    onClick: PropTypes.func,
  };

  render() {
    return (
      <header className={s.header} id="header" role="banner">
        <Link className={s['header__logo']} to="/">
          <img className={s.logo} src="/images/logo.png" alt="GCore" />
        </Link>

        <div className={s['header__menu']}>
        </div>
      </header>
    );
  }

}

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(Header);
