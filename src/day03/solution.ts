import { readFileSync } from "fs";

export function readInput(filePath: string): string {
    return readFileSync(filePath, "utf-8").trim();
}

export function extractMultiplications(input: string): string[] {
    const regex = new RegExp(/(mul\(\d+,\d+\))/g)

    const matches = input.match(regex)
    return matches?.map(match => match) ?? []
}

export function multiply(input: string): number {
    const regex = new RegExp(/mul\((\d+),(\d+)\)/g)
    const matches = input.matchAll(regex)
    for (const match of matches) {
        return parseInt(match[1]) * parseInt(match[2])
    }
    return 0
}

export function solvePart1(input: string): number {
    const multiplications = extractMultiplications(input);
    return multiplications.reduce((accumulator, currentValue) => {
        accumulator += multiply(currentValue)
        return accumulator
    }, 0)
}

export function extractInstructions(input: string): string[] {
    const regex = new RegExp(/do\(\)|don't\(\)|mul\(\d+,\d+\)/g)
    const matches = input.match(regex)
    return matches?.map(match => match) ?? []
}

export function multiplyAuthorizedMultiplications (instructions: string[]): number {
    let isEnabled = true;
    let total = 0;

    // Process each instruction
    for (const instruction of instructions) {
        if (instruction === 'do()') {
            isEnabled = true;
        } else if (instruction === "don't()") {
            isEnabled = false;
        } else if (instruction.startsWith('mul(')) {
            if (isEnabled) {
                const numbers = instruction.match(/\d+/g)
                if (numbers) {
                    total += parseInt(numbers[0]) * parseInt(numbers[1]);
                }
            }
        }
    }

    return total
}

export function computeAuthorizedMultiplications(input: string): number {
    const instructions = extractInstructions(input);

    if (!instructions) {
        return 0
    }
    
    return multiplyAuthorizedMultiplications(instructions);
}

export function solvePart2(input: string): number {
    return computeAuthorizedMultiplications(input);
}

if (require.main === module) {
    const input = readInput("src/day03/input.txt");
    console.log("Part 1:", solvePart1(input));
    console.log("Part 2:", solvePart2(input));
}