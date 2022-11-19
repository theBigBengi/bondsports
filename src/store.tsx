import { atom } from "recoil";
import { Player } from "./models";

export const favouritesState = atom({
  key: "favouritesState", // unique ID (with respect to other atoms/selectors)
  default: [] as Player[], // default value (aka initial value)
});

export const playersState = atom({
  key: "playersState",
  default: {
    players: [] as Player[],
    filteredPlayers: [] as Player[],
    searchTerm: "",
  },
});
