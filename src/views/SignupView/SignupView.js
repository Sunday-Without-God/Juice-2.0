import React, { PropTypes } from 'react';
import Radium from 'radium';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';

import { actions as loginActions } from '../../redux/modules/auth';
import { routeActions } from 'redux-simple-router';

import Paper from 'material-ui/lib/paper';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardActions from 'material-ui/lib/card/card-actions';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

let { push } = routeActions;

@Radium
export class SignupView extends React.Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
    loginState: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    fetchUserInfo: PropTypes.func.isRequired,
    setLoginState: PropTypes.func.isRequired
  };

  constructor(...args) {
    super(...args);
    this.state = {
      username: '',
      password: '',
      email: '',
      passwordConfirm: ''
    };
  }

  componentDidMount() {
    this.props.fetchUserInfo();
    this.checkLoginState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkLoginState(nextProps);
  }

  checkLoginState(props) {
    if (props.loginState.get('state')) {
      props.push('/');
    }
  }

  @autobind
  setUsername(event) {
    this.setState({username: event.target.value});
  }

  @autobind
  setPassword(event) {
    this.setState({password: event.target.value});
  }

  @autobind
  setPasswordConfirm(event) {
    this.setState({passwordConfirm: event.target.value});
  }

  @autobind
  setEmail(event) {
    this.setState({email: event.target.value});
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={[ styles.margin, styles.flexContainer]}>
          <Paper zDepth={3} style={styles.paper}>
            <Card>
              <CardTitle style={styles.flexContainer} title='Signup' />
              <CardActions style={styles.flexContainer}>
                <TextField style={styles.action}
                  onChange={ this.setUsername }
                  floatingLabelText='Username' />
              </CardActions>
              <CardActions style={styles.flexContainer}>
                <TextField style={styles.action}
                  onChange={ this.setEmail }
                  floatingLabelText='Email' />
              </CardActions>
              <CardActions style={styles.flexContainer}>
                <TextField style={styles.action}
                  type='password'
                  onChange={ this.setPassword }
                  floatingLabelText='Password' />
              </CardActions>
              <CardActions style={styles.flexContainer}>
                <TextField style={styles.action}
                  type='password'
                  onChange={ this.setPasswordConfirm }
                  floatingLabelText='PasswordConfirm' />
              </CardActions>
              <CardActions style={styles.flexContainer}>
                <FlatButton label='Signup' primary />
              </CardActions>
            </Card>
          </Paper>
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {loginState: state.auth};
}, Object.assign({}, loginActions, { push }))(SignupView);

let styles = {
  container: {
    height: '100%',
    width: '100%'
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  margin: {
    marginTop: '20px'
  },
  paper: {
    width: '40%',
    height: '40%'
  },
  action: {
    width: '80%'
  }
};
