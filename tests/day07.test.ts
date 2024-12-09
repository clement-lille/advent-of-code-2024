import { describe, it, expect, test } from "bun:test";
import { associateNumbers, evaluateEquation, generateAllCombinationsOperators, parseInput, solvePart1, solvePart2 } from "../src/day07/solution";

describe("Day 7", () => {
    describe('parseInput', () => {
        test('It should the parsed input', () => {
            const input = '190: 10 19\n3267: 81 40 27\n83: 17 5\n156: 15 6';
            expect(parseInput(input)).toEqual([{
                result: 190,
                numbers: [10, 19]
            }, {
                result: 3267,
                numbers: [81, 40, 27]
            }, {
                result: 83,
                numbers: [17, 5]
            }, {
                result: 156,
                numbers: [15, 6]
            }])
        })
    })

    describe('associateNumbers', () => {
        test('It should multiply the numbers when passing *', () => {
            expect(associateNumbers(2, 4, '*')).toBe(8)
        })

        test('It should add the numbers when passing +', () => {
            expect(associateNumbers(2, 4, '+')).toBe(6)
        })

        test('It should add the numbers when passing +', () => {
            expect(associateNumbers(2, 4, '||')).toBe(24)
        })
    })

    describe('evaluateEquation', () => {
        test('It should evaluate the equation', () => {
            const equation = {
                result: 190,
                numbers: [10, 19]
            }
            expect(evaluateEquation(equation, ['*'])).toBe(190)
        })
        test('It should evaluate the equation', () => {
            const equation = {
                result: 195,
                numbers: [81, 40, 27]
            }
            expect(evaluateEquation(equation, ['*', '+'])).toBe(3267)
        })
        test('It should evaluate the equation', () => {
            const equation = {
                result: 198,
                numbers: [10, 19, 5]
            }
            expect(evaluateEquation(equation, ['*', '+'])).toBe(195)
        })
        test('It should evaluate the equation', () => {
            const equation = {
                result: 7290,
                numbers: [6, 8, 6, 15]
            }
            expect(evaluateEquation(equation, ['*', '||', '*'])).toBe(7290)
        })
    })

    describe('generateAllCombinationsOperators', () => {
        test('It should generate the operators', () => {
            expect(generateAllCombinationsOperators([1, 2, 3, 4], ['*', '+', '||'])).toEqual([
                ["*", "*", "*"], 
                ["*", "*", "+"], 
                ["*", "*", "||"], 
                ["*", "+", "*"], 
                ["*", "+", "+"], 
                ["*", "+", "||"], 
                ["*", "||", "*"], 
                ["*", "||", "+"], 
                ["*", "||", "||"], 
                ["+", "*", "*"], 
                ["+", "*", "+"],
                ["+", "*", "||"], 
                ["+", "+", "*"], 
                ["+", "+", "+"], 
                ["+", "+", "||"], 
                ["+", "||", "*"], 
                ["+", "||", "+"], 
                ["+", "||", "||"], 
                ["||", "*", "*"], 
                ["||", "*", "+"], 
                ["||", "*", "||"], 
                ["||", "+", "*"], 
                ["||", "+", "+"], 
                ["||", "+", "||"], 
                ["||", "||", "*"], 
                ["||", "||", "+"], 
                ["||", "||", "||"]
              ])
        })
    })
    it("Part 1 example", () => {
        const exampleInput = "190: 10 19\n3267: 81 40 27\n83: 17 5\n156: 15 6\n7290: 6 8 6 15\n161011: 16 10 13\n192: 17 8 14\n21037: 9 7 18 13\n292: 11 6 16 20";
        expect(solvePart1(exampleInput)).toBe(3749);
    });

    it("Part 2 example", () => {
        const exampleInput = "190: 10 19\n3267: 81 40 27\n83: 17 5\n156: 15 6\n7290: 6 8 6 15\n161011: 16 10 13\n192: 17 8 14\n21037: 9 7 18 13\n292: 11 6 16 20";
        expect(solvePart2(exampleInput)).toBe(11387);
    });
});
