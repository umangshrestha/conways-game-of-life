import { Patterns } from "../constants/patterns";
import { MiniGame } from "./mini";
import "../styles/options.css";

export const Options = () => (
    <div className="options">
        <h1>Options</h1>
        {Patterns.map((props) => <MiniGame key={`mini-${props.name}`} {...props} />)}
    </div>
)