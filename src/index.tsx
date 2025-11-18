import Experience from "./experience/Experience";
import ReactDOM from "react-dom/client";
import "../src/styles.css";
import ControlsOverlay from "./ui/ControlsOverlay/ControlsOverlay";
import Modal from "./ui/Modal/Modal";
import Settings from "./ui/Settings/Settings";
import LoadingScreen from "./ui/LoadingScreen/LoadingScreen";
import Minimap from "./ui/Minimap/Minimap";

const root = ReactDOM.createRoot(document.querySelector("#root")!);

root.render(
  <>
    <Experience />
    <Modal />
    <ControlsOverlay />
    <Settings />
    <LoadingScreen />
    <Minimap />
  </>
);
