import { readFileSync } from "fs";

export function readInput(filePath: string): string {
    return readFileSync(filePath, "utf-8").trim();
}

export function getLines (input: string): string[] {
    return input.split('\n')
}

export function getColumns (lines: string[]): string[] {
    const columns: string[] = []
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            columns[j] = columns[j] ? columns[j] + lines[i][j] : lines[i][j]
        }
    }
    return columns
}

export function nbrOfOccurerencesInLine (line: string): number {
    const regex = new RegExp(/XMAS/g);
    const reversedRegex = new RegExp(/SAMX/g);
    return (line.match(regex)?.length ?? 0) + (line.match(reversedRegex)?.length ?? 0)
}

export function nbrOfOccurences (lines: string[]): number {
    return lines.reduce((acc, line) => acc + nbrOfOccurerencesInLine(line), 0)
}

export function getDiagonals (lines: string[]) {
    const numRows = lines.length;
    const numCols = lines[0].length;

    const diagonalsTLBR: { [key: string]: string } = {}; // ↘ diagonals (row - col)
    const diagonalsTRBL: { [key: string]: string } = {}; // ↙ diagonals (row + col)

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const char = lines[row][col];
            const diff = row - col; // ↘ diagonal key
            const sum = row + col; // ↙ diagonal key

            if (!diagonalsTLBR[diff]) diagonalsTLBR[diff] = '';
            if (!diagonalsTRBL[sum]) diagonalsTRBL[sum] = '';

            diagonalsTLBR[diff]+=char;
            diagonalsTRBL[sum]+=char;
        }
    }

    // Convert diagonal groups to arrays
    const diagonals1 = Object.values(diagonalsTLBR);
    const diagonals2 = Object.values(diagonalsTRBL);

    return { topLeftToBottomRight: diagonals1, topRightToBottomLeft: diagonals2 };
};

export function solvePart1(input: string): number {
    const lines = getLines(input);
    const columns = getColumns(lines);
    const diagonal = getDiagonals(lines);

    return nbrOfOccurences(lines) + nbrOfOccurences(columns) + nbrOfOccurences(diagonal.topLeftToBottomRight) + nbrOfOccurences(diagonal.topRightToBottomLeft)
}

export function solvePart2(input: string): number {
    let nbrOfOccurrences = 0
    const lines = input.split('\n');
    const allCharacters = lines.map(line => line.split(''))
    for (let i = 1; i < allCharacters.length - 1; i++) {
        const currentLine = allCharacters[i];
        for (let j = 0; j < currentLine.length; j++) {
            const currentChar = currentLine[j];
            if (currentChar === 'A') {
                const topLeftToBottomRight = allCharacters[i - 1][j + 1] + 'A' + allCharacters[i + 1][j - 1];
                const topRightToBottomLeft = allCharacters[i - 1][j - 1] + 'A' + allCharacters[i + 1][j + 1];
                if (['MAS', 'SAM'].includes(topLeftToBottomRight) && ['MAS', 'SAM'].includes(topRightToBottomLeft)) {
                    nbrOfOccurrences++
                }
            }
        }
    }
    return nbrOfOccurrences;
}

if (require.main === module) {
    const input = readInput("src/day04/input.txt");
    console.log("Part 1:", solvePart1(input));
    console.log("Part 2:", solvePart2(input));
}