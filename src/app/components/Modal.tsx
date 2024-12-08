import React, { ReactNode } from 'react';
import Overlay from './Overlay';

interface ModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  children: ReactNode;
  width?: string;
}

const Modal: React.FC<ModalProps> = ({ openModal, setOpenModal, children, width }) => {
  return (
    <Overlay darkened={true} openOverlay={openModal} setOpenOverlay={setOpenModal}>
      <div
        className={`absolute top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4 gap-8 ${
          width ? `w-[${width}]` : 'w-1/3 min-w-[33.9rem] max-[767px]:w-[80%] max-[767px]:min-w-[90%]'
        } rounded-2xl bg-[#1D2832] text-white  py-10 px-8 shadow-dialogShadow max-h-[85vh] overflow-auto scrollbar-hide`}
      >
        {children}
      </div>
    </Overlay>
  );
};

export default Modal;
