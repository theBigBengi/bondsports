import { useRecoilValue } from "recoil";
import { playersState } from "../store";
import PlayerItem from "./playerItem/PlayerItem";
import SearchForPlayer from "./SearchForPlayer/SearchForPlayer";
import React from "react";

const PlayersList: React.FC = () => {
  const { filteredPlayers, searchTerm } = useRecoilValue(playersState);

  // When there is no match in the search terms
  const noResults = (
    <h3
      style={{ padding: "50px 0", wordBreak: "break-all", maxWidth: 200 }}
    >{`No match for ${searchTerm}`}</h3>
  );

  // players list...
  const playersList = (
    <ul>
      {filteredPlayers.map((player) => (
        <li key={`player-${player.id}`}>
          <PlayerItem player={player} />
        </li>
      ))}
    </ul>
  );

  return (
    <div className='container'>
      <div className='e'>
        {/* <SearchPlayerInput /> */}
        <SearchForPlayer />
        <>{filteredPlayers.length ? playersList : noResults}</>
      </div>
    </div>
  );
};

export default PlayersList;
