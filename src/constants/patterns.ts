import { IPattern } from "../types/pattern";

export const Patterns: IPattern[] = [
    {
        name: "Block",
        grid: [
            [false, false, false, false, false, false,],
            [false, false, true, true, false, false],
            [false, false, true, true, false, false],
            [false, false, false, false, false, false],

        ]
    }, {
        name: "Tub",
        grid: [
            [false, false, false, false, false, false],
            [false, false, false, true, false, false],
            [false, false, true, false, true, false],
            [false, false, false, true, false, false],
            [false, false, false, false, false, false],

        ],
    }, {

        name: "Beehive",
        grid: [
            [false, false, false, false, false, false],
            [false, false, true, true, false, false],
            [false, true, false, false, true, false],
            [false, false, true, true, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
        ]
    }, {
        name: "Blinker",
        grid: [
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, true, true, true, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
        ]
    }
]