import {getAllStations, StationData} from './getAllStations';

let data: StationData[];
export const searchForStations = async (query: string) => {
  if (!data) {
    data = await getAllStations();
  }

  let stations: Record<string, boolean> = {};
  const results = data.reduce((acc, station) => {
    const mapIDAdded = !!stations[station.map_id];

    if (
      station.station_descriptive_name
        .toLowerCase()
        .includes(query.toLowerCase())
    ) {
      if (mapIDAdded) {
        acc[station.map_id].red = acc[station.map_id].red || station.red;
        acc[station.map_id].blue = acc[station.map_id].blue || station.blue;
        acc[station.map_id].p = acc[station.map_id].p || station.p;
        acc[station.map_id].pexp = acc[station.map_id].pexp || station.pexp;
        acc[station.map_id].y = acc[station.map_id].y || station.y;
        acc[station.map_id].g = acc[station.map_id].g || station.g;
        acc[station.map_id].o = acc[station.map_id].o || station.o;
        acc[station.map_id].brn = acc[station.map_id].brn || station.brn;
        acc[station.map_id].pnk = acc[station.map_id].pnk || station.pnk;
      } else {
        acc[station.map_id] = station;
      }
    }

    if (!mapIDAdded) {
      stations[station.map_id] = true;
    }

    return acc;
  }, {} as Record<string, StationData>);

  return Object.values(results);
};
