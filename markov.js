/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.wordChain = this.makeChains();
    this.bigramChain = this.makeBigramChain();
    
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let wordChain = {}
    for(let i = 0; i < this.words.length; i++){
      // creates key for word if doesn't exist yet
      if(!wordChain[this.words[i]]){
        wordChain[this.words[i]] = []
      }
      // add next word into chain for current word, null if last word
      if(i === this.words.length-1){
        wordChain[this.words[i]].push(null)
      }
      else{
        wordChain[this.words[i]].push(this.words[i+1])
      }
    }
    return wordChain
  }

  makeBigramChain() {
    let bigramChain = {};
    for(let i = 1; i < this.words.length; i++){
      //create bigram with current and previous word
      let bigram = this.words[i-1] + " " + this.words[i]
      //create key for bigram in bigramChain if doesn't exist yet
      if(!bigramChain[bigram]){
        bigramChain[bigram] = []
      }
      // add next word into value for current bigram
      if(i === this.words.length-1){
        bigramChain[bigram].push(null)
      }
      else{
        bigramChain[bigram].push(this.words[i+1])
      }
    }
    return bigramChain
  }

  // return random text from bigram chain
    makeBigramText(numWords = 100){
    if (numWords === 0) {
      return;
    }
    let text = "";
    let lastBigram = "";
    let bigrams = Object.keys(this.bigramChain);
    lastBigram = randomElement(bigrams);
    text += capitalize(lastBigram) + " ";
    let counter = 2;

    while (counter < numWords){
      let nextWord = randomElement(this.bigramChain[lastBigram]);
      if (nextWord === null){
        text = text.slice(0,-1);
        break;
      }
      text += nextWord + " ";
      counter ++;
      lastBigram = splitBigram(lastBigram)[1] + " " + nextWord
    }
    return text;
  }


  /** return random text from chains, only works with single word chains*/
  makeText(numWords = 100) {
    if (numWords === 0) {
      return;
    }

    let text = "";
    let lastWord = "";
    
    let words = Object.keys(this.wordChain);
    lastWord = randomElement(words);
    text += capitalize(lastWord) + " ";
    let counter = 1;
    
    while (counter < numWords) {
      lastWord = randomElement(this.wordChain[lastWord]);
      if (lastWord === null) {
        text = text.slice(0,-1);
        break;
      }
      text += lastWord + " ";
      counter++;
    }
    return text;
  }
}



// returns random element of array
function randomElement(array){
  return array[Math.floor(Math.random() * array.length)];
}

// return captialized word
function capitalize(word){
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function splitBigram(bigram){
  words = bigram.split(" ")
  return words
}

module.exports = {
  MarkovMachine,
  randomElement,
  capitalize
}

// let mm = new MarkovMachine(`Billy and the Billy trains that ever billied. How many times did Billy chase down the Billy train?`)
// console.log(mm.bigramChain)
// console.log(mm.makeBigramText());