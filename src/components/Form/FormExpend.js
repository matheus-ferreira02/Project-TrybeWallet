import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../Input/Input';
import { getCoins, saveExpense, editExpense, attExpenses } from '../../actions';
import InputSelect from '../InputSelect/InputSelect';
import './Form.css';

const TAG_SELECTED = 'Alimentação';
const METHOD_SELECTED = 'Dinheiro';
const CURRENCY = 'USD';

class FormExpend extends Component {
  constructor(props) {
    super();

    this.state = {
      value: props.value,
      description: props.description,
      currency: props.currency,
      method: props.method,
      tag: props.tag,
      qtnExpenses: 0,
      btnDisabled: true,
      edition: props.edition,
    };
  }

  componentDidMount() {
    const { fetchAPI } = this.props;
    fetchAPI();
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => this.validationForm());
  }

  validationForm = () => {
    const { value, description } = this.state;

    const errorCases = [
      value > 0,
      description.length > 0,
    ];

    this.setState({ btnDisabled: !errorCases.every((error) => error) });
  }

  handleSelect = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  clearState = () => {
    this.setState((prevState) => ({
      value: 0,
      description: '',
      currency: CURRENCY,
      method: METHOD_SELECTED,
      tag: TAG_SELECTED,
      qtnExpenses: prevState.qtnExpenses + 1,
      btnDisabled: true,
    }));
  }

  saveExpense = async (event) => {
    event.preventDefault();

    const {
      value, description, currency, method, tag, qtnExpenses } = this.state;
    const { fetchAPI } = this.props;

    const expense = { id: qtnExpenses, value, description, currency, method, tag };

    this.clearState();
    fetchAPI(expense);
  }

  editExpense = (event) => {
    event.preventDefault();
    const { value, description, currency, method, tag } = this.state;
    const { expenseToEdit, expenses, att, edit } = this.props;
    const expense = expenses.find(({ id }) => id === expenseToEdit.id);
    expenses[expense.id] = {
      id: expenseToEdit.id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: expenseToEdit.exchangeRates,
    };

    att(expenses);
    edit(expense);
  };

  render() {
    const { loading } = this.props;

    if (loading) return <span>Carregando...</span>;

    const {
      value, description, method, btnDisabled, tag, currency, edition } = this.state;

    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

    const categorys = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    const coins = [
      'USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC',
      'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP',
    ];

    return (
      <form className={ `form ${edition ? 'form_edit' : 'form_add'}` }>
        <Input
          labelText="Valor"
          type="number"
          name="value"
          dataTest="value-input"
          value={ value }
          onChange={ this.handleChange }
        />

        <Input
          labelText="Descrição"
          type="text"
          name="description"
          dataTest="description-input"
          value={ description }
          onChange={ this.handleChange }
          placeholder="Descreva sua despesa"
        />

        <InputSelect
          array={ coins }
          name="currency"
          selected={ currency }
          dataTest="currency-input"
          labelText="Moeda"
          id="currency"
          onChange={ this.handleSelect }
        />

        <InputSelect
          array={ methods }
          name="method"
          selected={ method }
          dataTest="method-input"
          labelText="Método de pagamento"
          id="method"
          onChange={ this.handleSelect }
        />

        <InputSelect
          array={ categorys }
          name="tag"
          selected={ tag }
          dataTest="tag-input"
          labelText="Categoria"
          id="tag"
          onChange={ this.handleSelect }
        />

        <button
          className="button_form"
          type="submit"
          onClick={ edition ? this.editExpense : this.saveExpense }
          disabled={ edition ? false : btnDisabled }
        >
          { edition ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

FormExpend.defaultProps = {
  value: 0,
  description: '',
  currency: CURRENCY,
  method: METHOD_SELECTED,
  tag: TAG_SELECTED,
  qtnExpenses: 0,
  btnDisabled: true,
  edition: false,
};

FormExpend.propTypes = {
  fetchAPI: PropTypes.func,
  saveExpanses: PropTypes.func,
  expenseToEdit: PropTypes.objectOf(PropTypes.any),
  edition: PropTypes.bool,
  expenses: PropTypes.arrayOf(PropTypes.any),
}.isRequired;

const mapStateToProps = (state) => {
  const { currencies, loading, expenses, expenseToEdit } = state.wallet;
  return {
    currencies,
    loading,
    expenses,
    expenseToEdit,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: (expense) => dispatch(getCoins(expense)),
  saveExpanses: (object) => dispatch(saveExpense(object)),
  edit: (expense) => dispatch(editExpense(expense)),
  att: (expenses) => dispatch(attExpenses(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormExpend);
