import fetchCoins from '../helpers/fetchCoins';

export const SAVE_USER = 'SAVE_USER';
export const LOADING = 'LOADING';
export const SUCESS_FETCH = 'SUCESS_FETCH';
export const ERROR_FETCH = 'ERROR_FETCH';
export const SAVE_EXPANSE = 'SAVE_EXPANSE';
export const ATT_EXPENSES = 'ATT_EXPENSES';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const attExpenses = (expenses) => ({
  type: ATT_EXPENSES,
  payload: expenses,
});

export const editExpense = (expense = {}) => ({
  type: EDIT_EXPENSE,
  payload: expense,
});

export const saveEmail = (email) => ({
  type: SAVE_USER,
  payload: email,
});

const sucessFetchCoins = (data) => ({
  type: SUCESS_FETCH,
  payload: data,
});

const errorFetchCoins = () => ({
  type: ERROR_FETCH,
});

export const saveExpense = (object, data) => ({
  type: SAVE_EXPANSE,
  payload: { ...object, exchangeRates: data },
});

export const getCoins = (expanse = false) => async (dispatch) => {
  try {
    const data = await fetchCoins();
    if (expanse) {
      dispatch(saveExpense(expanse, data));
    } else {
      dispatch(sucessFetchCoins(data));
    }
  } catch (error) {
    dispatch(errorFetchCoins());
  }
};
