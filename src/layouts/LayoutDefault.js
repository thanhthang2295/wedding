import React, { memo, useEffect, useState } from "react";
import classNames from "classnames";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { DomUtils } from "utils/DomUtil";
import { NavigationHeader } from "components/layouts/navigation/header";
import { useSelector } from "react-redux";
import { HeaderProvider } from "./Header/HeaderProvider";

const LayoutDefault = ({ children, className, header, bottom, title, ...rest }) => {

  // NOTE : USE REDUCER;
  const { appReducer: { insets } } = useSelector((state) => state);
  // NOTE : STATE
  let { state } = useLocation();
  // NOTE : HOOK
  const scrollPosition = DomUtils.useScrollDirection(1);
  // NOTE : Style
  const classname = classNames('main', 'main-' + className, header && 'is-header', bottom && 'is-bottom');
  const heightHeader = header ? 56 : 0;
  const style = {
    paddingTop: insets?.top ? insets.top + heightHeader : heightHeader,
    // paddingBottom: insets?.bottom ? insets.bottom + 60 : 0,
  }
  // NOTE : RETURN
  return (
    <HeaderProvider>
      <NavigationHeader scrollPosition={scrollPosition} title={state?.title ? state?.title : title} />
      <main className={classname} style={style}>{children}</main>
    </HeaderProvider>
  )
}

export default memo(LayoutDefault);
