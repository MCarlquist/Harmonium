import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import styles from "./player.module.css";

type PlayerProps = {
  url: string;
};

const Player = ({ url }: PlayerProps) => {
  return (
    <div className={styles.player}>
      <AudioPlayer autoPlay src={url} />
    </div>
  );
};

export default Player;
