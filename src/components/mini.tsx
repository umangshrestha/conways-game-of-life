import { useCallback, useRef, useState } from "react"
import { NEIGHBORS } from "../constants/neighbors";
import produce from 'immer';
import { INeighbors } from "../types/neighbors";
import { IPattern } from "../types/pattern";

export const MiniGame = ({ name, grid: g }: IPattern) => {
    const [grid, setGrid] = useState(g);

    const [isDragged, setIsDragged] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const runningRef = useRef(isRunning);
    runningRef.current = isRunning;
    const nRows = grid.length;
    const nCols = grid[0].length;
   

    const iterate = useCallback(() => {
        if (!runningRef.current)
            return
        setGrid(grid => produce(grid, gridCopy => {
            for (let r = 0; r < nRows; r++) {
                for (let c = 0; c < nCols; c++) {
                    const neighborsCount = NEIGHBORS.reduce((initialState, pos) => {
                        const delta: INeighbors = { X: r + pos.X, Y: c + pos.Y };
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
        setTimeout(iterate, 200);
    }, [])

    return (
        <div className="child">
            <h2 className="tag">{name}</h2>
            <div key={name}
                style={{
                    justifyContent: "center",
                    display: "grid",
                    gridTemplateColumns: `repeat(${nCols}, 0fr)`,
                    backgroundColor: "transparent",
                    transition: isDragged ? `0.01 ms` : undefined,
                    transform: isDragged ? `translateX(-9999px)` : undefined,
                }}
                draggable={true}

                onMouseOver={() => {
                    setIsRunning(true);
                    runningRef.current = true;
                    iterate();
                }}
                onMouseOut={()=> {
                    setIsRunning(false);
                    runningRef.current = false;
                }}
            >
                {
                    grid.map((rows, r) =>
                        rows.map((val, c) =>
                            <div key={`${name}-${r}-${c}`}
                                style={{
                                    height: 15,
                                    width: 15,
                                    backgroundColor: val ? "#282c34" : "gray",
                                    border: "solid 1px black",
                                }}
                            />
                        ))
                }
            </div >
        </div>)

}
