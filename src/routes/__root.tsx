import {
  createRootRoute,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { useContext } from "react";
import Player from "../Components/Player/Player";
import { PlayerContext } from "../context/PlayerContext";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const player = useContext(PlayerContext);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <nav className="flex gap-4 border-b border-zinc-800 p-4">
        <Link to="/" className="[&.active]:text-green-400">
          Library
        </Link>
        <Link to="/Search" className="[&.active]:text-green-400">
          Search
        </Link>
        <Link
          to="/Profile"
          className="ml-auto [&.active]:text-green-400"
        >
          Profile
        </Link>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>

      {player?.song && (
        <div className="sticky bottom-0 w-full">
          <Player url={player.song} />
        </div>
      )}
    </div>
  );
}
