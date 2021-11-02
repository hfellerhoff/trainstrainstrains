// @ts-ignore
import XMLParser from 'react-xml-parser';
import {parseXML} from '../util/parseXML';
import {CTA_API_KEY} from './constants';
import {CTAResponse} from './types';

export type ArrivalDataETA = {
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
};

export type ArrivalData = {
  tmst: string;
  errCd: string;
  errNm: string;
  eta: ArrivalDataETA[];
};

// For more information:
// https://www.transitchicago.com/developers/ttdocs/#_Toc296199903
export const getArrivalsByMapID = async (map_id: string | number) => {
  const res = await fetch(
    `https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${CTA_API_KEY}&mapid=${map_id}`,
  );

  const text = await res.text();
  const unparsedData = new XMLParser().parseFromString(text);

  const data = parseXML(unparsedData, {
    duplicateKeys: ['eta'],
  }) as CTAResponse<ArrivalData>;

  return data.ctatt;
};
