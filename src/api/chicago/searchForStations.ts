import {getAllStations, StationData} from './getAllStations';

let data: StationData[];
export const searchForStations = async (query: string) => {
  if (!data) {
    data = await getAllStations();
  }

  const results = data.filter(station => {
    return station.station_descriptive_name.includes(query);
  });

  return results;
};
