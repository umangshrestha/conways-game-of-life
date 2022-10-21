import { useCallback, useRef, useState } from 'react';
import produce from 'immer';
import '../styles/game-of-life.css';

const NEIGHBORS = [
    { X: -1, Y: -1 },
    { X: -1, Y: 0 },
    { X: -1, Y: 1 },
    { X: 0, Y: -1 },
    { X: 0, Y: 1 },
    { X: 1, Y: -1 },
    { X: 1, Y: 0 },
    { X: 1, Y: 1 },
]

const emptyGrid = (nRows: number, nCols: number) => {
    const newGrid: boolean[][] = new Array(nRows).fill(
        new Array(nCols).fill(false)
    )
    return newGrid;
}


const randomGrid = (nRows: number, nCols: number) => {
    const newGrid: boolean[][] = [...Array(nRows)].map(_ =>
        [...Array(nCols)].map(_ => Math.random() > 0.6)
    )
    return newGrid;
}

export const GameOfLife = () => {
    const nRows = 40;
    const nCols = 50;

    const [grid, setGrid] = useState(randomGrid(nRows, nCols));
    const [updateInterval, SetUpdateInterval] = useState(100);
    const [isRunning, setIsRunning] = useState(false);
    const runningRef = useRef(isRunning);
    runningRef.current = isRunning;

    const toggleState = (nRow: number, nCol: number) => {
        !isRunning && setGrid(
            produce(grid, gridCopy => {
                gridCopy[nRow][nCol] = !gridCopy[nRow][nCol];
            }))
    }


    const iterate = useCallback(() => {
        if (!runningRef.current)
            return

        setGrid(grid => produce(grid, gridCopy => {
            for (let r = 0; r < nRows; r++) {
                for (let c = 0; c < nCols; c++) {
                    const neighborsCount = NEIGHBORS.reduce((initialState, pos) => {
                        const delta = { X: r + pos.X, Y: c + pos.Y };
                        return (0 <= delta.X && delta.X < nRows
                            && 0 <= delta.Y && delta.Y < nCols
                            && grid[delta.X][delta.Y]) ?
                            initialState + 1 :
                            initialState
                    }, 0)
                    if (neighborsCount < 2 || neighborsCount > 3)
                        gridCopy[r][c] = false;
                    else if (!grid[r][c] && neighborsCount === 3)
                        gridCopy[r][c] = true;
                }

            }
        }))
        setTimeout(iterate, updateInterval);
    }, [updateInterval])

    return (
        <>
            <label htmlFor='updateInterval'> Interval(ms)</label>
            <input type="number" name="updateInterval" defaultValue={updateInterval} onChange={({ target }) => SetUpdateInterval(parseInt(target.value) | updateInterval)} />


            <div style={{
                justifyContent: "center",
                display: "grid",
                gridTemplateColumns: `repeat(${nCols}, 0fr)`
            }}>
                {grid.map((rows, r) =>
                    rows.map((val, c) =>
                        <div key={`${r}-${c}`}
                            onClick={() => toggleState(r, c)}
                            style={{
                                height: 15,
                                width: 15,
                                backgroundColor: val ? "#282c34" : "gray",
                                border: "solid 1px black",
                            }}
                        />
                    ))}
            </div>
            <section className='section'>
                <button
                    onClick={() => setGrid(emptyGrid(nRows, nCols))}
                    disabled={isRunning}> Clear</button>
                <button
                    onClick={() => setGrid(randomGrid(nRows, nCols))}
                    disabled={isRunning}>Random</button>
                <button
                    onClick={() => {
                        setIsRunning(!isRunning);
                        if (!isRunning) {
                            runningRef.current = true;
                            iterate();
                        }
                    }}
                    style={{
                        backgroundColor: isRunning ? "red" : "#04AA6D"
                    }}>
                    {isRunning ? "Stop" : "Start"}
                </button>
            </section>
        </>
    );
}
