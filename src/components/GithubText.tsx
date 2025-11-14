import InteractiveModel from "./InteractiveModel";

const path = "/models/GithubText.glb";

const GithubText: React.FC = () => {
  return (
    <InteractiveModel
      path={path}
      onClick={() =>
        window.open(
          "https://github.com/lukasz-chase",
          "_blank",
          "noopener,noreferrer"
        )
      }
    />
  );
};

export default GithubText;
