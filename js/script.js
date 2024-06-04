import {
  addMatch,
  createReducer,
  decrementScore,
  deleteAll,
  deleteMatch,
  incrementScore,
  resetScore,
} from "./redux.js";

//create store
const store = Redux.createStore(createReducer);

//render methods
const renderMathces = () => {
  const state = store.getState();

  const matchesContainer = document.querySelector(".all-matches");
  matchesContainer.innerHTML = "";

  state?.matches?.map((match, index) => {
    const matchElement = document.createElement("div");
    matchElement.classList.add("match", "pb-4");

    matchElement.innerHTML = `
        <div class="wrapper">
            
            <button class="delete" data-id="${match.id}">
                <img src="./images/delete.svg" alt="" />
            </button>
            <h3 class="matchName">Match ${index + 1}</h3>
        </div>

        <div class="inc-dec">
            <form class="incrementForm">
                <h4>Increment</h4>
                <input type="number" name="increment" class="increment" data-id="${
                  match?.id
                }"/>
            </form>

            <form class="decrementForm">
                <h4>Decrement</h4>
                <input type="number" name="decrement" class="decrement" data-id="${
                  match?.id
                }"/>
            </form>
        </div>

          <div class="numbers">
            <h2 class="singleResult">${match?.score}</h2>
          </div>
    `;

    //add event listener in delete button
    matchElement.querySelector(".delete").addEventListener("click", () => {
      deleteMatchFunc(match?.id);
    });

    //add event listener for increment score
    matchElement
      .querySelector(".incrementForm")
      .addEventListener("submit", (event) => {
        incrementScoreFunc(event, match?.id);
      });

    //add event listener for decrement score
    matchElement
      .querySelector(".decrementForm")
      .addEventListener("submit", (event) => {
        decrementScoreFunc(event, match?.id);
      });

    //match div append
    matchesContainer.appendChild(matchElement);
  });
};

//subscribe store
store.subscribe(renderMathces);

//initially render
renderMathces();

//add matches
document.querySelector(".addMatch").addEventListener("click", () => {
  store.dispatch(addMatch());
});

//delete match
const deleteMatchFunc = (matchId) => {
  store.dispatch(deleteMatch(matchId));
};

//increment match's score
const incrementScoreFunc = (event, matchId) => {
  event.preventDefault();
  const score = parseInt(event.target[0].value);
  console.log(score, matchId);

  store.dispatch(incrementScore(matchId, score));
};

//decrement match's score
const decrementScoreFunc = (event, matchId) => {
  event.preventDefault();
  const score = parseInt(event.target[0].value);
  console.log(score, matchId);

  store.dispatch(decrementScore(matchId, score));
};

//reset scores
document.querySelector(".reset").addEventListener("click", () => {
  store.dispatch(resetScore());
});

//delete all match's
document.querySelector(".btn-clear").addEventListener("click", () => {
  //   console.log(window.location);
  //   window.location.replace("http://127.0.0.1:5500/index.html");
  store.dispatch(deleteAll());
});
