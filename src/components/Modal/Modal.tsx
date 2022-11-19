import { XCircleIcon } from "@heroicons/react/24/solid";
import { ReactNode } from "react";
import ReactDOM from "react-dom";
import { Player } from "../../models";

const modalRootEl = document.getElementById("modal-root")!;

interface ModalProps {
  children: ReactNode;
  onClose: (setShowModal: boolean) => void;
  player: Player;
}

export default function Modal({ player, onClose }: ModalProps) {
  return ReactDOM.createPortal(
    <div className='modal' onClick={() => onClose(false)}>
      <div
        className='modal__content'
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className='modal__close'>
          <button onClick={() => onClose(false)}>
            <XCircleIcon className='icon' />
          </button>
        </div>
        <div className='modal__content'>
          <h3>{player.last_name}</h3>
        </div>
        <div className='modal__actions'></div>
      </div>
    </div>,
    modalRootEl
  );
}

// interface modalProps {
//     onClose: (close:boolean) => void;
//   }

// export default function Modal({onClose}:modalProps) {
//   return (
//     <Modal onClose={onClose}>
//     <div className='modal__close'>
//       <button onClick={() => onClose(false)}>
//         <XCircleIcon className='icon' />
//       </button>
//     </div>
//     <div className='modal__content'>
//       <h3>{player.last_name}</h3>
//     </div>
//     <div className='modal__actions'></div>
//   </Modal>
//   )
// }
