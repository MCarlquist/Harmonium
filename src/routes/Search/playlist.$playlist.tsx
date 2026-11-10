import { createFileRoute, Link } from "@tanstack/react-router";
import { playlistById } from "../../Hooks/useJamendo";
import { PlayerContext } from "../../context/PlayerContext";
import { useContext } from "react";
import { formatDuration } from "../../utils/formatDuration";

export const Route = createFileRoute("/Search/playlist/$playlist")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  loader: async ({ params }) => {
    const { playlist } = params;
    const playlistResponse = await playlistById(playlist);
    console.log(playlistResponse);
    const playlistResult = playlistResponse[0];

    return playlistResult ?? null;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const pla = useContext(PlayerContext);

  const { q } = Route.useSearch();
  const playlistResponse = Route.useLoaderData();

  return (
    <section>
      <div className="m-6">
        <Link className="btn" to="/Search" search={{ q }}>
          Back
        </Link>
      </div>

      {!playlistResponse ? (
        <article>
          <h1 className="text-center">No tracks found in playlist.</h1>
        </article>
      ) : (
        <>
      <article className="flex flex-col items-center">
        <h1 className="text-3xl">{playlistResponse.name}</h1>
        <p>{playlistResponse.creationdate}</p>
      </article>
      <article className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>title</th>
              <th>duration</th>
            </tr>
          </thead>
          <tbody>
            {playlistResponse.tracks.map((track, index) => (
              <tr key={`track-${index}`}>
                <td>{index + 1}</td>
                <button
                  className=""
                  type="button"
                  onClick={() => track.audio && pla?.setSong(track.audio)}
                >
                  <td>
                    {track.name} - {track.artist_name}{" "}
                  </td>
                </button>
                <td>{formatDuration(track.duration)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
        </>
      )}
    </section>
  );
}
