import { Category } from "./parser/model/enum/categoy.enum";

const useMockData: boolean = true;

export const SRC_DIRECTORY: string = `${__dirname}`;
export const STORE: string = `store`;
export const BACKEND: string = `backend`;
function getStorePath(): string {
  let path: string = `${SRC_DIRECTORY}/store`;
  if (useMockData) {
    path += "/mock";
  } else {
    path += "/output";
  }
  return path;
}

export const STORE_OUTPUT_WRITE_PATH: string = `${SRC_DIRECTORY}/store/output`;
export const STORE_OUTPUT_PATH: string = getStorePath();
export const FRONTEND_PATH: string = "../../frontend/dist/frontend";

export const DATE_MONTH_MAP = {};
DATE_MONTH_MAP["20_12"] = "December 2020";
DATE_MONTH_MAP["21_01"] = "January 2021";
DATE_MONTH_MAP["21_02"] = "February 2021";
DATE_MONTH_MAP["21_03"] = "March 2021";

export const CATEGORY_REGEX_LIST = [
  {
    category: Category.EATING_OUT,
    regex: "(MCDONALD|POPEYES|HOLY DONUT|EMPIRE|DOMINO|UNCHARTED TEA|SHERE)",
  },
  {
    category: Category.GROCERIES,
    regex: "(WHOLEFDS|HANNAFORD)",
  },
  {
    category: Category.ENTERTAINMENT,
    regex: "(Disney|Roku)",
  },
  {
    category: Category.LEGAL,
    regex: "(USCIS|MICOL MION)",
  },
];
