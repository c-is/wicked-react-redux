import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import s from './styles.css';

import Header from './Header';
import Footer from './Footer';
import ErrorPage from '../ErrorPage';

class App extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    location: PropTypes.object,
    user: PropTypes.object,
    dispatch: PropTypes.func,
    route: PropTypes.object,
  };

  state = {
    data: '',
    isLoaded: '',
    init: true,
    error: '',
    errorInfo: '',
  }

  getRoute(route) {
    route.then(data => {
      console.log(data);
      this.setState({ data, init: false, isLoaded: true });
    }).catch(error => {
      this.setState({ error });
    });
  }

  componentDidMount() {
    // const { user, dispatch, route } = this.props;
    // if (route)
    //   this.getRoute(route);
    // else {
    //   this.setState({ init: false, isLoaded: true });
    // }
  }

  componentDidCatch(err, info) {
    this.setState({ error: err.toString(), errorInfo: info.componentStack });
  }

  render() {
    const { ...props } = this.props;
    const {  error, errorInfo } = this.state;
    console.log(props);

    return (
      <div className={s.container}>
        <Header user={props.user} />
        <div className={s.layout}>
          { error ? (
            <div className={s.mainContainer} key={error.message}><ErrorPage error={error}>{errorInfo}</ErrorPage></div>
          ) : (
            <div className={s.mainContainer} key={props.route.title}>{props.route.body}</div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(App);
