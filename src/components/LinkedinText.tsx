import InteractiveModel from "./InteractiveModel";

const path = "/models/LinkedinText.glb";

const LinkedinText: React.FC = () => {
  return (
    <InteractiveModel
      path={path}
      onClick={() =>
        window.open(
          "https://www.linkedin.com/in/lukasz-scigaj/",
          "_blank",
          "noopener,noreferrer"
        )
      }
    />
  );
};

export default LinkedinText;
