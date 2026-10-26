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
    description?: Partial<
      Record<
        "de" | "en" | "es" | "fr" | "it" | "ja" | "pl" | "pt" | "ru",
        string
      >
    >;
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

export type ArtistTracksResponse = {
  tracks: TrackResult[];
  id: string;
  image?: string;
  joindate?: string;
  name: string;
  website?: string;
};

export type ArtistsByIdResults = {
  musicinfo: ArtistMusicInfo;
  tracks: ArtistTracksResponse;
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
  audio?: string;
};

export type PlaylistResult = {
  id?: string | number;
  name?: string;
  user_name?: string;
  creationdate?: string;
  image?: string;
};

export type AlbumResult = {
  id: string;
  name: string;
  releasedate: string;
  artist_id: string;
  artist_name: string;
  track_id: string;
  image: string;
  zip: string;
  zip_allowed: boolean;
  tracks: AlbumTracks[];
};

export type AlbumTracks = TrackResult & {
  count: string;
  position: string;
};

export type JamendoResult = ArtistResult | TrackResult | PlaylistResult;
export type ArtistsByIdEndpoint = keyof ArtistsByIdResults;
export type JamendoEndpoint = keyof JamendoResults;
export type AlbumResultsEndpoint = keyof AlbumResult;
