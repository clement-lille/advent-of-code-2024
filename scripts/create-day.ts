import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";

async function createDay(day: number) {
    const dayStr = day.toString().padStart(2, "0");
    const dayDir = `src/day${dayStr}`;
    const inputFile = `${dayDir}/input.txt`;
    const testFile = `tests/day${dayStr}.test.ts`;

    if (existsSync(dayDir)) {
        console.error(`Day ${dayStr} already exists!`);
        process.exit(1);
    }

    // Crée le dossier pour la solution
    await mkdir(dayDir, { recursive: true });

    // Fichier solution.ts
    const solutionContent = `import { readFileSync } from "fs";

export function readInput(filePath: string): string {
    return readFileSync(filePath, "utf-8").trim();
}

export function solvePart1(input: string): number {
    // Implémente ici la solution pour la partie 1
    return 0;
}

export function solvePart2(input: string): number {
    // Implémente ici la solution pour la partie 2
    return 0;
}

if (require.main === module) {
    const input = readInput("src/day${dayStr}/input.txt");
    console.log("Part 1:", solvePart1(input));
    console.log("Part 2:", solvePart2(input));
}`;
    await writeFile(`${dayDir}/solution.ts`, solutionContent, "utf-8");

    // Fichier input.txt
    await writeFile(inputFile, "", "utf-8");

    // Fichier de test
    const testContent = `import { describe, it, expect } from "bun:test";
import { solvePart1, solvePart2 } from "../src/day${dayStr}/solution";

describe("Day ${day}", () => {
    it("Part 1 example", () => {
        const exampleInput = "example input";
        expect(solvePart1(exampleInput)).toBe(0);
    });

    it("Part 2 example", () => {
        const exampleInput = "example input";
        expect(solvePart2(exampleInput)).toBe(0);
    });
});
`;
    await writeFile(testFile, testContent, "utf-8");

    console.log(`Day ${dayStr} created successfully!`);
}

const dayArg = process.argv[2];
if (!dayArg) {
    console.error("Please specify the day number (e.g., 1 or 01).");
    process.exit(1);
}

const dayNumber = parseInt(dayArg, 10);
if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 25) {
    console.error("Invalid day number. Must be between 1 and 25.");
    process.exit(1);
}

createDay(dayNumber).catch((err) => {
    console.error("Error creating day:", err);
    process.exit(1);
});
