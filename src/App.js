import React, { useEffect, useState } from "react"
import { isEmpty, isEqual } from "lodash";
import { RootRouter } from "routes";
import { CryptoUtils } from "utils/CryptoUtil";
import { StringUtils } from "utils/StringUtils";
import { APP_TYPES } from "redux/actions/app/types";
import { useDispatch, useSelector } from "react-redux";
import { PatternUtils } from "utils/PatternUtil";
import { handleNotSupport } from "routes/service";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ROUTE_NAME } from "routes/name";
import { LoadingSuspense } from "components/elements";
import { Welcome } from "pages/others/welcome";
import DateUtil from "utils/DateUtil";
import { Message } from "components/elements/Message";
import { getLocaleMessage } from "common";
import { ENCRYPT_CAMPAIGN_KEY } from "services/config";
import { DomUtils } from "utils/DomUtil";

export default function App() {
  useEffect(() => {
    //  DomUtils.addEventListener(window, 'contextmenu', event => event.preventDefault());
  });
  return <RootRouter />
}
