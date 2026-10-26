import { invoke } from "@tauri-apps/api/core";
import type {
  ArtistsByIdResults,
  JamendoResults,
  JamendoEndpoint,
  ArtistsByIdEndpoint,
  AlbumResult
} from "../utils/types";

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
