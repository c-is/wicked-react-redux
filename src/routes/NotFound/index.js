/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import history from '../../history';

import s from './styles.css';

const goBack = () => {
  history.goBack();
}

const NotFound = () => (
  <main className={s.main} id="main" role="main">
    <article className={s.content} id="content">
      <TransitionGroup
        component="div"
        className={s['content__inner']}
      >
        <CSSTransition
          key="content"
          classNames="fade"
          appear={true}
          timeout={{ appear: 500, enter: 500, exit: 500 }}
        >
          <div className={s.notfound}>
            <h1 className={s['notfound__title']}>404</h1>
            <h2 className={s['notfound__subtitle']}>Not found</h2>
            <p>{`The page you are looking for doesn't exist.`}</p>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </article>
  </main>
);

NotFound.propTypes = {

}

export default NotFound;
