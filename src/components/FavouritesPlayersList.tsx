import { useRecoilState, useRecoilValue } from "recoil";
import { favouritesState } from "../store";
import PlayerItem from "./playerItem/PlayerItem";
// import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import { QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

const colors = ["rgba(255, 0, 119, 0.366)", "rgba(255,249,34)", "white"];

const FavouritesPlayersList = () => {
  const [color, setColor] = useState<string>("#FFF");
  const [favoritesPlayers, setFavoritesPlayers] =
    useRecoilState(favouritesState);

  const handleColorPick = (color: string) => {
    setColor(color);
  };

  const emptyList = (
    <div className='empty'>
      <h3>Your favorite players list is empty. Start adding players....</h3>
    </div>
  );

  const playersList = (
    <ul style={{ backgroundColor: color }}>
      {favoritesPlayers.map((player) => (
        <li key={`favorite-player-${player.id}`}>
          <PlayerItem player={player} />
        </li>
      ))}
    </ul>
  );

  return (
    <div className='container'>
      <div>
        {favoritesPlayers.length ? (
          <div className='list-bar'>
            <div>
              <button onClick={() => setFavoritesPlayers([])}>
                <XMarkIcon className='icon' />
              </button>
            </div>
            <div className='color-picker'>
              {colors.map((color) => (
                <button
                  onClick={(e) => handleColorPick(color)}
                  style={{
                    backgroundColor: color,
                  }}
                />
              ))}

              <button
                onClick={(e) =>
                  handleColorPick(
                    `#${Math.floor(Math.random() * 16777215).toString(16)}`
                  )
                }
                style={{
                  backgroundColor: color,
                }}
              >
                <QuestionMarkCircleIcon />
              </button>
            </div>
          </div>
        ) : null}

        <>{favoritesPlayers.length ? playersList : emptyList}</>
      </div>
    </div>
  );
};

export default FavouritesPlayersList;
