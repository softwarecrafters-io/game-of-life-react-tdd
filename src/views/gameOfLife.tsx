import * as React from 'react';
import { useState } from 'react';
import { Cell, CellStatus } from '../core/cell';
import { World } from '../core/world';
const { Dead, Alive } = CellStatus;

export function GameOfLife() {
	const initialWorld = World.createFrom([
		[Dead, Dead, Dead, Dead, Dead],
		[Dead, Dead, Alive, Dead, Dead],
		[Dead, Dead, Alive, Dead, Dead],
		[Dead, Dead, Alive, Dead, Dead],
		[Dead, Dead, Dead, Dead, Dead],
	]);
	const [currentWorld, nextWorld] = useState(initialWorld);

	return (
		<div className="container">
			<h1>Game of life</h1>
			<table>{transformMatrixToTable(currentWorld.getCellMatrix())}</table>
			<button onClick={() => nextWorld(currentWorld.tick())}>Next</button>
		</div>
	);
}

function transformMatrixToTable(matrix:Cell[][]) {
	return matrix.map((row, rowIndex) => (
		<tr key={rowIndex}>
			{row.map((cell, columnIndex) => (
				<td key={columnIndex} className={cell.isAlive() ? 'alive' : 'dead'} />
			))}
		</tr>
	));
}