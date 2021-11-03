import {getAllStations, StationData} from './getAllStations';

let data: StationData[];
export const searchForStations = async (query: string) => {
  if (!data) {
    data = await getAllStations();
  }

  let foundMapIDs: string[] = [];
  const results = data.filter(station => {
    const mapIDAdded = foundMapIDs.includes(station.map_id);
    const bool =
      station.station_descriptive_name.includes(query) && !mapIDAdded;
    if (!mapIDAdded) {
      foundMapIDs.push(station.map_id);
    }

    return bool;
  });

  return results;
};
