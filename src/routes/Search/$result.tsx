import { createFileRoute, Link } from "@tanstack/react-router";
import { artistsById } from "../../Hooks/useJamendo";

export const Route = createFileRoute("/Search/$result")({
  loader: async ({ params }) => {
    const { result } = params;
    const [musicInfoResults, tracksResults, albumResults] = await Promise.all([
      artistsById("musicinfo", result),
      artistsById("tracks", result),
      artistsById("albums", result),
    ]);

    const musicInfo = musicInfoResults[0];
    const tracks = tracksResults;
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

  console.log(albums, tracks);
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
        <h2>Albums</h2>
        {albums.map((album, index) => (
          <div key={album.id ?? `album-${index}`}>
            {album.image && (
              <img src={album.image} alt={`${album.name ?? "Album"} cover`} />
            )}
            <h3>{album.name ?? "Unknown album"}</h3>
          </div>
        ))}
        <pre>{JSON.stringify(albums, null, 2)}</pre>
      </article>
    </section>
  );
}
