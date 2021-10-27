// @ts-ignore
import XMLParser from 'react-xml-parser';
import {parseXML} from '../../util/parseXML';
import {CTAResponse} from './types';

export type ArrivalData = {
  tmst: string;
  errCd: string;
  errNm: string;
  eta: {
    staId: string;
    stpId: string;
    staNm: string;
    stpDe: string;
    rn: string;
    rt: string;
    destSt: string;
    destNm: string;
    trDr: string;
    prdt: string;
    arrT: string;
    isApp: string;
    isSch: string;
    isDly: string;
    isFlt: string;
    flags: string;
    lat: string;
    lon: string;
    heading: string;
  }[];
};

export const getArrivalsByStation = async (station_id: string | number) => {
  const res = await fetch(
    `https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=bf2353501026404baf975e339a457de9&mapid=${station_id}`,
  );

  const text = await res.text();
  const unparsedData = new XMLParser().parseFromString(text);

  const data = parseXML(unparsedData, {
    duplicateKeys: ['eta'],
  }) as CTAResponse<ArrivalData>;

  return data.ctatt;
};
