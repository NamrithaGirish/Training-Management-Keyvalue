interface ModalProps {
    isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen }) => {
    return (isOpen && <div></div>);
};

export default Modal;
