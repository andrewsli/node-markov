const { MarkovMachine } = require("./markov.js");

describe("Markov Machine", function () {

  let mm = new MarkovMachine("Billy and the Billy trains that ever billied. How many times did Billy chase down the Billy train?");

  describe('makeChains', function () {
    test('test that every word is included in wordChain keys', function () {
      for (let word of mm.words) {
        expect(Object.keys(mm.wordChain)).toContain(word);
      }
    });

    test('test that every key in wordChain is in words', function () {
      for (let key of Object.keys(mm.wordChain)) {
        expect(mm.words).toContain(key);
      }
    });

    test('test that for every key word in wordChain, the word that occurs after it is in the value array', function () {
      for (let key of Object.keys(mm.wordChain)) {
        for (let i = 0; i < mm.words.length - 1; i++) {
          if (mm.words[i] === key) {
            expect(mm.wordChain[key]).toContain(mm.words[i + 1]);
          }
        }
      }
    });
  });

  describe('makeBigramChain', function () {

    test('test that each bigram key has two words', function () {
      for (let key of Object.keys(mm.bigramChain)) {
        let wordList = key.split(" ");
        expect(wordList.length).toEqual(2);
      }
    })

    test('test that each bigram key word pair appears in that order in words at least once', function () {

      let wordString = mm.words.join(" ");
      for (let key of Object.keys(mm.bigramChain)) {
        expect(wordString).toContain(key);
      }
    });

    test('test that for every bigram key in bigramChain, the word that occurs after it is in the value array', function () {
      for (let key of Object.keys(mm.bigramChain)) {
        let wordList = key.split(" ");
        for (let i = 0; i < mm.words.length - 2; i++) {
          if (wordList[0] === mm.words[i] && wordList[1] === mm.words[i + 1]) {
            expect(mm.bigramChain[key]).toContain(mm.words[i + 2]);
          }
        }
      }

    });

  });

  describe('makeBigramText', function () {

    let text = mm.makeBigramText(numWords = 100)
    let words = text.split(" ")

    test('test that text length is between 0 and specified numWords', function () {
      expect(words.length).toBeGreaterThan(0)
      expect(words.length).toBeLessThan(100)
    });

    test('test that text output adheres to bigramChain', function () {
      for (let key of Object.keys(mm.bigramChain)) {
        let keyWords = key.split(" ");
        for (let i = 0; i < words.length - 2; i++) {
          if (keyWords[0] === words[i] && keyWords[1] === words[i + 1]) {
            // console.log("THE CHAIN IS: ",mm.bigramChain, "THE VALUES ARE: ", mm.bigramChain[key])
            // console.log("SHOULD CONTAIN: ", words[i+2])
            // console.log("keyword 0: ", keyWords[0]," || keyword 1:", keyWords[1], "|| words i: ", words[i],"|| word i+1: ", words[i+1] )
            // console.log(text)
            expect(mm.bigramChain[key]).toContain(words[i + 2])
          }
        }
      }
    });
  });

  describe('makeText', function () {

    let text = mm.makeText(numWords = 100)
    let words = text.split(" ")

    test('test that text length is between 0 and specified numWords', function () {
      expect(words.length).toBeGreaterThan(0)
      expect(words.length).toBeLessThan(100)
    });

    test('test that text output adheres to wordChain', function () {
      for (let i = 1; i < words.length - 1; i++) {
        expect(mm.wordChain[words[i]]).toContain(words[i + 1])
      }
    });
  });
});
