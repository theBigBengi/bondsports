import { ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import { playersState } from "../../store";
import "./searchplayer.css";

export default function SearchForPlayer() {
  const [state, setPlayersState] = useRecoilState(playersState);
  const { players, searchTerm } = state;

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        onChange={onSearchChange}
        placeholder='Search'
        value={searchTerm}
      />
      {searchTerm !== "" && (
        <span
          className='search-player__clear-button'
          style={{ position: "absolute", right: 10, top: 18 }}
          onClick={() => setPlayersState({ ...state, searchTerm: "" })}
        >
          X
        </span>
      )}
    </div>
  );
}
