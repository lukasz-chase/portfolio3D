import React from "react";
import { useModalStore } from "../store/useModalStore";
import { MODAL_CONTENT } from "../constants";

const Modal: React.FC = () => {
  const activeId = useModalStore((s) => s.activeId);
  const closeModal = useModalStore((s) => s.closeModal);

  if (!activeId) return null;
  const content = MODAL_CONTENT[activeId];

  return (
    <>
      <div className="modal-bg-overlay" onClick={closeModal} />
      <div className="modal">
        <div className="modal-wrapper">
          <div className="modal-header">
            <h2 className="modal-title">{content.title}</h2>
            <button className="modal-exit-button" onClick={closeModal}>
              ✕
            </button>
          </div>

          <div className="modal-content-wrapper">
            <p className="modal-project-description">{content.content}</p>

            {content.link && (
              <a
                className="modal-project-visit-button"
                href={content.link}
                target="_blank"
                rel="noreferrer"
              >
                Visit project
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
