import { readFileSync } from "fs";

export function readInput(filePath: string): string {
    return readFileSync(filePath, "utf-8").trim();
}

interface Equation {
    result: number
    numbers: number[]
}

type Operator = '*' | '+' | '||'

export function parseInput (input: string): Equation[] {
    const lines = input.split('\n');
    return lines.map(line => {
        const [result, numbers] = line.split(':')
        return {
            result: parseInt(result),
            numbers: numbers.trim().split(' ').map(number => parseInt(number))
        }
    })
}

export function associateNumbers (a: number, b: number, operator: Operator): number {
    if (operator === '*') {
        return a * b
    }
    if (operator === '+') {
        return a + b
    }
    if (operator === '||') {
        return +`${a}${b}`
    }
    return 0
}

export function evaluateEquation (equation: Equation, operators: Operator[]): number {
    const currentNumbers = equation.numbers.slice();
    const currentOperators = operators.slice()
    while(currentNumbers.length > 1) {
        const result = associateNumbers(currentNumbers[0], currentNumbers[1], currentOperators[0])
        currentNumbers.shift()
        currentNumbers.shift()
        currentOperators.shift()
        currentNumbers.splice(0, 0, result)
    }
    return currentNumbers[0]
}

export function generateAllCombinationsOperators (numbers: number[], operators: Operator[]): Operator[][] {
    const numOperators = numbers.length - 1;
    const combinations: Operator[][] = [];

    function backtrack(currentCombination: Operator[]) {
        if (currentCombination.length === numOperators) {
            combinations.push([...currentCombination]);
            return;
        }

        for (const op of operators) {
            currentCombination.push(op);
            backtrack(currentCombination);
            currentCombination.pop();
        }
    }

    backtrack([]);
    return combinations;
}

export function isPossibleEquation (equation: Equation, operators: Operator[]): boolean {
    const allCombinationsOperators = generateAllCombinationsOperators(equation.numbers, operators);
    for (let i = 0; i < allCombinationsOperators.length; i++) {
        if (equation.result === evaluateEquation(equation, allCombinationsOperators[i])) {
            return true
        }
    }
    return false
}

export function solvePart1(input: string): number {
    const equations = parseInput(input);
    let result = 0;
    for (let i = 0; i < equations.length; i++) {
        if (isPossibleEquation(equations[i], ['*', '+'])) {
            result += equations[i].result
        }
    }
    return result
}

export function solvePart2(input: string): number {
    const equations = parseInput(input);
    let result = 0;
    for (let i = 0; i < equations.length; i++) {
        if (isPossibleEquation(equations[i], ['*', '+', '||'])) {
            result += equations[i].result
        }
    }
    return result
}

if (require.main === module) {
    const input = readInput("src/day07/input.txt");
    console.log("Part 1:", solvePart1(input));
    console.log("Part 2:", solvePart2(input));
}