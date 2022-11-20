import { useState } from "react";
import { Player } from "../../models";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Favorites } from "../Favorites/Favorites";
import { useRecoilState } from "recoil";
import { favouritesState } from "../../store";
import Modal from "../Modal/Modal";
import "./player.css";

interface SinglePlayerProps {
  player: Player;
}

const PlayerItem = ({ player }: SinglePlayerProps) => {
  const { first_name, last_name, team } = player;
  const {
    full_name: teamFullName,
    abbreviation,
    division,
    conference,
    city,
    name: teamName,
  } = team;

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
          <div>
            <p>{`${first_name} ${last_name}`}</p>
          </div>
          <p>{abbreviation}</p>
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
              className='icon info'
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
                <Favorites
                  handleClick={handleFavoritesClick}
                  isFavorite={isFavorite}
                />
                <h3>{`${first_name} ${last_name}`}</h3>
              </div>
              <div className='player-team'>
                <h4>{teamFullName}</h4>
                <div>
                  <h5>city</h5>
                  <p>{city}</p>
                </div>
                <div>
                  <h5>Division</h5>
                  <p>{division}</p>
                </div>
                <div>
                  <h5>Conference</h5>
                  <p>{conference}</p>
                </div>
              </div>
              <div className='modal-actions'>
                <button onClick={() => setShowModal(false)}>OK</button>
              </div>
            </div>
          </Modal>
        )
      }
    </>
  );
};

export default PlayerItem;
