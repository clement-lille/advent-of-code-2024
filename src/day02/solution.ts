import { readFileSync } from "fs";

export function readInput(filePath: string): string {
    return readFileSync(filePath, "utf-8").trim();
}

export function checkNumberOfErrorsDecreasingIncreasing (nbrs: number[]): number {
    const isDecreasing = nbrs[0] >= nbrs[1];
    let nbrOfErrors = 0
    for (let i = 1; i < nbrs.length; i++) {
        if (isDecreasing) {
            if (nbrs[i] > nbrs[i - 1]) {
                nbrOfErrors++
            }
        } else {
            if (nbrs[i] < nbrs[i - 1]) {
                nbrOfErrors++
            }
        }
    }
    return nbrOfErrors
}

export function checkNumberOfErrorsRespectDistance(nbrs: number[]): number {
    let nbrOfErrors = 0
    for (let i = 1; i < nbrs.length; i++) {
        const ok = Math.abs(nbrs[i] - nbrs[i - 1]) >= 1 && Math.abs(nbrs[i] - nbrs[i - 1]) <= 3
        if (!ok) {
            nbrOfErrors++;
        }
    }
    return nbrOfErrors
}

export function isSafeWithTolerance(nbrs: number[], nbrOfAcceptedErrors: number = 0): boolean {
    return checkNumberOfErrorsDecreasingIncreasing(nbrs) + checkNumberOfErrorsRespectDistance(nbrs) <= nbrOfAcceptedErrors;
}

export function solvePart1(input: string): number {
    const lines = input.split('\n');

    let nbrOfSafeLines = 0
    for (let i = 0; i < lines.length; i++) {
        nbrOfSafeLines += isSafeWithTolerance(lines[i].split(' ').map(nbr => parseInt(nbr)), 0) ? 1 : 0
    }

    return nbrOfSafeLines;
}

export function solvePart2(input: string): number {
    const lines = input.split('\n');

    let nbrOfSafeLines = 0
    for (let i = 0; i < lines.length; i++) {
        nbrOfSafeLines += isSafeWithTolerance(lines[i].split(' ').map(nbr => parseInt(nbr)), 1) ? 1 : 0
    }

    return nbrOfSafeLines;
}

if (require.main === module) {
    const input = readInput("src/day02/input.txt");
    console.log("Part 1:", solvePart1(input));
    console.log("Part 2:", solvePart2(input));
}