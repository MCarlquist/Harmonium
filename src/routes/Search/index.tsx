import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import ResultsTable from "../../Components/Search/ResultsTable";
import { client } from "../../Hooks/useClient";

export const Route = createFileRoute("/Search/")({
  component: RouteComponent,
});

type NoResultsType = {
  searching: boolean;
};

function RouteComponent() {
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      console.log(query);
      // Searching
      setIsSearching(true);
      client(query)
        .then((data) => {
          setIsSearching(false);
          console.log(data);
        })
        .catch((err) => {
          setIsSearching(false);
          console.log(err);
        });
    }
  };

  return (
    <div>
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
      {results.length > 0 ? <Results /> : <NoResults searching={!isSearching} />}
    </div>
  );
}

function Results() {
  return (
    <>
      <div className="flex flex-row gap-10">
        <ResultsTable type={"Artist"} />
        <ResultsTable type={"Track"} />
        <ResultsTable type={"Playlist"} />
      </div>
    </>
  );
}

function NoResults({ searching }: NoResultsType) {
  return (
    <>
      {searching ? (
        <div className="mt-3">
          <h3>Search for your results...</h3>
        </div>
      ) : (
          <div className="mt-3">
            <span className="skeleton skeleton-text text-center">AI is thinking harder...</span>
        </div>
      )}
    </>
  );
}
