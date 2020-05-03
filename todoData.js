const Chain = require("markov-chains").default;

let states = [
  ["Buy"],
  ["Make"],
  ["Look"],
  ["Dinner"],
  ["At"],
  ["Cup"],
  ["Soup"],
];

const chain = new Chain(states);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

for (let i = 0; i < 5; i++) {
  let guess = [];
  guess.push(chain.walk());
  console.log(guess);
}
