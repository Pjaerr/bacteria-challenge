import { Cell, parseInput, stringifyOutput, areNeighbours } from "./utils";

function Bacteria(input) {
    const liveBacteriaPositions = parseInput(input);

    const cells: Cell[] = liveBacteriaPositions.map(pos => { return { x: pos.x, y: pos.y, isDead: false } });

    //Create a dead cell in each space around a live cell with a radius of 1, if there isn't already a cell there.
    const spaceIsFree = (x: number, y: number): boolean => cells.filter(cell => {
        return cell.x === x && cell.y === y;
    }).length <= 0;

    cells.forEach(cell => {
        if (spaceIsFree(cell.x - 1, cell.y)) cells.push({ x: cell.x - 1, y: cell.y, isDead: true });
        if (spaceIsFree(cell.x - 1, cell.y + 1)) cells.push({ x: cell.x - 1, y: cell.y + 1, isDead: true });
        if (spaceIsFree(cell.x - 1, cell.y - 1)) cells.push({ x: cell.x - 1, y: cell.y - 1, isDead: true });

        if (spaceIsFree(cell.x + 1, cell.y)) cells.push({ x: cell.x + 1, y: cell.y, isDead: true });
        if (spaceIsFree(cell.x + 1, cell.y + 1)) cells.push({ x: cell.x + 1, y: cell.y + 1, isDead: true });
        if (spaceIsFree(cell.x + 1, cell.y - 1)) cells.push({ x: cell.x + 1, y: cell.y - 1, isDead: true });

        if (spaceIsFree(cell.x, cell.y + 1)) cells.push({ x: cell.x, y: cell.y + 1, isDead: true });
        if (spaceIsFree(cell.x, cell.y - 1)) cells.push({ x: cell.x, y: cell.y - 1, isDead: true });
    });


    const nextGeneration: Cell[] = [];

    for (const currentCell of cells) {
        const neighbouringCells: Cell[] = [];

        //Check all other cells for any neighbouring live cells
        for (const nextCell of cells) {
            if (!nextCell.isDead && areNeighbours(currentCell, nextCell)) {
                neighbouringCells.push(nextCell);
            }
        }

        //Any live bacteria cell with fewer than two live neighbours dies, as if caused by under - population
        //Any live bacteria cell with two or three live neighbours lives on to the next generation
        //Any live bacteria cell with more than three live neighbours dies, as if by overcrowding.
        //Any dead bacteria cell with exactly three live neighbours becomes a live bacteria cell, as if by reproduction.

        let isDead = currentCell.isDead;

        if (isDead) {
            //Dead cell is brought back to life via reproduction
            if (neighbouringCells.length === 3) {
                isDead = false;
            }
        }
        else {
            //Live cell is killed via under/over crowding.
            if (neighbouringCells.length < 2 || neighbouringCells.length > 3) {
                isDead = true;
            }
        }

        if (!isDead) {
            nextGeneration.push({
                x: currentCell.x,
                y: currentCell.y,
                isDead
            });
        }
    }

    return stringifyOutput(nextGeneration);
}


let input = "1,2\n2,2\n3,2\n1000000001,1000000002\n1000000002,1000000002\n1000000003,1000000002\nend";

// let input = "1,2\n2,2\n3,2\n4,4\nend";

for (let i = 0; i < 5; i++) {
    input = Bacteria(input);
}
