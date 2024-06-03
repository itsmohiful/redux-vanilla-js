//initial state
const initialState = {
  matches: [{ id: 1, score: 0 }],
};

// Action types
const ADD_MATCH = "ADD_MATCH";
const DELETE_MATCH = "DELETE_MATCH";
const INCREMENT_SCORE = "INCREMENT_SCORE";
const DECREMENT_SCORE = "DECREMENT_SCORE";
const RESET_SCORES = "RESET_SCORES";

// action creators
const addMatch = () => ({ type: ADD_MATCH });

const deleteMatch = (id) => ({
  type: ADD_MATCH,
  payload: {
    id: id,
  },
});

const incrementScore = (id, score) => ({
  type: INCREMENT_SCORE,
  payload: {
    id: id,
    score: score,
  },
});

const decrementScore = (id, score) => ({
  type: INCREMENT_SCORE,
  payload: {
    id: id,
    score: score,
  },
});

const resetScore = () => ({ type: RESET_SCORES });

//create reducer function
function createReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MATCH:
      return {
        ...state,
        matches: [...state?.matches, { id: Date.now(), score: 0 }],
      };

    case DELETE_MATCH:
      return {
        ...state,
        matches: state?.matches?.filter(
          (match) => match?.id !== action?.payload?.id
        ),
      };

    case INCREMENT_SCORE:
      return {
        ...state,
        matches: state?.matches?.map((match) =>
          match?.id === action?.payload?.id
            ? { ...match, score: match?.score + action?.payload?.value }
            : match
        ),
      };

    case DECREMENT_SCORE:
      return {
        ...state,
        matches: state?.matches?.map((match) =>
          match?.id === action?.payload?.id
            ? { ...match, score: match?.score - action?.payload?.value }
            : match
        ),
      };

    case RESET_SCORES:
      return {
        ...state,
        matches: state?.matches?.map((match) => ({ ...match, score: 0 })),
      };

    default:
      return state;
  }
}

//create store
const store = Redux.creatStore(createReducer);

//render method
const render = () => {
  const state = store?.getStates();
  return;
};

//update ui initally
render();
