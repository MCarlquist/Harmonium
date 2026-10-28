import { createFileRoute, Link } from "@tanstack/react-router";
import { albumById } from "../../Hooks/useJamendo";
import { PlayerContext } from "../../context/PlayerContext";
import { useContext } from "react";
import { formatDuration } from "../../utils/formatDuration";

export const Route = createFileRoute("/Search/album/$album")({
  /** Retains a string `artist` search value for back navigation; otherwise uses undefined. */
  validateSearch: (search: Record<string, unknown>) => ({
    artist: typeof search.artist === "string" ? search.artist : undefined,
    q: typeof search.q === "string" ? search.q : "",
  }),
  /**
   * Loads the first album result for the `album` route parameter.
   * @throws An Error with message "Album not found" for empty results.
   * Lookup failures propagate unchanged.
   */
  loader: async ({ params }) => {
    const { album } = params;
    const albumResponse = await albumById(album);
    const albumResult = albumResponse[0];

    if (!albumResult) {
      throw new Error("Album not found");
    }

    return albumResult;
  },
  component: RouteComponent,
});

/** Renders album details with a back link to the supplied artist or the search page. */
function RouteComponent() {
  const albumResponse = Route.useLoaderData();

  const pla = useContext(PlayerContext);

  const { artist, q } = Route.useSearch();

  return (
    <div>
      <div className="m-6">
        {artist ? (
          <Link
            className="btn"
            to="/Search/artist/$result"
            params={{ result: artist }}
            search={{ q }}
          >
            Back
          </Link>
        ) : (
          <Link className="btn" to="/Search" search={{ q }}>
            Back to search
          </Link>
        )}
      </div>
      <div className="flex flex-col items-center">
        <img src={albumResponse.image} alt="" />
        <h1 className="text-3xl"> {albumResponse.name}</h1>
        <h3>{albumResponse.artist_name}</h3>
        <p>{albumResponse.releasedate}</p>
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>title</th>
              <th>duration</th>
            </tr>
          </thead>
          <tbody>
            {albumResponse.tracks.map((track, index) => (
              <tr key={`track-${index}`}>
                <td>{track.position}</td>
                <button className="" type="button" onClick={() => track.audio && pla?.setSong(track.audio)}>
                  <td>{track.name}</td>
                </button>
                <td>{formatDuration(track.duration)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
