import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaTrash, FaPen } from 'react-icons/fa';
import { attExpenses, editExpense } from '../../actions';
import './Table.css';

class Table extends Component {
  getNameCoin = (expense) => {
    const dataCoins = Object.values(expense.exchangeRates);
    const nameCoin = dataCoins
      .find(({ code }) => code === expense.currency).name.split('/');
    return nameCoin[0];
  }

  getAskCoin = (expense) => {
    const dataCoins = Object.values(expense.exchangeRates);
    const valueCoin = dataCoins
      .find(({ code }) => code === expense.currency).ask;
    return valueCoin;
  }

  convertedValue = (expense) => {
    const ask = this.getAskCoin(expense);
    const convertedValue = ask * expense.value;
    return convertedValue;
  }

  getExchange = (expense) => {
    const ask = this.getAskCoin(expense);
    return Number(ask);
  }

  editExpense = ({ target }) => {
    const { name } = target;
    const { expenses, edit } = this.props;

    const expense = expenses.find((element) => element.id === Number(name));
    edit(expense);
  }

  removeExpense = ({ target }) => {
    const { name } = target;
    const { expenses, saveExpenses } = this.props;

    const newExpenses = expenses.filter(({ id }) => id !== Number(name));
    saveExpenses(newExpenses);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className="table_expenses">
        <thead>
          <tr className="title_table">
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>

        <tbody>
          { expenses.map((expense) => {
            const nameCoin = this.getNameCoin(expense);
            const convertedValue = this.convertedValue(expense);
            const exchangeUsed = this.getExchange(expense);
            return (
              <tr className="data_expenses" key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>{ nameCoin }</td>
                <td>{ exchangeUsed.toFixed(2) }</td>
                <td>{ convertedValue.toFixed(2) }</td>
                <td>Real</td>
                <td className="buttons">
                  <button
                    className="btn_expense edit"
                    type="button"
                    name={ expense.id }
                    data-testid="edit-btn"
                    onClick={ this.editExpense }
                  >
                    <FaPen />
                  </button>

                  <button
                    className="btn_expense remove"
                    type="button"
                    name={ expense.id }
                    onClick={ this.removeExpense }
                    data-testid="delete-btn"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>);
          }) }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any),
  saveExpenses: PropTypes.func,
  edit: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => {
  const { expenses } = state.wallet;
  return {
    expenses,
  };
};

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (expenses) => dispatch(attExpenses(expenses)),
  edit: (expense) => dispatch(editExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
