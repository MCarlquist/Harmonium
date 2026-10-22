import { Link } from "@tanstack/react-router";
import { ArtistResult, TrackResult, PlaylistResult } from "../../utils/types";


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
      <Table title="Artists" headings={["Name"]}>
        {props.results.map((artist, index) => (
          <tr key={artist.id ?? `artist-${index}`}>
            <td>
              {artist.id !== undefined ? (
                <Link
                  to="/Search/$result"
                  params={{ result: String(artist.id) }}
                >
                  <Artwork image={artist.image} name={artist.name} />
                </Link>
              ) : (
                <Artwork image={artist.image} name={artist.name} />
              )}
            </td>
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
            <td>
              <Artwork image={track.image} name={track.name} />
            </td>
            <td>{track.artist_name ?? "—"}</td>
            <td>{track.album_name ?? "—"}</td>
            <td>{formatDuration(track.duration)}</td>
          </tr>
        ))}
      </Table>
    );
  }

  return (
    <Table title="Playlists" headings={["Name", "Owner"]}>
      {props.results.map((playlist, index) => (
        <tr key={playlist.id ?? `playlist-${index}`}>
          <td>
            <Artwork image={playlist.image} name={playlist.name} />
          </td>
          <td>{playlist.user_name ?? "—"}</td>
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
    <section className="min-w-0 flex-1 overflow-x-auto">
      <h3 className="font-bold">{title}</h3>
      <table className="table w-full">
        <thead>
          <tr>
            {headings.map((heading) => (
              <th key={heading}>{heading}</th>
            ))}
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
