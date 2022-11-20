import React, { useEffect, useState } from "react";
import "./App.css";
import { useRecoilState } from "recoil";
import FavouritesPlayersList from "./components/FavouritesPlayersList";
import PlayersList from "./components/PlayersList";
import { playersState } from "./store";
import AppBar from "./components/AppBar/AppBar";
import BarLoader from "react-spinners/BarLoader";
import { isMobile } from "react-device-detect";
import useViewport from "./hooks/useViewport";

const URL = "https://www.balldontlie.io/api/v1/players";

const App: React.FC = () => {
  const [displayFavorites, setDisplayFavorites] = useState<boolean>(false);
  const [state, setPlayers] = useRecoilState(playersState);
  const [errors, setErrors] = useState<Error>();
  const { width, height } = useViewport();
  const { players } = state;

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) =>
        setPlayers({ ...state, players: data.data, filteredPlayers: data.data })
      )
      .catch((error: Error) => setErrors(error));
  }, []);

  // On error
  if (errors) return <>{errors.message ?? "Somthing went wrong..."}</>;

  // On loading
  if (!players.length)
    return (
      <div className='spinner'>
        <BarLoader color='#ff0080' />
      </div>
    );

  // Render
  return (
    <div className='app-root' style={{ width, height }}>
      <AppBar />
      <main>
        <div>
          {(!isMobile || (isMobile && !displayFavorites)) && <PlayersList />}
          {(!isMobile || (isMobile && displayFavorites)) && (
            <FavouritesPlayersList />
          )}
        </div>

        {isMobile && (
          <div>
            <button onClick={() => setDisplayFavorites(!displayFavorites)}>
              {!displayFavorites ? "Favorites" : "Players"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
