import { describe, it, expect, test } from "bun:test";
import { solvePart1, solvePart2, checkNumberOfErrorsDecreasingIncreasing, checkNumberOfErrorsRespectDistance } from "@/day02/solution";

describe("Day 2", () => {   
    describe('checkNumberOfErrorsDecreasingIncreasing', () => {
        test('It should return 0 when the line is always increasing', () => {
            expect(checkNumberOfErrorsDecreasingIncreasing([1, 2, 3])).toBe(0);
        })

        test('It should return true when the line is always decreasing', () => {
            expect(checkNumberOfErrorsDecreasingIncreasing([3, 2, 1])).toBe(0);
        })

        test('It should return false when the line is not always decreasing', () => {
            expect(checkNumberOfErrorsDecreasingIncreasing([3, 2, 5])).toBe(1);
        })

        test('It should return false when the line is not always increasing', () => {
            expect(checkNumberOfErrorsDecreasingIncreasing([2, 5, 3, 7, 1])).toBe(2);
        })
    })

    describe('checkNumberOfErrorsRespectDistance', () => {
        test('It should return false when there is a distance too big', () => {
            expect(checkNumberOfErrorsRespectDistance([1, 2, 7, 8, 9])).toBe(1);
        })

        test('It should return false when the distance does not change between 2 numbers', () => {
            expect(checkNumberOfErrorsRespectDistance([1, 1, 2, 3, 5])).toBe(1);
        })

        test('It should return true when the distance is always between 1 and 3', () => {
            expect(checkNumberOfErrorsRespectDistance([1, 2, 5, 7, 9])).toBe(0);
        })
    })

    it("Part 1 example", () => {
        const exampleInput = '7 6 4 2 1\n1 2 7 8 9\n9 7 6 2 1\n1 3 2 4 5\n8 6 4 4 1\n1 3 6 7 9';
        expect(solvePart1(exampleInput)).toBe(2);
    });

    it("Part 2 example", () => {
        const exampleInput = '7 6 4 2 1\n1 2 7 8 9\n9 7 6 2 1\n1 3 2 4 5\n8 6 4 4 1\n1 3 6 7 9';
        expect(solvePart2(exampleInput)).toBe(6);
    });
});
