// File that tests the crosswordSolver.
// Import the crossword solver.
const { crosswordSolver } = require("./crosswordSolver");

function testCrosswordSolver(puzzle, words, testNumber) {
  // ANSI escape codes for colors
  const reset = '\x1b[0m';
  const red = '\x1b[31m';
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const cyan = '\x1b[36m';

  console.log(`\n${yellow}--- Test ${testNumber} ---${reset}`);
  console.log(`\n${cyan}Puzzle:${reset}`);
  console.log(puzzle);
  console.log(`\n${cyan}Words:${reset}`);
  console.log(words);
  
  const crosswordSolution = crosswordSolver(puzzle, words);
  console.log(`\n${cyan}Solution:${reset}`);
  console.log(crosswordSolution);

  if (crosswordSolution instanceof Error) {
    console.log(`\n${red}Error in Test ${testNumber}${reset}`);
  } else {
    console.log(`\n${green}Test ${testNumber} passed successfully!${reset}`);
  }
}


// Test 1
const puzzle1 = '2001\n0..0\n1000\n0..0';
const words1 = ['casa', 'alan', 'ciao', 'anta'];
testCrosswordSolver(puzzle1, words1, 1);

// Test 2
const puzzle2 = `...1...........
..1000001000...
...0....0......
.1......0...1..
.0....100000000
100000..0...0..
.0.....1001000.
.0.1....0.0....
.10000000.0....
.0.0......0....
.0.0.....100...
...0......0....
..........0....`;
const words2 = [
  'sun',
  'sunglasses',
  'suncream',
  'swimming',
  'bikini',
  'beach',
  'icecream',
  'tan',
  'deckchair',
  'sand',
  'seaside',
  'sandals',
];
testCrosswordSolver(puzzle2, words2, 2);

// Test 3
const puzzle3 = `..1.1..1...
10000..1000
..0.0..0...
..1000000..
..0.0..0...
1000..10000
..0.1..0...
....0..0...
..100000...
....0..0...
....0......`;
const words3 = [
  'popcorn',
  'fruit',
  'flour',
  'chicken',
  'eggs',
  'vegetables',
  'pasta',
  'pork',
  'steak',
  'cheese',
];
testCrosswordSolver(puzzle3, words3, 3);

// Test 4
const puzzle4 = `...1...........
..1000001000...
...0....0......
.1......0...1..
.0....100000000
100000..0...0..
.0.....1001000.
.0.1....0.0....
.10000000.0....
.0.0......0....
.0.0.....100...
...0......0....
..........0....`;
const words4 = [
  'sun',
  'sunglasses',
  'suncream',
  'swimming',
  'bikini',
  'beach',
  'icecream',
  'tan',
  'deckchair',
  'sand',
  'seaside',
  'sandals',
].reverse();
testCrosswordSolver(puzzle4, words4, 4);

// Test 5
const puzzle5 = '2001\n0..0\n2000\n0..0';
const words5 = ['casa', 'alan', 'ciao', 'anta'];
testCrosswordSolver(puzzle5, words5, 5);

// Test 6
const puzzle6 = '0001\n0..0\n3000\n0..0';
const words6 = ['casa', 'alan', 'ciao', 'anta'];
testCrosswordSolver(puzzle6, words6, 6);

// Test 7
const puzzle7 = '2001\n0..0\n1000\n0..0';
const words7 = ['casa', 'casa', 'ciao', 'anta'];
testCrosswordSolver(puzzle7, words7, 7);

// Test 8
const puzzle8 = '';
const words8 = ['casa', 'alan', 'ciao', 'anta'];
testCrosswordSolver(puzzle8, words8, 8);

// Test 9
const puzzle9 = 123;
const words9 = ['casa', 'alan', 'ciao', 'anta'];
testCrosswordSolver(puzzle9, words9, 9);

// Test 10
const puzzle10 = '';
const words10 = 123;
testCrosswordSolver(puzzle10, words10, 10);

// Test 11
const puzzle11 = '2000\n0...\n0...\n0...';
const words11 = ['abba', 'assa'];
testCrosswordSolver(puzzle11, words11, 11);

// Test 12
const puzzle12 = '2001\n0..0\n1000\n0..0';
const words12 = ['aaab', 'aaac', 'aaad', 'aaae'];
testCrosswordSolver(puzzle12, words12, 12);

// Test 13 (custom)
const puzzle13 = `..1.1..1...
10000..1000
..0.0..0...
..1000000..
..0.0..0...
1000..10000
..0.1..0...
1...0..0...
0.100000...
0...0..0...
0...0......
0..........
100000.....`;
const words13 = [
  'popcorn',
  'fruit',
  'flour',
  'chicken',
  'eggs',
  'vegetables',
  'pasta',
  'pork',
  'steak',
  'cheese',
  'butter',
  'baobab'
];
testCrosswordSolver(puzzle13, words13, 13);
