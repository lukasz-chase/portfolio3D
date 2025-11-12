import Modal from "./ui/Modal";
import Experience from "./experience/Experience";
import ControlsOverlay from "./ui/ControlsOverlay";
import ThemeAudioButtons from "./ui/ThemeAudioButtons";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { KeyboardInput } from "./ui/KeyboardInput";

const root = ReactDOM.createRoot(document.querySelector("#root")!);

root.render(
  <>
    <Experience />
    <Modal />
    <ControlsOverlay />
    <ThemeAudioButtons />
    <KeyboardInput />
  </>
);
