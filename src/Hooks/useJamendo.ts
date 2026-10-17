import { invoke } from "@tauri-apps/api/core";
import type {
  ArtistResult,
  PlaylistResult,
  TrackResult,
} from "../Components/Search/ResultsTable";

type JamendoResults = {
  artists: ArtistResult;
  tracks: TrackResult;
  playlists: PlaylistResult;
};

type JamendoEndpoint = keyof JamendoResults;

export const jamendo = async <T extends JamendoEndpoint>(
  endpoint: T,
  query: string,
): Promise<JamendoResults[T][]> => {
  try {
    const results = await invoke<JamendoResults[T][]>('search_jamendo', {
      endpoint,
      query
    });

    console.log(`${endpoint} results`, results);
    return results;
  } catch (error) {
    console.error(`Error searching ${endpoint}`, error);
    throw error;
  }
};
