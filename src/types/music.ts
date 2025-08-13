export interface Track {
  name: string;
  file: File;
  url: string;
  id: string;
}

export interface StoredTrack {
  name: string;
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}
