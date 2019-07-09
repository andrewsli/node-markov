/** Command-line tool to generate Markov text. */

const argv = process.argv;
const axios = require('axios');
const markov = require('./markov.js');
const fs = require('fs');
const striptags = require('striptags');

async function markovURL(url) {
  try {
    let resp = await axios.get(url);
    let respClean = striptags(resp.data);
    let markovText = new markov.MarkovMachine(respClean);
    console.log(markovText.makeText());
    return markovText.makeText();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

function markovFile(path) {
  fs.readFile(path, 'utf8', function markovFile(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    let markovText = new markov.MarkovMachine(data);
    console.log(markovText.makeText());
    return markovText.makeText();
  });
}

if (argv[2] === "file") {
  markovFile(argv[3]);
} else if (argv[2] === "url") {
  markovURL(argv[3]);
} else {
  console.log("Please specify file or url in the following format: node makeText.js <file or url> <file path or url>")
}