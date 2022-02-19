import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../actions';
import Input from '../components/Input/Input';
import logo from '../images/wallet.svg';
import './Login.css';

const MIN_LENGTH = 5;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      btnDisabled: true,
    };
  }

  validationButton = () => {
    const { email, password } = this.state;

    const regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const validationEmail = regexEmail.test(email);
    const validationPassword = password.length > MIN_LENGTH;

    const errorCases = [validationEmail, validationPassword];
    const validationButton = errorCases.every((error) => error);

    this.setState({ btnDisabled: !validationButton });
  }

  handleClick = () => {
    const { saveUser, history } = this.props;
    const { email } = this.state;

    saveUser(email);
    history.push('/carteira');
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => this.validationButton());
  }

  render() {
    const { email, password, btnDisabled } = this.state;

    return (
      <main className="main_login">
        <section className="login">
          <section className="welcome_message">
            <img src={ logo } alt="Logo wallet" />
            <p>
              Seja bem vindo(a) ao trybe wallet,
              onde voê pode controlar suas despesas e gastos
            </p>
          </section>
          <form className="form_login" onSubmit={ (event) => (event.preventDefault()) }>
            <Input
              id="email-input"
              type="email"
              name="email"
              placeholder="Digite seu email"
              dataTest="email-input"
              value={ email }
              onChange={ this.handleChange }
            />

            <Input
              id="password-input"
              type="password"
              name="password"
              placeholder="Digite sua senha"
              dataTest="password-input"
              value={ password }
              onChange={ this.handleChange }
            />

            <button
              type="submit"
              className="btn_login"
              disabled={ btnDisabled }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </form>
        </section>
      </main>
    );
  }
}

Login.propTypes = {
  saveUser: PropTypes.func,
  history: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  saveUser: (email) => dispatch(saveEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
