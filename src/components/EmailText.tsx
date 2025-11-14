import InteractiveModel from "./InteractiveModel";

const EmailText: React.FC = () => {
  return (
    <InteractiveModel
      path="/models/EmailText.glb"
      onClick={() =>
        (window.location.href = "mailto:lukasz.scigaj00@gmail.com")
      }
    />
  );
};

export default EmailText;
