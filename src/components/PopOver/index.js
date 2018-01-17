import React from "react";
import Popover from "material-ui/Popover";
import { MenuItem, MenuList } from "material-ui/Menu";
import Paper from "material-ui/Paper";
import * as styles from "./css";

const langs = ["En", "Gr", "Es"];

function PopOver(props) {
  const {
    open,
    anchorEl,
    anchorOriginVertical,
    anchorOriginHorizontal,
    transformOriginVertical,
    transformOriginHorizontal,
    handleRequestClose,
    changeLang,
  } = props;
  const { container, item, img } = styles;
  return (
    <div className={container}>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleRequestClose}
        anchorOrigin={{
          vertical: anchorOriginVertical,
          horizontal: anchorOriginHorizontal,
        }}
        transformOrigin={{
          vertical: transformOriginVertical,
          horizontal: transformOriginHorizontal,
        }}>
        <Paper style={{ width: anchorEl ? `${anchorEl.offsetWidth}px` : `0px` }}>
          <MenuList>
            {langs.map((lang, key) => (
              <MenuItem
                className={item}
                key={key}
                onClick={() => {
                  changeLang(lang);
                  handleRequestClose();
                }}>
                <img className={img} alt=":)" src={`/images/${lang}.png`} />
                <label className={item}>{lang}</label>
              </MenuItem>
            ))}
          </MenuList>
        </Paper>
      </Popover>
    </div>
  );
}

PopOver.propTypes = {};

export default PopOver;
