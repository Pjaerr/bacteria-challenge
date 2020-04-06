type Cell = {
    x: number;
    y: number;
    isDead: boolean;
}

//Format input recieved into something that looks like the following:

const inputs = [
    [1, 2],
    [2, 2],
    [3, 2],
    [1000000001, 1000000002],
    [1000000002, 1000000002],
    [1000000003, 1000000002]];


const cells: Cell[] = inputs.map(input => { return { x: input[0], y: input[1], isDead: false } });

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

const areNeighbours = (cell1: Cell, cell2: Cell): boolean => {
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
}

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

//Format the next generation into expected format