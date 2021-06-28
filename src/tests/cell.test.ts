import { Cell, CellStatus } from '../core/cell';

describe('Cell', () => {
	it('Any live cell with fewer than two live neighbours dies, as if by underpopulation', () => {
		expect(Cell.create(CellStatus.Alive).nextGeneration(1).isAlive()).toBeFalsy();
		expect(Cell.create(CellStatus.Dead).nextGeneration(1).isAlive()).toBeFalsy();
	});
	it('Any live cell with two or three live neighbours lives on to the next generation.', () => {
		expect(Cell.create(CellStatus.Alive).nextGeneration(2).isAlive()).toBeTruthy();
		expect(Cell.create(CellStatus.Alive).nextGeneration(3).isAlive()).toBeTruthy();
		expect(Cell.create(CellStatus.Dead).nextGeneration(2).isAlive()).toBeFalsy();
	});
	it('Any live cell with more than three live neighbours dies, as if by overpopulation', () => {
		expect(Cell.create(CellStatus.Alive).nextGeneration(4).isAlive()).toBeFalsy();
		expect(Cell.create(CellStatus.Dead).nextGeneration(4).isAlive()).toBeFalsy();
	});
	it('Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction', () => {
		expect(Cell.create(CellStatus.Dead).nextGeneration(3).isAlive()).toBeTruthy();
	});
	it('Cells with undefined initial state are not allowed', () => {
		expect(() => Cell.create(undefined).nextGeneration(2)).toThrow();
		expect(() => Cell.create(null).nextGeneration(2)).toThrow();
	});
});
