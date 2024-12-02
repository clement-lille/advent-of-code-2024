import { exec } from "child_process";

function runDay(day: number) {
    const dayStr = day.toString().padStart(2, "0");
    const solutionFile = `src/day${dayStr}/solution.ts`;

    console.log(`Running solution for Day ${dayStr}...`);

    const command = `bun run ${solutionFile}`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        console.log(stdout);
    });
}

// Récupérer le jour à partir des arguments
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

runDay(dayNumber);
