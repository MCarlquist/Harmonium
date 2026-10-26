import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type PlayerContextValue = {
  song: string;
  setSong: Dispatch<SetStateAction<string>>;
};

type PlayerProviderProps = {
  children: ReactNode;
};

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

const PlayerProvider = ({ children }: PlayerProviderProps) => {
  const [song, setSong] = useState("");

  return (
    <PlayerContext.Provider value={{ song, setSong }}>
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerProvider, PlayerContext };
