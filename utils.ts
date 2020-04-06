export type Cell = {
    x: number;
    y: number;
    isDead: boolean;
};

export const parseInput = (input: string): { x: number, y: number }[] => {
    const parsedInput = input.split('\n').filter(line => line !== "end").map(position => {
        const [x, y] = position.split(',');

        return { x: parseInt(x), y: parseInt(y) };
    });

    return parsedInput;
};

export const stringifyOutput = (cells: Cell[]) => {
    let output = "";

    cells.forEach(cell => {
        output += `${cell.x},${cell.y}\n`;
    });

    output += "end";

    return output;
};

export const areNeighbours = (cell1: Cell, cell2: Cell): boolean => {
    if (cell1.x - 1 === cell2.x && cell1.y === cell2.y ||
        cell1.x - 1 === cell2.x && cell1.y + 1 === cell2.y ||
        cell1.x - 1 === cell2.x && cell1.y - 1 === cell2.y ||

        cell1.x + 1 === cell2.x && cell1.y === cell2.y ||
        cell1.x + 1 === cell2.x && cell1.y + 1 === cell2.y ||
        cell1.x + 1 === cell2.x && cell1.y - 1 === cell2.y ||

        cell1.x === cell2.x && cell1.y + 1 === cell2.y ||
        cell1.x === cell2.x && cell1.y - 1 === cell2.y) {
        return true;
    }

    return false;
};