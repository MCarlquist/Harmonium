export type ArtistResult = {
  id?: string | number;
  name?: string;
  image?: string;
  joindate?: string;
};

export type TrackResult = {
  id?: string | number;
  name?: string;
  artist_name?: string;
  album_name?: string;
  image?: string;
  duration?: number;
};

export type PlaylistResult = {
  id?: string | number;
  name?: string;
  user_name?: string;
  creationdate?: string;
  image?: string;
};

export type JamendoResult = ArtistResult | TrackResult | PlaylistResult;

type ResultsTableProps =
  | { type: "artists"; results: ArtistResult[] }
  | { type: "tracks"; results: TrackResult[] }
  | { type: "playlists"; results: PlaylistResult[] };

function Artwork({ image, name }: { image?: string; name?: string }) {
  return (
    <div className="flex items-center gap-3">
      {image && (
        <div className="avatar">
          <div className="mask mask-squircle h-12 w-12">
            <img src={image} alt={`${name ?? "Result"} artwork`} />
          </div>
        </div>
      )}
      <div className="font-bold">{name ?? "Unknown"}</div>
    </div>
  );
}

function ResultsTable(props: ResultsTableProps) {
  if (props.type === "artists") {
    return (
      <Table title="Artists" headings={["Name", "Joined"]}>
        {props.results.map((artist, index) => (
          <tr key={artist.id ?? `artist-${index}`}>
            <td><Artwork image={artist.image} name={artist.name} /></td>
            <td>{artist.joindate ?? "—"}</td>
          </tr>
        ))}
      </Table>
    );
  }

  if (props.type === "tracks") {
    return (
      <Table title="Tracks" headings={["Name", "Artist", "Album", "Duration"]}>
        {props.results.map((track, index) => (
          <tr key={track.id ?? `track-${index}`}>
            <td><Artwork image={track.image} name={track.name} /></td>
            <td>{track.artist_name ?? "—"}</td>
            <td>{track.album_name ?? "—"}</td>
            <td>{formatDuration(track.duration)}</td>
          </tr>
        ))}
      </Table>
    );
  }

  return (
    <Table title="Playlists" headings={["Name", "Owner", "Created"]}>
      {props.results.map((playlist, index) => (
        <tr key={playlist.id ?? `playlist-${index}`}>
          <td><Artwork image={playlist.image} name={playlist.name} /></td>
          <td>{playlist.user_name ?? "—"}</td>
          <td>{playlist.creationdate ?? "—"}</td>
        </tr>
      ))}
    </Table>
  );
}

function Table({
  title,
  headings,
  children,
}: {
  title: string;
  headings: string[];
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-x-auto">
      <h3 className="font-bold">{title}</h3>
      <table className="table">
        <thead>
          <tr>
            {headings.map((heading) => <th key={heading}>{heading}</th>)}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </section>
  );
}

function formatDuration(duration?: number) {
  if (duration === undefined) return "—";

  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default ResultsTable;
