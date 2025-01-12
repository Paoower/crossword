# Crossword Solver

A JavaScript function that solves crossword puzzles based on a crossword and a list of words.

## Files

- `crosswordSolver.js`: Contains the core logic to solve the crossword puzzle.
- `crosswordTest.js`: Contains tests that verify the functionality of the crossword solver.

## Usage

To run the program:
```bash
node crosswordTest.js
```

If you want to add new tests:
1. Open `crosswordTest.js`.
2. Add a new puzzle and words like the following:
```javascript
// Test 1
const puzzle1 = '2001\n0..0\n1000\n0..0';
const words1 = ['casa', 'alan', 'ciao', 'anta'];
testCrosswordSolver(puzzle1, words1, 1);
```

### Test Format

Each test case consists of:
- A crossword grid string (dots `.` for empty spaces, numbers `0`, `1`, and `2` for start positions).
- A list of words that need to be placed in the crossword.

Example:
```javascript
const puzzle1 = '2001\n0..0\n1000\n0..0';
const words1 = ['casa', 'alan', 'ciao', 'anta'];
testCrosswordSolver(puzzle1, words1, 1);
```

This will test the solver with a puzzle and words, printing the solution or any error messages to the console.

## Example Output

For the input puzzle and words:
```javascript
const puzzle1 = '2001\n0..0\n1000\n0..0';
const words1 = ['casa', 'alan', 'ciao', 'anta'];
```
The program will output:
```
--- Test 1 ---
Puzzle:
2001
0..0
1000
0..0

Words:
['casa', 'alan', 'ciao', 'anta']

Solution:
casa
i..l
anta
o..n


Test 1 passed successfully!
```

If there is an issue with the puzzle or words, an error message will be displayed.