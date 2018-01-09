import curry from "ramda/src/curry";
import pathOr from "ramda/src/pathOr";

export const MSGS = {
  home: {
    en: "HOME",
    es: "CASA",
    gr: "ΣΠΙΤΙ",
  },
};

export const getMsg = curry((lng, key) => pathOr(key, [key, lng], MSGS));
