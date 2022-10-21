import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import "../styles/footer.css";

const GITHUB_URL = "https://github.com/umangshrestha/conways-game-of-life";
const DATE_TIME = new Date().getFullYear();
const AUTHOR = "Umang Shrestha";

export const Footer = () => (<footer className="footer">
    <p>&copy; {DATE_TIME},
        <em>{AUTHOR}</em>
        <a className="link" href={GITHUB_URL} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faGithub} />
        </a>
    </p>
</footer>)