import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import {
  type ArtistResult,
  type PlaylistResult,
  type TrackResult,
} from "../../utils/types";
import ResultsTable from "../../Components/Search/ResultsTable";
import { jamendoSearch } from "../../Hooks/useJamendo";

export const Route = createFileRoute("/Search/")({
  component: RouteComponent,
});

type NoResultsType = {
  searching: boolean;
};

type SearchResults = {
  artists: ArtistResult[];
  tracks: TrackResult[];
  playlists: PlaylistResult[];
};

function RouteComponent() {
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>({
    artists: [],
    tracks: [],
    playlists: []
  });

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (e.key === "Enter") {
      setIsSearching(true);
      const artists = await jamendoSearch('artists', query);
      const tracks = await jamendoSearch('tracks', query);
      const playlists = await jamendoSearch('playlists', query);
      setIsSearching(false);
      setResults({ artists, tracks, playlists });
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-4">
        <h1 className="text-3xl font-bold">Search</h1>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input input-lg"
          placeholder="Artist, track or playlist..."
        />
      </div>
      {results.artists.length > 0 || results.tracks.length > 0 || results.playlists.length > 0 ? (
        <div className="flex w-full flex-row gap-6">
          <ResultsTable type="artists" results={results.artists} />
          <ResultsTable type="tracks" results={results.tracks} />
          <ResultsTable type="playlists" results={results.playlists} />
        </div>
      ) : (
        <NoResults searching={!isSearching} />
      )}
    </div>
  );
}

function NoResults({ searching }: NoResultsType) {
  return (
    <>
      {searching ? (
        <div className="mt-10">
          <h3>Search for your results...</h3>
        </div>
      ) : (
          <div className="mt-10">
            <span className="skeleton skeleton-text text-center">Finding your next listen...</span>
        </div>
      )}
    </>
  );
}
