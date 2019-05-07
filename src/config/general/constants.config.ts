import * as path from "path";

/* Times */
export const MILLISECONDS_IN_A_DAY: number = 86400000;
export const ANIMATION_WAIT_TIME: number = 2000; // milliseconds
export const SHORT_ANIMATION_WAIT_TIME: number = 250;
export const AFTER_ACTION_WAIT_TIME: number = 100; // milliseconds

/* Dates */
export const TODAYS_DATE: Date = new Date();
export const TOMORROWS_DATE: Date = new Date(
  +new Date() + MILLISECONDS_IN_A_DAY
);
export const A_WEEK_FROM_NOW: Date = new Date(
  +new Date() + MILLISECONDS_IN_A_DAY * 7
);

const customFormat = function(formatString: string, date: Date): string {
  let YYYY,
    YY,
    MMMM,
    MMM,
    MM,
    M,
    DDDD,
    DDD,
    DD,
    D,
    hhhh,
    hhh,
    hh,
    h,
    mm,
    m,
    ss,
    s,
    ampm,
    AMPM,
    dMod,
    th;
  YY = ((YYYY = date.getFullYear()) + "").slice(-2);
  MM = (M = date.getMonth() + 1) < 10 ? "0" + M : M;
  MMM = (MMMM = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ][M - 1]).substring(0, 3);
  DD = (D = date.getDate()) < 10 ? "0" + D : D;
  DDD = (DDDD = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ][date.getDay()]).substring(0, 3);
  th =
    D >= 10 && D <= 20
      ? "th"
      : (dMod = D % 10) == 1
      ? "st"
      : dMod == 2
      ? "nd"
      : dMod == 3
      ? "rd"
      : "th";
  formatString = formatString
    .replace("#YYYY#", YYYY.toString())
    .replace("#YY#", YY)
    .replace("#MMMM#", MMMM)
    .replace("#MMM#", MMM)
    .replace("#MM#", MM.toString())
    .replace("#M#", M.toString())
    .replace("#DDDD#", DDDD)
    .replace("#DDD#", DDD)
    .replace("#DD#", DD.toString())
    .replace("#D#", D.toString())
    .replace("#th#", th);
  h = hhh = date.getHours();
  if (h == 0) h = 24;
  if (h > 12) h -= 12;
  hh = h < 10 ? "0" + h : h;
  hhhh = hhh < 10 ? "0" + hhh : hhh;
  AMPM = (ampm = hhh < 12 ? "am" : "pm").toUpperCase();
  mm = (m = date.getMinutes()) < 10 ? "0" + m : m;
  ss = (s = date.getSeconds()) < 10 ? "0" + s : s;
  return formatString
    .replace("#hhhh#", hhhh.toString())
    .replace("#hhh#", hhh.toString())
    .replace("#hh#", hh.toString())
    .replace("#h#", h.toString())
    .replace("#mm#", mm.toString())
    .replace("#m#", m.toString())
    .replace("#ss#", ss.toString())
    .replace("#s#", s.toString())
    .replace("#ampm#", ampm.toString())
    .replace("#AMPM#", AMPM.toString());
};
export const A_WEEK_FROM_NOW_STR: string = customFormat(
  "#MM#/#DD#/#YYYY#",
  A_WEEK_FROM_NOW
);

/* Directories */
export const LOGS_DIRECTORY_PATH: string = "./logs";
export const LOG_FILE_NAME: string = `${TODAYS_DATE.getFullYear()}-${TODAYS_DATE.getMonth() +
  1}-${TODAYS_DATE.getDate()}.txt`;
export const LOG_FILE_PATH: string = path.join(
  LOGS_DIRECTORY_PATH,
  LOG_FILE_NAME
);
export const CSV_FILE_NAME: string = `ResultsCSV_${TODAYS_DATE.getFullYear()}-${TODAYS_DATE.getMonth() +
  1}-${TODAYS_DATE.getDate()}.csv`;
export const CSV_FILE_PATH: string = path.join(
  LOGS_DIRECTORY_PATH,
  CSV_FILE_NAME
);

export const NO_OFFERING_CSV_FILE_NAME: string = `NoOfferingCSV_${TODAYS_DATE.getFullYear()}-${TODAYS_DATE.getMonth() +
  1}-${TODAYS_DATE.getDate()}.csv`;
export const NO_OFFERING_CSV_FILE_PATH: string = path.join(
  LOGS_DIRECTORY_PATH,
  NO_OFFERING_CSV_FILE_NAME
);
