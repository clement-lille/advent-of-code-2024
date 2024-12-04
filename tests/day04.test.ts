import { describe, it, expect, test } from "bun:test";
import { getColumns, getLines, getDiagonals, solvePart1, solvePart2, nbrOfOccurerencesInLine, nbrOfOccurences } from "@/day04/solution";

describe("Day 4", () => {
    describe('Part 1', () => {
        describe('getLines', () => {
            test('It should return the lines', () => {
                const input = 'MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM';
                const lines = getLines(input)
                expect(lines).toEqual(['MMMSXXMASM', 'MSAMXMSMSA', 'AMXSXMAAMM']);
            })
        })
    
        describe('getColumns', () => {
            test('It should return the columns', () => {
                const columns = getColumns(['MMMSXXMASM', 'MSAMXMSMSA', 'AMXSXMAAMM'])
                expect(columns).toEqual([
                    'MMA',
                    'MSM',
                    'MAX',
                    'SMS',
                    'XXX',
                    'XMM',
                    'MSA',
                    'AMA',
                    'SSM',
                    'MAM'
                ]);
            })
        });
    
        describe('getDiagonals', () => {
            test('It should return the diagonals', () => {
                const diagonals = getDiagonals(['MMMSXXMASM', 'MSAMXMSMSA', 'AMXSXMAAMM'])
                expect(diagonals).toEqual({
                      topLeftToBottomRight: [
                        'MSX',
                        'MM',
                        'A',
                        'MAS',
                        'MMX',
                        'SXM',
                        'XMA',
                        'XSA',
                        'MMM',
                        'ASM',
                        'SA',
                        'M'
                      ],
                      topRightToBottomLeft: [
                        'M',
                        'MM',
                        'MSA',
                        'SAM',
                        'XMX',
                        'XXS',
                        'MMX',
                        'ASM',
                        'SMA',
                        'MSA',
                        'AM',
                        'M'
                      ],
                });
            })
        });
    
        describe('nbrOfOccurerencesInLine', () => {
            test('It should return the number of occurences', () => {
                const line = 'MMMSAMXXMASM';
                expect(nbrOfOccurerencesInLine(line)).toBe(2);
            })
        })
    
        describe('nbrOfOccurerences', () => {
            test('It should return the number of occurences', () => {
                const lines = ['MMMSAMXXMASM', 'XMASSSAMXSAMS'];
                expect(nbrOfOccurences(lines)).toBe(4);
            })
        })
    
        it("Part 1 example", () => {
            const exampleInput = `MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM\nMSAMASMSMX\nXMASAMXAMM\nXXAMMXXAMA\nSMSMSASXSS\nSAXAMASAAA\nMAMMMXMMMM\nMXMXAXMASX`;
            expect(solvePart1(exampleInput)).toBe(18);
        });
    })

    describe('Part 2', () => {
        it("Part 2 example", () => {
            const exampleInput = `MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM\nMSAMASMSMX\nXMASAMXAMM\nXXAMMXXAMA\nSMSMSASXSS\nSAXAMASAAA\nMAMMMXMMMM\nMXMXAXMASX`;
            expect(solvePart2(exampleInput)).toBe(9);
        });
    })
});
