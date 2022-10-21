import { Patterns } from "../constants/patterns";
import { MiniGame } from "./mini";
import "../styles/options.css";

export const Options = () => (
    <div className="options">
        <h2> Patterns </h2>
        <hr ></hr>
        {Patterns.map((props) => <MiniGame key={`mini-${props.name}`} {...props} />)}
    </div>
)