import ReactDOM from "react-dom/client";
import App, { Position } from "./App.tsx";
import "./index.css";

function GPSFixed () : Position {

	return {
		latitude : 52.52,
		longitude:  13.41,
		precision: 10
	}
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App GPS={GPSFixed} />);
