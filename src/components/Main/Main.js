import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormExpend from '../Form/FormExpend';
import Table from '../Table/Table';

class Main extends Component {
  render() {
    const { edition, expenseToEdit = {} } = this.props;
    const { value, description, currency, method, tag } = expenseToEdit;
    return (
      <main className="main">
        { edition && (
          <FormExpend
            value={ value }
            description={ description }
            currency={ currency }
            method={ method }
            tag={ tag }
            edition
          />
        )}

        { !edition && (
          <FormExpend />
        )}
        <Table />
      </main>
    );
  }
}

Main.propTypes = {
  edition: PropTypes.bool,
  expenses: PropTypes.objectOf(PropTypes.any),
}.isRequired;

const mapStateToProps = (state) => {
  const { edition, expenseToEdit } = state.wallet;
  return {
    edition,
    expenseToEdit,
  };
};

export default connect(mapStateToProps)(Main);
