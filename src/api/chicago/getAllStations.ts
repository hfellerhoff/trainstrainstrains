// https://data.cityofchicago.org/resource/8pix-ypme.json

export type StationData = {
  stop_id: string;
  direction_id: string;
  stop_name: string;
  station_name: string;
  station_descriptive_name: string;
  map_id: string;
  ada: boolean;
  red: boolean;
  blue: boolean;
  g: boolean;
  brn: boolean;
  p: boolean;
  pexp: boolean;
  y: boolean;
  pnk: boolean;
  o: boolean;
  location: {
    latitude: string;
    longitude: string;
  };
  '@computed_region_awaf_s7ux': string;
  '@computed_region_6mkv_f3dw': string;
  '@computed_region_vrxf_vc4k': string;
  '@computed_region_bdys_3d7i': string;
  '@computed_region_43wa_7qmu': string;
};

export const getAllStations = async () => {
  const res = await fetch(
    'https://data.cityofchicago.org/resource/8pix-ypme.json',
  );
  const data: StationData[] = await res.json();

  return data;
};
