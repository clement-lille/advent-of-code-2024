import { readFileSync } from "fs";

export function readInput(filePath: string): string {
    return readFileSync(filePath, "utf-8").trim();
}

export function solvePart1(input: string): number {
    console.warn('bonjour', input)
    return 0;
}

export function solvePart2(input: string): number {
    // Implémente ici la solution pour la partie 2
    return 0;
}

// Si le fichier est exécuté directement (par exemple via `bun run` ou `node`), lis l'entrée et affiche les résultats
if (require.main === module) {
    const input = readInput("src/day01/input.txt"); // Remplace par le chemin du fichier d'entrée
    console.log("Part 1:", solvePart1(input));
    console.log("Part 2:", solvePart2(input));
}