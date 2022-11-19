import { useState } from "react";
import { Player } from "../../models";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Favorites } from "../Favorites";
import { useRecoilState } from "recoil";
import { favouritesState } from "../../store";
import Modal from "../Modal";
import { XCircleIcon } from "@heroicons/react/24/solid";
import "./style.css";

interface SinglePlayerProps {
  player: Player;
}

const PlayerItem = ({ player }: SinglePlayerProps) => {
  const { first_name, last_name, team } = player;
  const { full_name: teamName } = team;

  console.log(player);

  const [favoritesPlayers, setFavoritesPlayers] =
    useRecoilState(favouritesState);

  const [showModal, setShowModal] = useState<boolean>();

  // Player is favorite ?
  const isFavorite =
    favoritesPlayers.findIndex(
      (favoritePlayer) => favoritePlayer.id === player.id
    ) > -1;

  // Add this player to the favorites list
  const addPlayerToFavorites = (player: Player) => {
    const newFavoritesPlayers = [...favoritesPlayers, player];
    setFavoritesPlayers(newFavoritesPlayers);
  };

  // Remove this player from the favorites list
  const removelayerFromFavorites = (playerid: number) => {
    setFavoritesPlayers(
      favoritesPlayers.filter(
        (favoritePlayer) => favoritePlayer.id !== playerid
      )
    );
  };

  const handleFavoritesClick = () => {
    isFavorite
      ? removelayerFromFavorites(player.id)
      : addPlayerToFavorites(player);
  };

  return (
    <>
      <div className='player'>
        <div className='player--info'>
          <p>{`${first_name} ${last_name}`}</p>
          <p>{teamName}</p>
        </div>
        <div className='player--actions'>
          <div>
            <Favorites
              handleClick={handleFavoritesClick}
              isFavorite={isFavorite}
            />
          </div>
          <div>
            <InformationCircleIcon
              onClick={() => setShowModal(true)}
              className='icon'
            />
          </div>
        </div>
      </div>

      {
        // PLAYER MODAL
        showModal && (
          <Modal onClose={setShowModal}>
            <div className='player-modal'>
              <div className='banner'>
                <h3>{`${first_name} ${last_name}`}</h3>
              </div>
              <div className='player-team'>
                <h4>{teamName}</h4>
              </div>
              <div className='modal__actions'>
                <button>Add to favorites</button>
              </div>
            </div>
          </Modal>
        )
      }
    </>
  );
};

export default PlayerItem;
