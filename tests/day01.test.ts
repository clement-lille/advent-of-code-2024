import { describe, it, expect, test } from "bun:test";
import { solvePart1, solvePart2, createArraysFromInput } from "@/day01/solution";

describe("Day 1", () => {
    describe('createArraysFromInput', () => {
        test('It should create two arrays', () => {
            expect(createArraysFromInput('3   4\n4   3\n2   5')).toEqual({ left: [3, 4, 2], right: [4, 3, 5] })
        })
    })

    describe('Part 1', () => {
        test("It should return the correct answer", () => {
            const exampleInput = '3   4\n4   3\n2   5';
            expect(solvePart1(exampleInput)).toBe(3);
        });
    
        test("It should return the correct answer", () => {
            const exampleInput = `3   4\n4   3\n2   5\n1   3\n3   9\n3   3`;
            expect(solvePart1(exampleInput)).toBe(11);
        });
    });
    
    describe('Part 2', () => {
        test('It should return the correct answer', () => {
            const exampleInput = `3   4\n4   3\n2   5\n1   3\n3   9\n3   3`;
            expect(solvePart2(exampleInput)).toBe(31);
        })
    })
});