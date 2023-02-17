import { useRef, useEffect, MutableRefObject, ReactNode } from "react";
import styles from "./Modal.module.scss";

interface Option {
  label: string | number | JSX.Element;
  value: string | number;
}

export interface ModalProps {
  children?: string | ReactNode;
  visible: boolean;
  cancel?: (payload?: Option) => void;
  isConfirm?: boolean;
  className?: string;
}
const Modal = (props: ModalProps) => {
  const { children, visible, cancel = () => {}, isConfirm, className } = props;
  const modalRef = useRef<Element | null>(null);
  const visibleRef = useRef(visible);

  visibleRef.current = visible;

  const handleClose = (e: MouseEvent) => {
    const modalBody = modalRef.current as Element;
    if (!modalBody || !modalBody.contains(e.target as Node)) {
      if (visibleRef.current) cancel();
    }
  };

  const handleEscape = (e: KeyboardEvent) => {
    if (visibleRef.current && e.key === "Escape") {
      cancel();
    }
  };

  useEffect(() => {
    if (!isConfirm) {
      window.addEventListener("mousedown", handleClose);
      window.addEventListener("keydown", handleEscape);
      return () => {
        window.removeEventListener("mousedown", handleClose);
        window.removeEventListener("keydown", handleEscape);
      };
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={[
        styles.backdrop,
        visible && styles.active,
        isConfirm && styles["confirm-backdrop"],
      ].join(" ")}
    >
      <div
        ref={modalRef as MutableRefObject<HTMLDivElement>}
        className={[
          styles["modal-wrapper"],
          visible && styles.active,
          isConfirm && styles.confirm,
          className,
        ].join(" ")}
      >
        {children}
        <div onClick={() => cancel()} className={styles["close-icon"]}>
          <div className={styles.bar} />
          <div className={styles.bar} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
