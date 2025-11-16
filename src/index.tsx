import Experience from "./experience/Experience";
import ReactDOM from "react-dom/client";
import "../src/styles.css";
import ControlsOverlay from "./ui/ControlsOverlay/ControlsOverlay";
import ThemeAudioButtons from "./ui/ThemeAudioButtons/ThemeAudioButtons";
import Modal from "./ui/Modal/Modal";

const root = ReactDOM.createRoot(document.querySelector("#root")!);

root.render(
  <>
    <Experience />
    <Modal />
    <ControlsOverlay />
    <ThemeAudioButtons />
  </>
);
