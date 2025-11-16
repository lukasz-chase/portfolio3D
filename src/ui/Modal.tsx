import React from "react";
import { useModalStore } from "../store/useModalStore";
import { MODAL_CONTENT } from "../constants";

const Modal: React.FC = () => {
  const activeId = useModalStore((s) => s.activeId);
  const closeModal = useModalStore((s) => s.closeModal);

  if (!activeId) return null;
  const content = MODAL_CONTENT[activeId];

  const renderBody = () => {
    switch (content.kind) {
      case "project":
        return (
          <>
            <p className="modal-project-description">{content.content}</p>

            {content.techStack && (
              <div className="modal-section">
                <span className="modal-section-label">Tech</span>
                <ul className="modal-project-tech-stack">
                  {content.techStack.map((tech) => (
                    <li key={tech} className="modal-pill">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="modal-actions-row">
              {content.github && (
                <a
                  className="modal-project-visit-button"
                  href={content.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              )}
              {content.website && (
                <a
                  className="modal-project-visit-button"
                  href={content.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live
                </a>
              )}
            </div>
          </>
        );

      case "experience":
      case "education":
        return (
          <div className="modal-exp-card">
            <h3 className="modal-exp-company">{content.company}</h3>
            <p className="modal-exp-period">{content.period}</p>
            <p className="modal-exp-role">{content.role}</p>
          </div>
        );

      case "about":
      default:
        return (
          <p className="modal-project-description modal-about-text">
            {content.content}
          </p>
        );
    }
  };

  return (
    <>
      <div className="modal-bg-overlay" onClick={closeModal} />
      <div className="modal">
        <div className="modal-wrapper">
          <div className="modal-header">
            <h2 className="modal-title">{content.title}</h2>
            <button className="modal-exit-button" onClick={closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 5h2v2H5V5zm4 4H7V7h2v2zm2 2H9V9h2v2zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2zm2-2v2h-2V9h2zm2-2v2h-2V7h2zm0 0V5h2v2h-2z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <div className="modal-content-wrapper">{renderBody()}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
