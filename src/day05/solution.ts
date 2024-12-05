import { readFileSync } from "fs";

export function readInput(filePath: string): string {
    return readFileSync(filePath, "utf-8").trim();
}

type Rule = [number, number]

interface ParsedInput {
    rules: Rule[],
    updates: number[][]
}

export function parseInput(input: string): ParsedInput {
    const [ruleSection, updateSelection] = input.split('\n\n');
    
    return {
        rules: ruleSection.split('\n').map(line => {
            const [left, right] = line.split('|');
            return [parseInt(left), parseInt(right)];
        }),
        updates: updateSelection.split('\n').map(line => {
            return line.split(',').map(number => parseInt(number));
        })
    }
}

export function filterRelevantRules(update: number[], rules: Rule[]): Rule[] {
    return rules.filter(([a, b]) => update.find(u => u === a) && update.find(u => u === b));
}

export function checkOrderUpdate (update: number[], relevantRules: Rule[]): boolean {
    for (const [a, b] of relevantRules) {
        if (update.indexOf(a) > update.indexOf(b)) {
            return false;
        }
    }
    return true
}

export function getSumOfTheMiddleOfUpdates(correctUpdates: number[][]): number {
    return correctUpdates.reduce((accumulator, currentValue) => {
        const middle = Math.floor(currentValue.length / 2)
        return accumulator + currentValue[middle]
    }, 0)
}

export function solvePart1(input: string): number {
    const parsedInput = parseInput(input);

    return parsedInput.updates.reduce((accumulator, currentValue) => {
        const relevantRules = filterRelevantRules(currentValue, parsedInput.rules);
        if (checkOrderUpdate(currentValue, relevantRules)) {
            accumulator += getSumOfTheMiddleOfUpdates([currentValue]);
        }
        return accumulator
    }, 0)
}

function fixUpdate(update: number[], rules: Rule[]): number[] {
    let isSorted = false;
  
    while (!isSorted) {
      isSorted = true;
  
      for (const [a, b] of rules) {
        const indexA = update.indexOf(a);
        const indexB = update.indexOf(b);
  
        if (indexA === -1 || indexB === -1) continue;
  
        // If the rule is violated (a should be before b), fix it
        if (indexA > indexB) {
          update.splice(indexA, 1);
          const newIndexB = update.indexOf(b);
          update.splice(newIndexB, 0, a);
  
          isSorted = false;
        }
      }
    }
  
    return update;
}

export function solvePart2(input: string): number {
    const parsedInput = parseInput(input);

    return parsedInput.updates.reduce((accumulator, currentUpdate) => {
        const relevantRules = filterRelevantRules(currentUpdate, parsedInput.rules);
        if (!checkOrderUpdate(currentUpdate, relevantRules)) {
            const fixedUpdate = fixUpdate(currentUpdate, relevantRules);
            accumulator += getSumOfTheMiddleOfUpdates([fixedUpdate]);
        }
        return accumulator
    }, 0)
}

if (require.main === module) {
    const input = readInput("src/day05/input.txt");
    console.log("Part 1:", solvePart1(input));
    console.log("Part 2:", solvePart2(input));
}