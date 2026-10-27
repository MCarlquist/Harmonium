import { invoke } from "@tauri-apps/api/core";
import type {
  ArtistsByIdResults,
  JamendoResults,
  JamendoEndpoint,
  ArtistsByIdEndpoint,
  AlbumResult
} from "../utils/types";

/**
 * Searches Jamendo by name in the selected category through Tauri.
 * @returns The matching results array, which may be empty.
 * @throws Propagates invocation failures, including request, HTTP status, and
 * response decoding errors.
 */
export const jamendoSearch = async <T extends JamendoEndpoint>(
  endpoint: T,
  query: string,
): Promise<JamendoResults[T][]> => {
  try {
    const results = await invoke<JamendoResults[T][]>('search_jamendo', {
      endpoint,
      query
    });

    return results;
  } catch (error) {
    console.error(`Error searching ${endpoint}`, error);
    throw error;
  }
};


/**
 * Fetches music information, tracks, or albums for a Jamendo artist ID.
 * @returns Artist results; the tracks and albums endpoints nest their collections
 * within each artist result. The results array may be empty.
 * @throws Propagates invocation failures, including request, HTTP status, and
 * response decoding errors.
 */
export const artistsById = async <T extends ArtistsByIdEndpoint>(
  endpoint: T,
  id: string,
): Promise<ArtistsByIdResults[T][]> => {
  try {
    const results = await invoke<ArtistsByIdResults[T][]>('get_artist_by_id', {
      endpoint,
      id
    });
    return results;
  } catch (error) {
    console.error(`Error searching ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Fetches album results with nested tracks for a Jamendo album ID.
 * @returns The album results array, which may be empty.
 * @throws Propagates invocation failures, including request, HTTP status, and
 * response decoding errors.
 */
export const albumById = async (id: string): Promise<AlbumResult[]> => {
  try {
    const results = await invoke<AlbumResult[]>('get_album_by_id', {
      id
    });
    return results;
  } catch (error) {
    console.error(`Error getting album ${id}`, error);
    throw error;
  }
}
