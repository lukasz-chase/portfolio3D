import Experience from "./experience/Experience";
import ReactDOM from "react-dom/client";
import "../src/styles.css";
import ControlsOverlay from "./ui/ControlsOverlay/ControlsOverlay";
import Modal from "./ui/Modal/Modal";
import Settings from "./ui/Settings/Settings";
import LoadingScreen from "./ui/LoadingScreen/LoadingScreen";
import Minimap from "./ui/Minimap/Minimap";
import { PostHogProvider } from "posthog-js/react";

const root = ReactDOM.createRoot(document.querySelector("#root")!);

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: "2025-11-30",
} as const;

const app = (
  <>
    <Experience />
    <Modal />
    <ControlsOverlay />
    <Settings />
    <LoadingScreen />
    <Minimap />
  </>
);

root.render(
  <PostHogProvider
    apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
    options={options}
  >
    {app}
  </PostHogProvider>
);
