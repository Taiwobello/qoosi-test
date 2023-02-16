import { restAPIInstance } from "../rest-api-config";
import { Country } from "./../types/Country";
import { RequestResponse } from "./../types/Response";

export const adaptCountryRecord = (record: any, fromBackend?: boolean) => {
  if (!record) {
    return record;
  }
  const keyMap = {
    name: "name",
    flag: "flags",
    cca2: "cca2",
    cca3: "cca3",
    altSpellings: "altSpellings",
    idd: "idd",
  };

  const processedRecord = {
    ...record,
    altSpellings: record.altSpellings[0],
  };

  const adaptedRecord = Object.entries(keyMap).reduce((map, arr) => {
    const value = processedRecord[fromBackend ? arr[1] : arr[0]];
    return value === undefined || value === ""
      ? map
      : {
          ...map,
          [fromBackend ? arr[0] : arr[1]]: value,
        };
  }, {});

  return adaptedRecord;
};

export const allCountries: () => Promise<
  RequestResponse<Country[]>
> = async () => {
  try {
    const response = await restAPIInstance.get("/all");

    return {
      error: false,
      data: response.map((record: any) => adaptCountryRecord(record, true)),
    };
  } catch (error) {
    return {
      error: true,
      data: null,
    };
  }
};
