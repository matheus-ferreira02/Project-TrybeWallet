import {
  SUCESS_FETCH, LOADING, SAVE_EXPANSE, ATT_EXPENSES, EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  edition: false,
  expenseToEdit: {},
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUCESS_FETCH:
    return {
      ...state,
      currencies: action.payload,
    };
  case LOADING:
    return {
      ...state,
      loading: !state.loading,
    };
  case SAVE_EXPANSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case ATT_EXPENSES:
    return {
      ...state,
      expenses: [...action.payload],
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      edition: !state.edition,
      expenseToEdit: action.payload,
    };
  default:
    return state;
  }
};

export default walletReducer;
