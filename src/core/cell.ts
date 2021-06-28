export enum CellStatus {
	Dead,
	Alive,
}

export class Cell{
	private constructor(private readonly status: CellStatus) {}

	static create(status: CellStatus) {
		if (status == null) {
			throw new Error('Invalid status');
		}
		return new Cell(status);
	}

	nextGeneration(numberNeighbors: number) {
		return Cell.create(this.isAlive()
			? this.nextGenerationForStableNeighborhood(numberNeighbors)
			: this.nextGenerationForFertileNeighborhood(numberNeighbors)
		);
	}

	private nextGenerationForStableNeighborhood(numberNeighbors: number) {
		return numberNeighbors === 2 || numberNeighbors === 3 ? CellStatus.Alive : CellStatus.Dead;
	}

	private nextGenerationForFertileNeighborhood(numberNeighbors: number) {
		return numberNeighbors === 3 ? CellStatus.Alive : CellStatus.Dead;
	}

	isAlive() {
		return this.status === CellStatus.Alive;
	}
}