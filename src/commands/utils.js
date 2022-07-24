import fs from 'fs';
import path from 'path';

export function checkInputGetOutput(input, suffix) {
    if (!fs.existsSync(input)) {
        throw new Error(`File not found: ${input}`);
    }

    const output = path.parse(input).name + suffix;

    if (fs.existsSync(output)) {
        throw new Error(`Output file already exists: ${output}`);
    }
    return output;
}
