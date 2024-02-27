export type Movie = {
  id: number;
  movieCode?: string[];
  title_en: string;
  title_th: string;
  rating: string;
  rating_id: number;
  duration: number;
  release_date: string;
  sneak_date: string;
  synopsis_th: string;
  synopsis_en: string;
  director: string;
  actor: string;
  genre: string;
  poster_ori: string;
  poster_url: string;
  widescreen_url: string | null;
  trailer: string;
  tr_ios: string | null;
  tr_hd: string | null;
  tr_sd: string | null;
  tr_mp4: string | null;
  priority: string;
  now_showing: string;
  advance_ticket: string;
  date_update: string;
  show_buyticket: string;
  trailer_cms_id: string;
  trailer_ivx_key: string | null;
};