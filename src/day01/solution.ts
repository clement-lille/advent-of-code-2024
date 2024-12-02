import { readFileSync } from "fs";

export function readInput(filePath: string): string {
    return readFileSync(filePath, "utf-8").trim();
}

export function createArraysFromInput(input: string): { left: number[], right: number[] } {
   return input.split('\n').reduce<{ left: number[], right: number[] }>((accumulator, currentValue) => {
        const [left, right] = currentValue.split('   ')!;
        accumulator.left.push(parseInt(left));
        accumulator.right.push(parseInt(right));
        return accumulator;
    }, {
        left: [],
        right: [],
    })
}

export function solvePart1(input: string): number {
    const { left, right } = createArraysFromInput(input);
    const sortedLeft = left.sort((a, b) => a - b);
    const sortedRight = right.sort((a, b) => a - b);

    let counter = 0
    for (let i = 0; i < sortedLeft.length; i++) {
        counter += Math.abs(sortedLeft[i] - sortedRight[i]);
    }
    return counter;
}

export function createArraysOfOccurences(array: number[]): [{ nbr: number, occurence: number }] {
    const { left, right } = createArraysFromInput(input);
    return []
}

export function solvePart2(input: string): number {
    const { left, right } = createArraysFromInput(input);
    const arraysOfOccurences: { nbr: number, occurence: number }[] = []

    for (let i = 0; i < left.length; i++) {
        const currentNbrWithOccurences = arraysOfOccurences.find(array => array.nbr === left[i])
        // Don't need to loop the right list again
        if (currentNbrWithOccurences) {
            arraysOfOccurences.push(currentNbrWithOccurences)
        } else {
            const nbrWithOccurences: { nbr: number, occurence: number } = { nbr: left[i], occurence: 0 }
            right.forEach(rightNbr => {
                if (left[i] === rightNbr) {
                    nbrWithOccurences.occurence++
                }
            })
            arraysOfOccurences.push(nbrWithOccurences)
        }
    }

    return arraysOfOccurences.reduce<number>((accumulator, currentValue) => {
        return accumulator + currentValue.nbr * currentValue.occurence
    }, 0)
}

// Si le fichier est exécuté directement (par exemple via `bun run` ou `node`), lis l'entrée et affiche les résultats
if (require.main === module) {
    const input = readInput("src/day01/input.txt"); // Remplace par le chemin du fichier d'entrée
    console.log("Part 1:", solvePart1(input));
    console.log("Part 2:", solvePart2(input));
}