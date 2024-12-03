import { describe, it, expect, test } from "bun:test";
import { extractMultiplications, solvePart1, solvePart2, multiply, extractInstructions, multiplyAuthorizedMultiplications } from "@/day03/solution";

describe("Day 3", () => {
    describe('extractMultiplications', () => {
        test('It should return all matching multiplications', () => {
            const result = extractMultiplications('xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))')
            expect(result).toEqual(['mul(2,4)', 'mul(5,5)', 'mul(11,8)','mul(8,5)'])
        })
    })

    describe('multiply', () => {
        test('It should return the result of the multiplication', () => {
            const result = multiply('mul(22,5)')
            expect(result).toEqual(110);
        })
    })

    describe('solvePart1', () => {
        test('It should return the addition of all the correct multiplications', () => {
            const input = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'
            expect(solvePart1(input)).toBe(161);
        })
    })

    describe('extractInstructions', () => {
        test('It should return all instructions mul, do and don\'t', () => {
            const input = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
            expect(extractInstructions(input)).toEqual(['mul(2,4)', 'don\'t()', 'mul(5,5)', 'mul(11,8)', 'do()', 'mul(8,5)'])
        })
    })

    describe('multiplyAuthorizedMultiplications', () => {
        test('It should only multiply authorized multiplications that are not after a don\'t', () => {
            const instructions = ['mul(2,4)', 'don\'t()', 'mul(5,5)', 'mul(11,8)', 'do()', 'mul(8,5)']
            expect(multiplyAuthorizedMultiplications(instructions)).toBe(48);
        })
    })

    describe('solvePart2', () => {
        test("It should return the addition of the authorized multiplications", () => {
            const exampleInput = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
            expect(solvePart2(exampleInput)).toBe(48);
        });
    })
});
