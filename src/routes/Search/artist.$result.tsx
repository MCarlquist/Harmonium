import { createFileRoute, Link } from "@tanstack/react-router";
import { artistsById } from "../../Hooks/useJamendo";
import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";

export const Route = createFileRoute("/Search/artist/$result")({
  loader: async ({ params }) => {
    const { result } = params;
    const [musicInfoResults, tracksResults, albumResults] = await Promise.all([
      artistsById("musicinfo", result),
      artistsById("tracks", result),
      artistsById("albums", result),
    ]);

    const musicInfo = musicInfoResults[0];
    const tracks = tracksResults[0]?.tracks ?? [];
    const albums = albumResults[0]?.albums ?? [];
    if (!musicInfo) {
      throw new Error("Artist not found");
    }

    return {
      musicInfo,
      tracks,
      albums,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { musicInfo, tracks, albums } = Route.useLoaderData();
  const descriptions = musicInfo.musicinfo?.description;
  const tags = musicInfo.musicinfo?.tags?.map((tag) => (
    <div key={tag} className="badge badge-primary">
      {tag}
    </div>
  ));
  const description =
    descriptions?.en?.trim() ||
    Object.values(descriptions ?? {}).find((text) => text.trim().length > 0) ||
    "No artist description is available.";
  const pla = useContext(PlayerContext);

  return (
    <section className="flex flex-row">
      <div className="m-6">
        <button className="btn">
          <Link to="/Search">Back</Link>
        </button>
      </div>

      <article>
        <div className="card w-96">
          <figure>
            <img src={musicInfo.image} alt={musicInfo.name} />
          </figure>
          <div className="card-body">
            <h1 className="card-title">{musicInfo.name}</h1>
            <p dangerouslySetInnerHTML={{ __html: description }}></p>
            <p>Joined: {musicInfo.joindate}</p>
            <div className="flex gap-4">{tags}</div>
          </div>
        </div>
      </article>
      <article>
        <h2 className="mb-4">Albums</h2>
        {albums.map((album, index) => (
          <Link
            key={album.id ?? `album-${index}`}
            to="/Search/album/$album"
            params={{ album: album.id }}
            search={{ artist: String(musicInfo.id) }}
          >
            <div>
              {album.image && (
                <img src={album.image} alt={`${album.name ?? "Album"} cover`} />
              )}
              <h3>{album.name ?? "Unknown album"}</h3>
            </div>
          </Link>
        ))}
        <pre>{JSON.stringify(albums, null, 2)}</pre>
      </article>
      <article>
        <h2>Tracks</h2>
        {tracks.map((track, index) => (
          <div
            key={track.id ?? `track-${index}`}
            className="avatar flex items-center mb-3"
          >
            <div className="w-13 h-13 rounded"></div>
            <button
              type="button"
              className="ml-4 cursor-pointer text-left flex items-center"
              disabled={!track.audio}
              onClick={() => track.audio && pla?.setSong(track.audio)}
            >
              <img className="w-13" src={track.image} alt="" />
              <span className="ml-4">
                {track.name} - {musicInfo.name}
              </span>
            </button>
          </div>
        ))}
      </article>
    </section>
  );
}
