// Function that solves the crossword.
function crosswordSolver(crossword, words) {
    // Check if crossword is a valid string containing only dots, newlines, and numbers 0-2
    const invalidCrossword = typeof crossword !== "string" || !/^[.\n012]+$/.test(crossword);
    
    // Validate words array: must be array, have at least 3 words, all elements must be strings
    const invalidWords = !Array.isArray(words) || 
        words.length < 3 || 
        words.some((word) => typeof word !== "string");

    // Check for duplicate words 
    if (Array.isArray(words) && hasDuplicates(words)) {
        return 'Error';
    }   
 
    // Count total number of word start positions in the crossword
    let startPositions = 0;
    for (let i = 0; i < crossword.length; i++) {
        // Only count numbers greater than 0 (1 or 2)
        if (crossword[i] > '0' && crossword[i] != '.'){
            startPositions += parseInt(crossword[i]);
        }
    }

    // Ensure number of start positions matches number of words
    if (startPositions !== words.length){
        return 'Error';
    }

    if (invalidCrossword || invalidWords) {
        return 'Error';
    }

    // Convert crossword into array
    function convertTemplateToGrid(input) {
        // Split input into rows
        const rows = input.trim().split("\n")

        // Convert each row into array of numbers
        const cross = rows.map((row) => {
            // Split row into individual characters
            const chars = row.split("")

            // Convert characters to numbers (-1 for dots)
            const numbers = chars.map((char) => {
                return char === "." ? -1 : parseInt(char);
            })
            return numbers
        })
        return cross
    }

    // Parse input crossword into grid
    const grid = convertTemplateToGrid(crossword)

    // Create parallel grid for placed words, initialize with dots and empty spaces
    const placedWords = grid.map((row) => row.map((char) => (char === -1 ? "." : "")))
    
    // Recursive function to add words in the grid
    const addWords = (words, currentInd = 0) => {
        // Base case - all words placed successfully
        if (currentInd === words.length) {
            return true
        }

        // Get current word to place
        const word = words[currentInd]

        // Loop through each position in the grid
        for (let rowInd = 0; rowInd < grid.length; rowInd++) {
            for (let colInd = 0; colInd < grid[0].length; colInd++) {
                // Skip positions marked as 0
                if (grid[rowInd][colInd] === 0) {
                    continue
                }

                // Current position being tried
                const char = {
                    row: rowInd,
                    col: colInd,
                }

                // Try placing word in a specific direction
                function directOfWord(direction) {
                    // Store characters that get modified for backtracking
                    const otherschars = []

                    // Try placing each character of the word
                    for (let i = 0; i < word.length; i++) {
                        // Calculate position based on direction
                        const row = direction === "x" ? char.row : char.row + i
                        const col = direction === "x" ? char.col + i : char.col

                        // Check if placement is valid
                        if (
                            row >= grid.length ||
                            col >= grid[0].length ||
                            (placedWords[row][col] !== "" && placedWords[row][col] !== word[i])
                        ) {
                            break
                        }

                        // Store current state and place new character
                        otherschars.push({ row, col, value: placedWords[row][col] })
                        placedWords[row][col] = word[i]
                    }

                    // If word fits completely, try placing next word
                    if (otherschars.length === word.length && addWords(words, currentInd + 1)) {
                        return true
                    }

                    // Backtrack: restore previous state if placement fails
                    otherschars.forEach((otherchar) => {
                        placedWords[otherchar.row][otherchar.col] = otherchar.value
                    })

                    return false
                }

                // Try both x and y placements
                if (directOfWord("x") || directOfWord("y")) {
                    return true
                }
            }
        }
        // No valid placement found for current word
        return false
    }
    
    // Attempt to place all words
    if (!addWords(words)) {
        return "Error"
    }

    // Convert solution grid back to string format
    const result = placedWords.map((row) => row.join("")).join("\n")
    return result
}

// Helper function to detect duplicate elements in array
function hasDuplicates(arr) {
    return (new Set(arr)).size !== arr.length;
}

module.exports = { crosswordSolver };