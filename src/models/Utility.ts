export type Photo = {
  url: string;
  width: number;
  height: number;
};

export type Video = {
  duration: number;
  isMuted: boolean;
  thumbnail: Photo;
};
