import InteractiveModel from "./InteractiveModel";

const path = "/models/CvText.glb";

const CvText: React.FC = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/CV.pdf"; // Assuming CV.pdf is in your /public directory
    link.download = "Lukasz_Scigaj_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return <InteractiveModel path={path} onClick={handleDownload} />;
};

export default CvText;
