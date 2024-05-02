import ReactDOM from "react-dom/client";
import App, { Position, PrevisionsDeTemperature } from "./App.tsx";
import "./index.css";

function GPSFixed(): Position {
  return {
    latitude: 52.52,
    longitude: 13.41,
    precision: 10,
  };
}

async function BulletinMeteoOpenMeteo(p: Position): Promise<PrevisionsDeTemperature> {
  const res = await fetch(
    `https://api.open-meteo.com/v1/meteofrance?latitude=${p.latitude}&longitude=${p.longitude}&hourly=temperature_2m&timezone=Europe%2FBerlin`,
  );
  const json = await res.json();

  return {
    temperatures: json.hourly.temperature_2m,
    unite: json.hourly_units.temperature_2m,
  };
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <App GPS={GPSFixed} BulletinMeteo={BulletinMeteoOpenMeteo} />,
);
