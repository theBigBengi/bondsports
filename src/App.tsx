import React, { useEffect, useState } from "react";
import "./App.css";
import { useRecoilState } from "recoil";
import FavouritesPlayersList from "./components/FavouritesPlayersList";
import PlayersList from "./components/PlayersList";
import { playersState } from "./store";
import AppBar from "./components/AppBar/AppBar";
import SearchForPlayer from "./components/SearchForPlayer/SearchForPlayer";

const URL = "https://www.balldontlie.io/api/v1/players";

const App: React.FC = () => {
  const [state, setPlayers] = useRecoilState(playersState);
  const { players } = state;
  const [errors, setErrors] = useState<Error>();

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) =>
        setPlayers({ ...state, players: data.data, filteredPlayers: data.data })
      )
      .catch((error: Error) => setErrors(error));
  }, []);

  // Errors
  if (errors) return <>{errors.message ?? "Somthing went wrong..."}</>;

  // Loading
  if (!players.length) return <>LOADING...</>;

  // Render
  return (
    <div className='root'>
      <AppBar />
      <main>
        <div style={{ padding: 20, display: "flex", flexGrow: 1 }}>
          <PlayersList />
          <FavouritesPlayersList />
        </div>
      </main>
    </div>
  );
};

export default App;
