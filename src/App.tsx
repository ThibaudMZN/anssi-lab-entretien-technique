import { useEffect, useState } from "react";
import "./App.css";

export type Position = {
  latitude: number;
  longitude: number;
  precision: number;
};

export type PrevisionsDeTemperature = {
  temperatures: number[];
  unite: string;
};

function App({
  GPS,
  BulletinMeteo,
}: {
  GPS: () => Position;
  BulletinMeteo: (p: Position) => Promise<PrevisionsDeTemperature>;
}) {
  const [position, setPosition] = useState<Position | undefined>();
  const [temperatures, setTemperatures] = useState<number[]>([]);
  const [unite, setUnite] = useState<string>("");

  useEffect(() => {
    const position = GPS();
    setPosition(position);
  }, [GPS]);

  useEffect(() => {
    if (position) {
      BulletinMeteo(position).then((prevision) => {
        setTemperatures(prevision.temperatures);
        setUnite(prevision.unite);
      });
    }
  }, [BulletinMeteo, position]);

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
