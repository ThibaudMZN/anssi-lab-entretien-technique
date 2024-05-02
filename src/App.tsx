import { useEffect, useState } from "react";
import "./App.css";

export type Position = {
  latitude: number;
  longitude: number;
  precision: number;
};

function App({ GPS }: { GPS: () => Position }) {
  const [position, setPosition] = useState<Position | undefined>();
  const [temperatures, setTemperatures] = useState<number[]>([]);
  const [unite, setUnite] = useState<string>("");

  useEffect(() => {
    const position = GPS();
    setPosition(position);
  }, []);

  useEffect(() => {
    if (position) {
      // https://open-meteo.com/en/docs/meteofrance-api
      fetch(
        `https://api.open-meteo.com/v1/meteofrance?latitude=${position.latitude}&longitude=${position.longitude}&hourly=temperature_2m&timezone=Europe%2FBerlin`,
      )
        .then((res) => res.json())
        .then((json) => {
          setTemperatures(json.hourly.temperature_2m);
          setUnite(json.hourly_units.temperature_2m);
          console.log(json);
        });
    }
  }, [position]);

  return (
    <>
      <div>
        <h2>Emplacement</h2>
        {position && (
          <div className="card">
            Latitude : {position.latitude} <br />
            Longitude : {position.longitude} <br />
            Précision : {position.precision.toFixed()} mètres
          </div>
        )}
      </div>
      <div>
        <h2>Prévisions Météo</h2>
        <div>
          Températures :{" "}
          {temperatures.map((temperature, index) => (
            <div key={index}>
              {temperature} {unite}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
