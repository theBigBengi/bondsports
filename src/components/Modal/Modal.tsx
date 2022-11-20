import { ReactNode } from "react";
import ReactDOM from "react-dom";
import "./modal.css";

const modalRootEl = document.getElementById("modal-root")!;

interface ModalProps {
  children: ReactNode;
  title?: string;
  onClose: (setShowModal: boolean) => void;
}

const Modal = ({ children, onClose, title }: ModalProps) => {
  return ReactDOM.createPortal(
    <div className='modal-layer' onClick={() => onClose(false)}>
      <div
        className='modal'
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className='modal-content'>{children}</div>
      </div>
    </div>,
    modalRootEl
  );
};

export default Modal;
