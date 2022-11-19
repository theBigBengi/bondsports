import { ReactNode } from "react";
import ReactDOM from "react-dom";

const modalRootEl = document.getElementById("modal-root")!;

interface ModalProps {
  children: ReactNode;
  onClose: (setShowModal: boolean) => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  return ReactDOM.createPortal(
    <div className='modal' onClick={() => onClose(false)}>
      <div
        className='modal__content'
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>,
    modalRootEl
  );
};

export default Modal;
