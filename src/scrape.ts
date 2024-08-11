import { data, type ITerrorZone } from "./data";

const TZ_ID_MAP = data.reduce((acc, curr) => {
  acc[curr.apiId] = curr;
  return acc;
}, {} as Record<number, ITerrorZone>);

type TzId = keyof typeof TZ_ID_MAP;

let lastScrape: number;

function getTzById(tzId: TzId) {
  return TZ_ID_MAP[tzId];
}

interface D2EmuTzApiResponse {
  current: string[];
  next: string[];
  next_terror_time_utc: number;
}

export async function scrape() {
  return fetch("https://www.d2emu.com/api/v1/tz")
    .then((response) => response.json())
    .then(function (terrorZones: D2EmuTzApiResponse) {
      // store the last scrape time
      const currentUtc = Math.round(Date.now() / 1000);
      lastScrape = currentUtc;

      console.log(terrorZones);

      const current = parseInt(terrorZones.current[0]) as TzId;
      const next = parseInt(terrorZones.next[0]) as TzId;

      console.log("current", getTzById(current));
      console.log("next", getTzById(next));

      return {
        current: getTzById(current),
        next: {
          ...getTzById(next),
          timeUtc: terrorZones.next_terror_time_utc,
        },
      };
    });
}
