export type JamendoResults = {
  artists: ArtistResult;
  tracks: TrackResult;
  playlists: PlaylistResult;
};

export type ArtistMusicInfo = {
  id?: string | number;
  name: string;
  image?: string;
  joindate?: string;
  musicinfo?: {
    description?: Partial<Record<"de" | "en" | "es" | "fr" | "it" | "ja" | "pl" | "pt" | "ru", string>>;
    tags?: string[];
  };
  shareurl?: string;
  shorturl?: string;
  website?: string;
};

export type ArtistAlbum = {
  id: string;
  image: string;
  name: string;
  releasedate: string;
};

export type ArtistAlbumsResponse = {
  albums: ArtistAlbum[];
  id: string;
  image?: string;
  joindate?: string;
  name: string;
  website?: string;
};

export type ArtistsByIdResults = {
  musicinfo: ArtistMusicInfo;
  tracks: TrackResult;
  albums: ArtistAlbumsResponse;
};

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
export type ArtistsByIdEndpoint = keyof ArtistsByIdResults;
export type JamendoEndpoint = keyof JamendoResults;
