/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import s from './styles.css';


class Home extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <main className={s.main} id="main" role="main">
        <article className={s.content} id="content">
        </article>
      </main>
    );
  }

}

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(Home);
