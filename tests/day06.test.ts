import { describe, it, expect, test } from "bun:test";
import { parseInput, getStartingPosition, solvePart1, solvePart2, rotateGuard, isLeavingMap } from "../src/day06/solution";

describe("Day 6", () => {
    describe('parseInput', () => {
        test('It should the parsed input', () => {
            const input = '..#..\n....#\n.....'
            expect(parseInput(input)).toEqual([
                ['.', '.', '#', '.', '.'],
                ['.', '.', '.', '.', '#'],
                ['.', '.', '.', '.', '.']
            ])
        })
    })

    describe('getStartingPosition', () => {
        test('It should return the starting position of the guard', () => {
            const input = [
                ['.', '.', '#', '.', '.'],
                ['.', '.', '.', '^', '#'],
                ['.', '.', '.', '.', '.']
            ]
            expect(getStartingPosition(input)).toEqual({
                row: 1,
                col: 3,
                direction: '^',
            })
        })
    })

    describe('rotateGuard', () => {
        test('It should return the new position of the guard', () => {
            expect(rotateGuard('^')).toBe('>');
            expect(rotateGuard('>')).toBe('v');
            expect(rotateGuard('v')).toBe('<');
            expect(rotateGuard('<')).toBe('^');
        })
    })

    describe('isLeavingMap', () => {
        test('It should return true when the next position is leaving the map', () => {
            expect(isLeavingMap(-1, 0, 3, 3)).toBe(true);
            expect(isLeavingMap(4, 0, 3, 3)).toBe(true);
            expect(isLeavingMap(0, -1, 3, 3)).toBe(true);
            expect(isLeavingMap(0, 4, 3, 3)).toBe(true);
            expect(isLeavingMap(2, 2, 3, 3)).toBe(false);
        })
    })

    it("Part 1 example", () => {
        const exampleInput = '....#.....\n.........#\n..........\n..#.......\n.......#..\n..........\n.#..^.....\n........#.\n#.........\n......#...';
        expect(solvePart1(exampleInput)).toBe(41);
    });

    it("Part 2 example", () => {
        const exampleInput = "....#.....\n.........#\n..........\n..#.......\n.......#..\n..........\n.#..^.....\n........#.\n#.........\n......#...";
        expect(solvePart2(exampleInput)).toBe(6);
    });
});
