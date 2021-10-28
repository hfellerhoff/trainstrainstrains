import {XMLItem} from '../api/cta/types';

type ParseXMLOptions = {
  // XML can have multiple keys with the same name; when using this function,
  // list those names in this array to avoid overwriting data
  duplicateKeys: string[];
};

const parseXMLItem = (
  xml: XMLItem,
  options: ParseXMLOptions,
): Record<string, any> => {
  if (xml.children.length === 0) {
    return {};
  }

  return xml.children.reduce((acc: Record<string, any>, cur: XMLItem) => {
    if (options.duplicateKeys.includes(cur.name)) {
      if (!acc[cur.name]) {
        acc[cur.name] = [];
      }

      acc[cur.name].push(parseXMLItem(cur, options));
    } else {
      const children = parseXMLItem(cur, options);

      if (Object.values(children).length > 0) {
        acc[cur.name] = {
          value: cur.value,
          children,
        };
      } else {
        acc[cur.name] = cur.value;
      }
    }

    return acc;
  }, {});
};

export const parseXML = (
  xml: XMLItem,
  options: ParseXMLOptions = {
    duplicateKeys: [],
  },
): Record<string, any> => {
  let obj: Record<string, any> = {
    [xml.name]: parseXMLItem(xml, options),
  };

  return obj;
};
