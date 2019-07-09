/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.wordChain = this.makeChains();
    
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
      if((i === this.words.length-1) || this.words[i+1] === "."){
        wordChain[this.words[i]].push(null)
      }
      else{
        wordChain[this.words[i]].push(this.words[i+1])
      }
    }
    return wordChain
  }


  /** return random text from chains */

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
  return array[Math.floor(Math.random() * array.length)]
}

// return captialized word
function capitalize(word){
  return word.charAt(0).toUpperCase() + word.slice(1);
}

let mm = new MarkovMachine("Hi my name is Billy. Billy likes Billy. Trains are  fun because Bart is fun.")
mm.wordChain

