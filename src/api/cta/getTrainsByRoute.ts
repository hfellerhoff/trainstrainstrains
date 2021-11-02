// @ts-ignore
import XMLParser from 'react-xml-parser';
import {parseXML} from '../util/parseXML';
import {CTA_API_KEY} from './constants';
import {CTAResponse} from './types';

export type TrainLocationData = {
  tmst: string;
  errCd: string;
  errNm: string;
  route: {
    children: {
      train: {
        rn: string;
        destSt: string;
        destNm: string;
        trDr: string;
        nextStaId: string;
        nextStpId: string;
        nextStaNm: string;
        prdt: string;
        arrT: string;
        isApp: string;
        isDly: string;
        flags: string;
        lat: string;
        lon: string;
        heading: string;
      }[];
    };
  };
};

// For more information:
// https://www.transitchicago.com/developers/ttdocs/#locations
export const getTrainsByRoute = async (route: string) => {
  const res = await fetch(
    `https://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=${CTA_API_KEY}&rt=${route}`,
  );

  const text = await res.text();
  const unparsedData = new XMLParser().parseFromString(text);

  const data = parseXML(unparsedData, {
    duplicateKeys: ['train'],
  }) as CTAResponse<TrainLocationData>;

  return data.ctatt;
};
