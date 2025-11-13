import Car from "../components/Car";
import GoodBuilding from "../components/GoodBuilding";
import KoffeecupBuilding from "../components/KoffeecupBuilding";
import LukaszvilePoster from "../components/LukaszvilePoster";
import TruegrindPoster from "../components/TruegrindPoster";
import GithubText from "../components/GithubText";
import EmailText from "../components/EmailText";
import CvText from "../components/CvText";
import LinkedinText from "../components/LinkedinText";
import Bench from "../components/Bench";
import Lukaszvile from "../components/Lukaszvile";
import HangmanPoster from "../components/HangmanPoster";
import MupBuilding from "../components/MupBuilding";

export const Interactables: React.FC = () => {
  return (
    <>
      <group>
        <GoodBuilding />
        <KoffeecupBuilding />
        <MupBuilding />
      </group>
      <group>
        <HangmanPoster />
        <LukaszvilePoster />
        <TruegrindPoster />
      </group>
      <group>
        <GithubText />
        <EmailText />
        <CvText />
        <LinkedinText />
      </group>
      <Car />
      <Bench />
      <Lukaszvile />
    </>
  );
};
