import { useRecoilValue } from "recoil";
import { favouritesState } from "../store";
import PlayerItem from "./playerItem/PlayerItem";
import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

const colors = ["red", "blue", "green", "white"];

const FavouritesPlayersList = () => {
  const [color, setColor] = useState<string>("#aabbcc");
  const favoritesPlayers = useRecoilValue(favouritesState);

  const handleColorPick = (color: string) => {
    setColor(color);
  };

  const emptyList = <h3>Add players to favoriets...</h3>;

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
        <div className='list-bar'>
          {colors.map((color) => (
            <div
              onClick={(e) => handleColorPick(color)}
              style={{ backgroundColor: color }}
              className='button'
            />
          ))}

          <QuestionMarkCircleIcon
            onClick={(e) =>
              handleColorPick(
                `#${Math.floor(Math.random() * 16777215).toString(16)}`
              )
            }
            style={{ width: 35 }}
          />
        </div>

        <>{favoritesPlayers.length ? playersList : emptyList}</>
      </div>
    </div>
  );
};

export default FavouritesPlayersList;
