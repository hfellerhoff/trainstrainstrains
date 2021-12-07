import {getAllStations, StationData} from './getAllStations';

let data: StationData[];
export const getStationByMapID = async (map_id: string) => {
  if (!data) {
    data = await getAllStations();
  }

  const stationData = data.reduce((acc, station) => {
    if (station.map_id === map_id) {
      if (acc.map_id) {
        acc.red = acc.red || station.red;
        acc.blue = acc.blue || station.blue;
        acc.p = acc.p || station.p;
        acc.pexp = acc.pexp || station.pexp;
        acc.y = acc.y || station.y;
        acc.g = acc.g || station.g;
        acc.o = acc.o || station.o;
        acc.brn = acc.brn || station.brn;
        acc.pnk = acc.pnk || station.pnk;
      } else {
        acc = station;
      }
    }

    return acc;
  }, {} as StationData);

  return stationData;
};
