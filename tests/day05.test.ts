import { describe, it, expect, test } from "bun:test";
import { checkOrderUpdate, filterRelevantRules, getSumOfTheMiddleOfUpdates, parseInput, solvePart1, solvePart2 } from "../src/day05/solution";

describe("Day 5", () => {
    describe('parseInput', () => {
        test('It should the parsed input', () => {
            const input = `47|53\n97|13\n97|61\n\n75,47,61,53,29\n97,61,53,29,13`
            expect(parseInput(input)).toEqual({
                rules: [[47, 53], [97, 13], [97, 61]],
                updates: [[75, 47, 61, 53, 29], [97, 61, 53, 29, 13]]
            })
        })
    })

    describe('filterRelevantRules', () => {
        test('It should return the relevant rules depending on the given update', () => {
            expect(
                filterRelevantRules(
                    [75, 47, 61, 53, 29], 
                    [[72, 15], [47, 53], [97, 61], [75, 29]]
                )
            ).toEqual([[47, 53], [75, 29]]);
        })
    })

    describe('checkOrderUpdate', () => {
        test('It should return true when the order is respected', () => {
            expect(
                checkOrderUpdate(
                    [75, 47, 61, 53, 29], 
                    [[47, 53], [75, 29]]
                )
            ).toBe(true);
        })

        test('It should return false when the order is not respected', () => {
            expect(
                checkOrderUpdate(
                    [75, 47, 61, 53, 29], 
                    [[53, 47], [75, 29]]
                )
            ).toBe(false);
        })
    })

    describe('getSumOfTheMiddleOfUpdates', () => {
        test('It should return the sum of the middle of each page', () => {
            expect(getSumOfTheMiddleOfUpdates([
                [75, 47, 61, 53, 29], [97, 61, 53, 29, 13], [22, 15, 15]
            ])).toBe(129);
        })
    })

    it("Part 1 example", () => {
        const exampleInput = `47|53\n97|13\n97|61\n97|47\n75|29\n61|13\n75|53\n29|13\n97|29\n53|29\n61|53\n97|53\n61|29\n47|13\n75|47\n97|75\n47|61\n75|61\n47|29\n75|13\n53|13\n\n75,47,61,53,29\n97,61,53,29,13\n75,29,13\n75,97,47,61,53\n61,13,29\n97,13,75,29,47`;
        expect(solvePart1(exampleInput)).toBe(143);
    });

    it("Part 2 example", () => {
        const exampleInput = `47|53\n97|13\n97|61\n97|47\n75|29\n61|13\n75|53\n29|13\n97|29\n53|29\n61|53\n97|53\n61|29\n47|13\n75|47\n97|75\n47|61\n75|61\n47|29\n75|13\n53|13\n\n75,47,61,53,29\n97,61,53,29,13\n75,29,13\n75,97,47,61,53\n61,13,29\n97,13,75,29,47`;
        expect(solvePart2(exampleInput)).toBe(123);
    });
});
