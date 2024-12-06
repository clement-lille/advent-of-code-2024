import { readFileSync } from "fs";

export function readInput(filePath: string): string {
    return readFileSync(filePath, "utf-8").trim();
}

export function parseInput(input: string): string[][] {
    return input.split('\n').map(line => line.split(''))
}

export type Direction = [a: number, b: number]
export type DirectionArrow = "^" | ">" | "v" | "<"

export function rotateGuard (directionArrow: DirectionArrow): DirectionArrow {
    switch (directionArrow) {
        case '<':
            return '^'
        case '>':
            return 'v'
        case '^':
            return '>'
        case 'v':
            return '<'
    }
}

interface GuardPosition {
    row: number
    col: number
    direction: DirectionArrow
}

export function getStartingPosition (map: string[][]): GuardPosition | null{
    const numRows = map.length;
    const numCols = map[0].length;
    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            if ("^>v<".includes(map[r][c])) {
                return { row: r, col: c, direction: map[r][c] as DirectionArrow}
            }
        }
    }
    return null
}

const directionsVector: { [key in DirectionArrow]: Direction } = {
    "^": [-1, 0],
    ">": [0, 1],
    "v": [1, 0],
    "<": [0, -1]
};

export function isLeavingMap (row: number, col: number, numRows: number, numCols: number): boolean {
    return row < 0 || row >= numRows || col < 0 || col >= numCols
}

function simulateGuardPath(input: string) {
    const map = parseInput(input);
    const numRows = map.length;
    const numCols = map[0].length; 

    let guardPosition = getStartingPosition(map);
    if (!guardPosition) {
        return 0
    }
    map[guardPosition.row][guardPosition.col] = "X";

    const visited = new Set();
    visited.add(`${guardPosition.row},${guardPosition.col}`);

    while (true) {
        const [directionRow, directionCol] = directionsVector[guardPosition.direction];
        const nextRow = guardPosition.row + directionRow;
        const nextCol = guardPosition.col + directionCol;

        if (isLeavingMap(nextRow, nextCol, numRows, numCols)) {
            break;
        }

        if (map[nextRow][nextCol] === "#") {
            guardPosition.direction = rotateGuard(guardPosition.direction);
        } else {
            guardPosition.row = nextRow;
            guardPosition.col = nextCol;
            visited.add(`${guardPosition.row},${guardPosition.col}`);
        }
    }

    return visited.size;
}

export function solvePart1(input: string): number {
    return simulateGuardPath(input)
}

function simulateWithObstruction(map: string[][], startGuardPosition: GuardPosition, obstructionRow: number, obstructionCol: number) {
    const numRows = map.length;
    const numCols = map[0].length;
    const copyMap = [...map];
    const visited = new Set();

    let { row: currentRow, col: currentCol, direction: currentDir } = startGuardPosition;

    copyMap[obstructionRow][obstructionCol] = "#";

    while (true) {
        const state = `${currentRow},${currentCol},${currentDir}`;
        if (visited.has(state)) {
            copyMap[obstructionRow][obstructionCol] = ".";
            return true;
        }
        visited.add(state);

        const [directionRow, directionCol] = directionsVector[currentDir];
        const nextRow = currentRow + directionRow;
        const nextCol = currentCol + directionCol;

        if (isLeavingMap(nextRow, nextCol, numRows, numCols)) {
            copyMap[obstructionRow][obstructionCol] = ".";
            return false;
        }

        if (copyMap[nextRow][nextCol] === "#") {
            currentDir = rotateGuard(currentDir);
        } else {
            currentRow = nextRow;
            currentCol = nextCol;
        }
    }
}

function countLoopObstructionPositions(input: string): number {
    const map = parseInput(input);
    const numRows = map.length;
    const numCols = map[0].length;

    const startGuardPosition = getStartingPosition(map);
    if (!startGuardPosition) {
        return 0
    }
    map[startGuardPosition.row][startGuardPosition.col]= "."
    let validPositions = 0;

    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            if (map[r][c] === "." && !(r === startGuardPosition.row && c === startGuardPosition.col)) {
                if (simulateWithObstruction(map, startGuardPosition, r, c)) {
                    validPositions++;
                }
            }
        }
    }

    return validPositions;
}

export function solvePart2(input: string): number {
    return countLoopObstructionPositions(input);
}

if (require.main === module) {
    const input = readInput("src/day06/input.txt");
    console.log("Part 1:", solvePart1(input));
    console.log("Part 2:", solvePart2(input));
}