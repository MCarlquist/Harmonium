import { Link } from "@tanstack/react-router";
import { ArtistResult, TrackResult, PlaylistResult } from "../../utils/types";
import { PlayerContext } from "../../context/PlayerContext";
import { useContext } from "react";
import { formatDuration } from "../../utils/formatDuration";

type ResultsTableProps =
  | { type: "artists"; results: ArtistResult[]; query?: string }
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

/** Renders search results by category, linking artists whose IDs are defined. */
function ResultsTable(props: ResultsTableProps) {
  const pla = useContext(PlayerContext);

  if (props.type === "artists") {
    return (
      <Table title="Artists" headings={["Name"]}>
        {props.results.map((artist, index) => (
          <tr key={artist.id ?? `artist-${index}`}>
            <td>
              {artist.id !== undefined ? (
                <Link
                  to="/Search/artist/$result"
                  params={{ result: String(artist.id) }}
                  search={{ q: props.query ?? "" }}
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
            <td onClick={() => track.audio && pla?.setSong(track.audio)}>
              <button>
                <Artwork image={track.image} name={track.name} />
              </button>
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

/** Renders a result table that scrolls horizontally when its content overflows. */
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



export default ResultsTable;
