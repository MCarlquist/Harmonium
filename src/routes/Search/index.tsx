import {
  createFileRoute,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, useState, type KeyboardEvent } from "react";
import ResultsTable from "../../Components/Search/ResultsTable";
import { jamendoSearch } from "../../Hooks/useJamendo";

export const Route = createFileRoute("/Search/")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  loaderDeps: ({ search }) => ({ q: search.q }),
  loader: async ({ deps: { q } }) => {
    if (!q.trim()) {
      return { artists: [], tracks: [], playlists: [] };
    }

    const [artists, tracks, playlists] = await Promise.all([
      jamendoSearch("artists", q),
      jamendoSearch("tracks", q),
      jamendoSearch("playlists", q),
    ]);

    return { artists, tracks, playlists };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { q } = Route.useSearch();
  const results = Route.useLoaderData();
  const isSearching = useRouterState({
    select: (state) => state.status === "pending",
  });
  const [query, setQuery] = useState(q);

  useEffect(() => {
    setQuery(q);
  }, [q]);

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;

    await navigate({
      search: { q: query.trim() },
      replace: true,
    });
  };

  const hasResults =
    results.artists.length > 0 ||
    results.tracks.length > 0 ||
    results.playlists.length > 0;

  return (
    <div className="w-full">
      <div className="flex gap-4">
        <h1 className="text-3xl font-bold">Search</h1>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          className="input input-lg"
          placeholder="Artist, track or playlist..."
        />
      </div>

      {hasResults ? (
        <div className="flex w-full flex-row gap-6">
          <ResultsTable type="artists" results={results.artists} query={q} />
          <ResultsTable type="tracks" results={results.tracks} />
          <ResultsTable type="playlists" results={results.playlists} />
        </div>
      ) : (
        <NoResults isSearching={isSearching} hasQuery={Boolean(q)} />
      )}
    </div>
  );
}

function NoResults({
  isSearching,
  hasQuery,
}: {
  isSearching: boolean;
  hasQuery: boolean;
}) {
  return (
    <div className="mt-10">
      {isSearching ? (
        <span className="skeleton skeleton-text text-center">
          Finding your next listen...
        </span>
      ) : (
        <h3>{hasQuery ? "No results found." : "Search for your results..."}</h3>
      )}
    </div>
  );
}
