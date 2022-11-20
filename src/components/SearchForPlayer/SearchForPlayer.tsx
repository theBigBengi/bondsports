import { ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import { playersState } from "../../store";
import { XCircleIcon } from "@heroicons/react/24/solid";
import "./searchplayer.css";

export default function SearchForPlayer() {
  const [state, setPlayersState] = useRecoilState(playersState);
  const { players, searchTerm } = state;

  const onSearchChange = (event?: ChangeEvent<HTMLInputElement>) => {
    // if there is no event clear the search field
    if (!event)
      return setPlayersState({
        ...state,
        filteredPlayers: players,
        searchTerm: "",
      });

    const value = event.target.value.toLowerCase();

    const filteredPlayers = players.filter((player) => {
      const { first_name, last_name } = player;
      let str = `${first_name} ${last_name}`.toLowerCase();
      return str.indexOf(value) >= 0;
    });

    //
    setPlayersState({
      ...state,
      filteredPlayers,
      searchTerm: value,
    });
  };

  return (
    <div className='search-player'>
      <input
        placeholder='Search for player...'
        onChange={onSearchChange}
        value={searchTerm}
      />
      {searchTerm !== "" && <XCircleIcon onClick={() => onSearchChange()} />}
    </div>
  );
}
