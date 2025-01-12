// Function that solves the crossword.
function crosswordSolver(crossword, words) {
    // Input validation for crossword
    const invalidCrossword = typeof crossword !== 'string' || !/^[.\n012]+$/.test(crossword);
    
    // Input validation for words array
    const invalidWords = !Array.isArray(words) || 
        words.length < 3 || 
        words.some((word) => typeof word !== 'string');

    // Check for duplicates in words array
    if (Array.isArray(words) && hasDuplicates(words)) {
        return 'Error';
    }   

    // Count start positions in crossword
    let startPositions = 0;
    for (let i = 0; i < crossword.length; i++) {
        if (crossword[i] > '0' && crossword[i] !== '.') {
            startPositions += parseInt(crossword[i]);
        }
    }
    
    // Validate start positions match words length
    if (startPositions !== words.length) {
        return 'Error';
    }

    if (invalidCrossword || invalidWords) {
        return 'Error';
    }

    // Check for duplicates in words array
    if (hasDuplicates(words)) {
        return 'Error';
    }

    // Convert crossword string to 2D array
    function convertTemplateToGrid(input) {
        return input.trim()
            .split('\n')
            .map((row) => 
                row.split('').map((char) => 
                    char === '.' ? -1 : parseInt(char, 10)
                )
            );
    }

    // Parse input crossword into grid
    const grid = convertTemplateToGrid(crossword);

    // Create parallel array for placed words
    const placedWords = grid.map((row) =>
        row.map((cell) => (cell === -1 ? '.' : ''))
    );

    // Recursive function to add words
    const addWords = (words, currentInd = 0) => {
        // Base case - all words placed successfully
        if (currentInd === words.length) {
            return true;
        }

        const word = words[currentInd];

        // Loop through each position in the grid
        for (let x = 0; x < grid.length; x++) {
            for (let y = 0; y < grid[0].length; y++) {
                // Skip positions marked as 0
                if (grid[x][y] === 0) {
                    continue;
                }

                // Try placing word horizontally and vertically
                if (tryPlaceWordInDirection(word, x, y, true) || 
                    tryPlaceWordInDirection(word, x, y, false)) {
                    if (addWords(words, currentInd + 1)) {
                        return true;
                    }
                    // If placing remaining words fails, remove the current word and try other positions
                    removeWord(word, x, y, true);
                    removeWord(word, x, y, false);
                }
            }
        }
        return false;
    };

    // Helper function for trying word placement
    function tryPlaceWordInDirection(word, x, y, isHorizontal) {
        const placedPositions = [];
        const length = word.length;

        // Check if word fits in the chosen direction
        for (let i = 0; i < length; i++) {
            const row = isHorizontal ? x : x + i;
            const col = isHorizontal ? y + i : y;

            // Check bounds and compatibility
            if (row >= grid.length || 
                col >= grid[0].length || 
                (placedWords[row][col] !== '' && placedWords[row][col] !== word[i])) {
                // Revert any placed letters
                placedPositions.forEach(({row, col}) => {
                    placedWords[row][col] = '';
                });
                return false;
            }

            // Store position and current value
            placedPositions.push({row, col});
            placedWords[row][col] = word[i];
        }

        return true;
    }

    // Helper function to remove a word from the puzzle
    function removeWord(word, x, y, isHorizontal) {
        const length = word.length;
        
        for (let i = 0; i < length; i++) {
            const row = isHorizontal ? x : x + i;
            const col = isHorizontal ? y + i : y;
            
            if (row < grid.length && col < grid[0].length) {
                if (placedWords[row][col] === word[i]) {
                    placedWords[row][col] = '';
                }
            }
        }
    }

    // Function to replace words in the existing grid
    function replaceWords(newWords) {
        // Validate new words
        if (!Array.isArray(newWords) || 
            newWords.length < 3 || 
            newWords.some((word) => typeof word !== 'string') ||
            hasDuplicates(newWords) ||
            newWords.length !== words.length) {
            return 'Error';
        }

        // Clear the placed words grid while preserving walls
        for (let x = 0; x < placedWords.length; x++) {
            for (let y = 0; y < placedWords[0].length; y++) {
                if (placedWords[x][y] !== '.') {
                    placedWords[x][y] = '';
                }
            }
        }

        // Try placing the new words
        if (!addWords(newWords)) {
            return 'Error';
        }

        // Convert final grid to string and return
        return placedWords.map((row) => row.join('')).join('\n');
    }

    // Try placing all words and handle result
    if (!addWords(words)) {
        return 'Error';
    }

    // Convert final grid to string and return
    const filledPuzzle = placedWords.map((row) => row.join('')).join('\n');
    return filledPuzzle;
}

// Helper function to check for duplicates in array
function hasDuplicates(arr) {
    return new Set(arr).size !== arr.length;
}

module.exports = { crosswordSolver };