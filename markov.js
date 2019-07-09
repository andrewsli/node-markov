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

let mm = new MarkovMachine(`I am Daniel

I am Sam
Sam I am

That Sam-I-am
That Sam-I-am!
I do not like
That Sam-I-am

Do you like
Green eggs and ham

I do not like them,
Sam-I-am.
I do not like
Green eggs and ham.

Would you like them
Here or there?

I would not like them
Here or there.
I would not like them
Anywhere.
I do not like
Green eggs and ham.
I do not like them,
Sam-I-am

Would you like them
In a house?
Would you like them
With a mouse?

I do not like them
In a house.
I do not like them
With a mouse.
I do not like them
Here or there.
I do not like them
Anywhere.
I do not like green eggs and ham.
I do not like them, Sam-I-am.

Would you eat them
In a box?
Would you eat them
With a fox?

Not in a box.
Not with a fox.
Not in a house.
Not with a mouse.
I would not eat them here or there.
I would not eat them anywhere.
I would not eat green eggs and ham.
I do not like them, Sam-I-am.

Would you? Could you?
In a car?
Eat them! Eat them!
Here they are.

I would not,
Could not,
In a car

You may like them.
You will see.
You may like them
In a tree?

I would not, could not in a tree.
Not in a car! You let me be.
I do not like them in a box.
I do not like them with a fox
I do not like them in a house
I do mot like them with a mouse
I do not like them here or there.
I do not like them anywhere.
I do not like green eggs and ham.
I do not like them, Sam-I-am.

A train! A train!
A train! A train!
Could you, would you
On a train?

Not on a train! Not in a tree!
Not in a car! Sam! Let me be!
I would not, could not, in a box.
I could not, would not, with a fox.
I will not eat them with a mouse
I will not eat them in a house.
I will not eat them here or there.
I will not eat them anywhere.
I do not like them, Sam-I-am.

Say!
In the dark?
Here in the dark!
Would you, could you, in the dark?

I would not, could not,
In the dark.

Would you, could you,
In the rain?

I would not, could not, in the rain.
Not in the dark. Not on a train,
Not in a car, Not in a tree.
I do not like them, Sam, you see.
Not in a house. Not in a box.
Not with a mouse. Not with a fox.
I will not eat them here or there.
I do not like them anywhere!

You do not like
Green eggs and ham?

I do not
Like them,
Sam-I-am.

Could you, would you,
With a goat?

I would not,
Could not.
With a goat!

Would you, could you,
On a boat?

I could not, would not, on a boat.
I will not, will not, with a goat.
I will not eat them in the rain.
I will not eat them on a train.
Not in the dark! Not in a tree!
Not in a car! You let me be!
I do not like them in a box.
I do not like them with a fox.
I will not eat them in a house.
I do not like them with a mouse.
I do not like them here or there.
I do not like them anywhere!

I do not like
Green egss
And ham!

I do not like them,
Sam-I-am.

You do not like them.
So you say.
Try them! Try them!
And you may.
Try them and you may I say.

Sam!
If you will let me be,
I will try them.
You will see.

Say!
I like green eggs and ham!
I do! I like them, Sam-I-am!
And I would eat them in a boat!
And I would eat them with a goat...
And I will eat them in the rain.
And in the dark. And on a train.
And in a car. And in a tree.
They are so goodm so goodm you see!

So I will eat them in a box.
And I will eat them with a fox.
And I will eat them in a house.
And I will eat them with a mouse.
And I will eat them here and there.
Say! I will eat them anhywhere!

I do so like
Green eggs and ham!
Thank you!
Thank you,
Sam-I-am
`)

console.log(mm.makeBigramText());