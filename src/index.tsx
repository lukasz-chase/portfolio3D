import Experience from "./experience/Experience";
import ReactDOM from "react-dom/client";
import "../src/styles.css";
import ControlsOverlay from "./ui/ControlsOverlay/ControlsOverlay";
import Modal from "./ui/Modal/Modal";
import Settings from "./ui/ThemeAudioButtons/Settings";

const root = ReactDOM.createRoot(document.querySelector("#root")!);

root.render(
  <>
    <Experience />
    <Modal />
    <ControlsOverlay />
    <Settings />
  </>
);
