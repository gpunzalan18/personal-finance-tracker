import { Category } from "./model/enum/categoy.enum";

export const ROOT_DIRECTORY: string = `${__dirname}/..`;
export const OUTPUT_FILE_PATH: string = `${ROOT_DIRECTORY}/assets/outputs`;


export const DATE_MONTH_MAP = {};
DATE_MONTH_MAP["20_12"] = "December 2020";
DATE_MONTH_MAP["21_01"] = "January 2021";
DATE_MONTH_MAP["21_02"] = "February 2021";
DATE_MONTH_MAP["21_03"] = "March 2021";
DATE_MONTH_MAP["21_04"] = "April 2021";

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
