import { Cell, CellStatus } from './cell';

export class World{
	private constructor(private readonly cellMatrix: Cell[][]) {
	}

	static createFrom(statusMatrix: CellStatus[][]){
		const cellMatrix = statusMatrix.map(row => row.map(status=> Cell.create(status)))
		return new World(cellMatrix)
	}

	static create(cellMatrix: Cell[][]){
		return new World(cellMatrix);
	}

	tick() {
		const cellMatrix = this.cellMatrix.map((row, rowIndex)=>
			row.map((cell, columnIndex)=>
				cell.nextGeneration(this.aliveNeighborsExcludingCurrentCell(rowIndex, columnIndex))))
		return World.create(cellMatrix)
	}

	aliveNeighborsExcludingCurrentCell(row, column){
		if(this.cellMatrix[row][column].isAlive()){
			return this.aliveNeighbors(row, column) - 1
		}
		return this.aliveNeighbors(row, column);
	}

	aliveNeighbors(row, column){
		return this.subsetNeighboringMatrix(row, column)
			.flatMap(row => row.filter(cell => cell.isAlive())).length
	}

	subsetNeighboringMatrix(row, column){
		return this.subsetNeighboringRows(row)
			.map(row => row.filter((_, columnIndex)=> this.filterApplicableColumns(columnIndex, column)))
	}

	private filterApplicableColumns(columnIndex: number, column) {
		const previousColumn = column - 1;
		const currentColumn = column + 1;
		return columnIndex >= previousColumn && columnIndex <= currentColumn;
	}

	subsetNeighboringRows(row: number) {
		return this.cellMatrix
			.filter((_, rowIndex)=> this.filterApplicableRows(rowIndex, row))
	}

	private filterApplicableRows(rowIndex: number, row: number) {
		const previousRow = row - 1;
		const nextRow = row + 1;
		return rowIndex >= previousRow && rowIndex <= nextRow;
	}

	getCellMatrix() {
		return this.cellMatrix;
	}
}
