import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../../images/wallet.svg';
import './Header.css';

class Header extends Component {
  getTotal = (expenses) => {
    const totalExpenses = expenses.reduce((acc, element) => {
      const coin = element.currency;
      const dataCoins = Object.values(element.exchangeRates);
      const valueCoin = dataCoins.filter((dataCoin) => dataCoin.codein !== 'BRLT')
        .find((filteredCoin) => filteredCoin.code === coin).ask;
      acc += valueCoin * element.value;

      return acc;
    }, 0);

    return totalExpenses.toFixed(2);
  }

  render() {
    const { email, expenses } = this.props;
    return (
      <header className="header">
        <p data-testid="email-field">{ `E-mail: ${email}` }</p>
        <div className="header_money">
          <p>
            <span data-testid="total-field">{ `${this.getTotal(expenses)}` }</span>
            <span data-testid="header-currency-field"> BRL</span>
          </p>
          <img src={ logo } alt="logo wallet" />
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.any),
}.isRequired;

const mapStateToProps = (state) => {
  const { email } = state.user;
  const { expenses } = state.wallet;
  return {
    email,
    expenses,
  };
};

export default connect(mapStateToProps)(Header);
