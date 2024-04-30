const { getWordsList } = require('most-common-words-by-language');

getWordsList('french', 200); // returns 200 most common French words
getWordsList('spanish'); // returns 10000 (10000 is the default and max value) most common Spanish words