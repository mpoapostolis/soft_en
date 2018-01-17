import curry from "ramda/src/curry";
import pathOr from "ramda/src/pathOr";

export const MSGS = {
  home: {
    En: "HOME",
    Es: "CASA",
    Gr: "ΣΠΙΤΙ",
  },
  LOGIN: {
    En: "Login",
    Es: "CASA",
    Gr: "ΕΓΓΡΑΦΗ",
  },
  home: {
    En: "HOME",
    Es: "CASA",
    Gr: "ΣΠΙΤΙ",
  },
  home: {
    En: "HOME",
    Es: "CASA",
    Gr: "ΣΠΙΤΙ",
  },

};

export const getMsg = curry((lng, key) => pathOr(key, [key, lng], MSGS));
