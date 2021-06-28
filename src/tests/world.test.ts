import { Cell, CellStatus } from '../core/cell';
import { World } from '../core/world';

const { Dead, Alive } = CellStatus;

describe('World', () => {
	it('creates the world for a given cell status matrix', () => {
		const initialStatus = [
			[Dead, Dead, Dead],
			[Dead, Alive, Dead],
			[Dead, Dead, Dead],
		];

		const world = World.createFrom(initialStatus).getCellMatrix();

		expect(world).toEqual([
			[Cell.create(Dead), Cell.create(Dead), Cell.create(Dead)],
			[Cell.create(Dead), Cell.create(Alive), Cell.create(Dead)],
			[Cell.create(Dead), Cell.create(Dead), Cell.create(Dead)],
		]);
	});

	it('gets subset neighboring rows for a given specific row', ()=>{
		const world = World.createFrom([
			[Dead, Dead, Dead, Dead, Dead],
			[Dead, Alive, Dead, Dead, Dead],
			[Dead, Dead, Alive, Dead, Dead],
			[Dead, Dead, Dead, Alive, Dead],
			[Dead, Dead, Dead, Dead, Dead]
		]);

		const result = world.subsetNeighboringRows(2);

		expect(result).toEqual([
			[Cell.create(Dead), Cell.create(Alive), Cell.create(Dead), Cell.create(Dead), Cell.create(Dead)],
			[Cell.create(Dead), Cell.create(Dead), Cell.create(Alive), Cell.create(Dead), Cell.create(Dead)],
			[Cell.create(Dead), Cell.create(Dead), Cell.create(Dead), Cell.create(Alive), Cell.create(Dead)],
		]);
	});

	it('gets subset neighboring rows for a given first row', ()=>{
		const world = World.createFrom([
			[Dead, Dead, Dead, Dead, Dead],
			[Dead, Alive, Dead, Dead, Dead],
			[Dead, Dead, Alive, Dead, Dead],
			[Dead, Dead, Dead, Alive, Dead],
			[Dead, Dead, Dead, Dead, Dead]
		]);

		const result = world.subsetNeighboringRows(0);

		expect(result).toEqual([
			[Cell.create(Dead), Cell.create(Dead), Cell.create(Dead), Cell.create(Dead), Cell.create(Dead)],
			[Cell.create(Dead), Cell.create(Alive), Cell.create(Dead), Cell.create(Dead), Cell.create(Dead)]
		]);
	});

	it('gets subset neighboring rows for a given last row', ()=>{
		const world = World.createFrom([
			[Dead, Dead, Dead, Dead, Dead],
			[Dead, Alive, Dead, Dead, Dead],
			[Dead, Dead, Alive, Dead, Dead],
			[Dead, Dead, Dead, Alive, Dead],
			[Dead, Dead, Dead, Dead, Dead]
		]);

		const result = world.subsetNeighboringRows(4);

		expect(result).toEqual([
			[Cell.create(Dead), Cell.create(Dead), Cell.create(Dead), Cell.create(Alive), Cell.create(Dead)],
			[Cell.create(Dead), Cell.create(Dead), Cell.create(Dead), Cell.create(Dead), Cell.create(Dead)]
		]);
	});

	it('gets subset neighboring matrix for a given specific coordinates', ()=>{
		const world = World.createFrom([
			[Dead, Dead, Dead, Dead, Dead],
			[Dead, Alive, Dead, Dead, Dead],
			[Dead, Dead, Alive, Dead, Dead],
			[Dead, Dead, Dead, Alive, Dead],
			[Dead, Dead, Dead, Dead, Dead]
		]);

		const result = world.subsetNeighboringMatrix(2, 2);

		expect(result).toEqual([
			[Cell.create(Alive), Cell.create(Dead), Cell.create(Dead)],
			[Cell.create(Dead), Cell.create(Alive), Cell.create(Dead)],
			[Cell.create(Dead), Cell.create(Dead), Cell.create(Alive)],
		]);
	});

	it('gets subset neighboring matrix for a given edge coordinates', ()=>{
		const world = World.createFrom([
			[Dead, Dead, Dead, Dead, Dead],
			[Dead, Alive, Dead, Dead, Dead],
			[Dead, Dead, Alive, Dead, Dead],
			[Dead, Dead, Dead, Alive, Dead],
			[Dead, Dead, Dead, Dead, Dead]
		]);

		const result = world.subsetNeighboringMatrix(0, 0);

		expect(result).toEqual([
			[Cell.create(Dead), Cell.create(Dead)],
			[Cell.create(Dead), Cell.create(Alive)],
		]);
	});

	it('gets number of alive neighbors for a given specific coordinates', ()=>{
		const world = World.createFrom([
			[Dead, Dead, Dead, Dead, Dead],
			[Dead, Alive, Dead, Dead, Dead],
			[Dead, Alive, Dead, Dead, Dead],
			[Dead, Dead, Dead, Alive, Dead],
			[Dead, Dead, Dead, Dead, Dead]
		]);

		const result = world.aliveNeighbors(2, 2);

		expect(result).toBe(3)
	});

	it('gets number of alive neighbors excluding given alive cell', ()=>{
		const world = World.createFrom([
			[Dead, Dead, Dead, Dead, Dead],
			[Dead, Alive, Dead, Dead, Dead],
			[Dead, Alive, Alive, Dead, Dead],
			[Dead, Dead, Dead, Alive, Dead],
			[Dead, Dead, Dead, Dead, Dead]
		]);

		const result = world.aliveNeighborsExcludingCurrentCell(2, 2);

		expect(result).toBe(3)
	});

	it('yields the next state of the game', () => {
		const world = World.createFrom([
			[Dead, Dead, Dead, Dead, Dead],
			[Dead, Dead, Alive, Dead, Dead],
			[Dead, Dead, Alive, Dead, Dead],
			[Dead, Dead, Alive, Dead, Dead],
			[Dead, Dead, Dead, Dead, Dead],
		]);

		const result = world.tick().getCellMatrix();

		expect(result).toEqual([
			[Cell.create(Dead), Cell.create(Dead), Cell.create(Dead), Cell.create(Dead), Cell.create(Dead)],
			[Cell.create(Dead), Cell.create(Dead), Cell.create(Dead), Cell.create(Dead), Cell.create(Dead)],
			[Cell.create(Dead), Cell.create(Alive), Cell.create(Alive), Cell.create(Alive), Cell.create(Dead)],
			[Cell.create(Dead), Cell.create(Dead), Cell.create(Dead), Cell.create(Dead), Cell.create(Dead)],
			[Cell.create(Dead), Cell.create(Dead), Cell.create(Dead), Cell.create(Dead), Cell.create(Dead)],
		]);
	});

	it('a world with a given initial block pattern never changes', () => {
		const world = World.createFrom([
			[Alive, Alive, Dead, Dead, Dead],
			[Alive, Alive, Dead, Dead, Dead],
			[Dead, Dead, Dead, Dead, Dead],
			[Dead, Dead, Dead, Dead, Dead],
			[Dead, Dead, Dead, Dead, Dead],
		]);

		const result = world.tick().tick().tick().getCellMatrix();

		expect(result).toEqual(world.getCellMatrix());
	});

	it('a world with a given initial oscillator pattern returns to the initial state', () => {
		const world = World.createFrom([
			[Dead, Dead, Dead, Dead, Dead],
			[Dead, Dead, Alive, Dead, Dead],
			[Dead, Dead, Alive, Dead, Dead],
			[Dead, Dead, Alive, Dead, Dead],
			[Dead, Dead, Dead, Dead, Dead],
		]);

		const result = world.tick().tick().getCellMatrix()

		expect(result).toEqual(world.getCellMatrix());
	});
});
