import styleModule from "./Modals.module.sass";
import PropTypes from "prop-types";
import { Button } from "../Buttons";
import useUnmountComponent from "../../hooks/useUnmountComponent";
import { useRef } from "react";

const ModalLoad = () => {
  return (
    <div className={styleModule.backgroundModal}>
      <div className={styleModule.containerLogo}>
        <span className={styleModule.bar1}></span>
        <span className={styleModule.bar2}></span>
        <span className={styleModule.bar3}></span>
      </div>
    </div>
  );
};

const ModalConfirmationFooter = props => {
  const { unmount, message, onConfirm } = props;

  const handleConfirm = () => {
    onConfirm && onConfirm();
    unmount();
  };
  return (
    <footer className={styleModule.modalConfirmationFooter}>
      <p className={styleModule.message}>{message}</p>
      <section className={styleModule.btnsSections}>
        <Button
          className={styleModule.btnModalConfirm}
          type={"primary-invert"}
          onClick={unmount}
        >
          Cancelar
        </Button>
        <Button
          className={styleModule.btnModalConfirm}
          type={"primary"}
          onClick={handleConfirm}
        >
          Continuar
        </Button>
      </section>
    </footer>
  );
};

ModalConfirmationFooter.propTypes = {
  unmount: PropTypes.func,
  onConfirm: PropTypes.func,
  message: PropTypes.string.isRequired
};

const ModalError = props => {
  const { messages, unmount } = props;
  const wrapperRef = useRef(null);
  useUnmountComponent(wrapperRef, unmount);
  return (
    <div className={styleModule.backgroundModal}>
      <div className={styleModule.containerError} ref={wrapperRef}>
        <h2 className={styleModule.title}>Ups, tuvimos algunos problemas</h2>
        <section className={styleModule.content}>
          <ul className={styleModule.messagesList}>
            {messages.map((message, index) => (
              <li key={index} className={styleModule.message}>
                {message}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

ModalError.propTypes = {
  unmount: PropTypes.func,
  messages: PropTypes.array
};

export { ModalLoad, ModalConfirmationFooter, ModalError };
