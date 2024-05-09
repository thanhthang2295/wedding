import { APP_TYPES } from "./types";
import invoke from "react-native-webview-invoke/browser";
import { isEmpty } from "lodash";
import { goWelcome } from "routes/service";

export const onClose = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: APP_TYPES.LOG_OUT });
      if (!isEmpty(invoke.fn)) {
        await invoke.fn.close();
      } else {
        goWelcome();
      }
    } catch (error) {
      throw error;
    }
  };
}

export const onVoucher = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: APP_TYPES.LOG_OUT });
      if (!isEmpty(invoke.fn)) {
        await invoke.fn.voucher();
      } else {
        goWelcome();
      }
    } catch (error) {
      throw error;
    }
  };
}
