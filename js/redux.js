//initial state
const initialState = {
  matches: [{ id: 1, score: 100 }],
};

// Action types
const ADD_MATCH = "ADD_MATCH";
const DELETE_MATCH = "DELETE_MATCH";
const INCREMENT_SCORE = "INCREMENT_SCORE";
const DECREMENT_SCORE = "DECREMENT_SCORE";
const RESET_SCORES = "RESET_SCORES";
const DELETE_ALL = "DELETE_ALL";

// action creators
export const addMatch = () => ({ type: ADD_MATCH });

export const deleteMatch = (id) => ({
  type: DELETE_MATCH,
  payload: {
    id: id,
  },
});

export const incrementScore = (id, score) => ({
  type: INCREMENT_SCORE,
  payload: {
    id: id,
    score: score,
  },
});

export const decrementScore = (id, score) => ({
  type: DECREMENT_SCORE,
  payload: {
    id: id,
    score: score,
  },
});

export const resetScore = () => ({ type: RESET_SCORES });

export const deleteAll = () => ({ type: DELETE_ALL });

//create reducer function
export function createReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MATCH:
      return {
        ...state,
        matches: [...state?.matches, { id: Date.now(), score: 100 }],
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
            ? { ...match, score: match?.score + action?.payload?.score }
            : match
        ),
      };

    case DECREMENT_SCORE:
      return {
        ...state,
        matches: state?.matches?.map((match) =>
          match?.id === action?.payload?.id
            ? {
                ...match,
                score:
                  match?.score > action?.payload?.score
                    ? match?.score - action?.payload?.score
                    : 0,
              }
            : match
        ),
      };

    case RESET_SCORES:
      return {
        ...state,
        matches: state?.matches?.map((match) => ({ ...match, score: 0 })),
      };

    case DELETE_ALL:
      return initialState;

    default:
      return state;
  }
}
