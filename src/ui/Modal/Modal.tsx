import React from "react";
import { MODAL_CONTENT } from "../../constants";
import styles from "./Modal.module.css";
import { useModalStore } from "../../store/useModalStore";

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
            <p className={styles.description}>{content.content}</p>

            {content.techStack && (
              <section>
                <span className={styles.sectionLabel}>Tech</span>
                <ul className={styles.techStack}>
                  {content.techStack.map((tech) => (
                    <li key={tech} className={styles.pill}>
                      {tech}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className={styles.actionsRow}>
              {content.github && (
                <a
                  className={styles.primaryButton}
                  href={content.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              )}
              {content.website && (
                <a
                  className={styles.primaryButton}
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
          <div className={styles.expCard}>
            <h3 className={styles.expCompany}>{content.company}</h3>
            <p className={styles.expPeriod}>{content.period}</p>
            <p className={styles.expRole}>{content.role}</p>
          </div>
        );

      case "about":
      default:
        return (
          <p className={`${styles.description} ${styles.aboutText}`}>
            {content.content}
          </p>
        );
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={closeModal} />
      <div className={styles.modal}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h2 className={styles.title}>{content.title}</h2>
            <button className={styles.exitButton} onClick={closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
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
          <div className={styles.content}>{renderBody()}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
