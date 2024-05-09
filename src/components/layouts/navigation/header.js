import React from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { Button, Icon } from "components/elements";
import { goBack } from "routes/service";
import { execFunc } from "common";
import { onClose } from "redux/actions/app";
import { useHeader } from "layouts/Header/HeaderProvider";

export const NavigationHeader = ({ onLeft, onRight, scrollPosition, title }) => {
  // NOTE : PREFIX
  const prefixClass = 'navigation-header';
  // NOTE : CONSTANT
  const dispatch = useDispatch();
  // NOTE : USE REDUCER;
  const { appReducer: { insets } } = useSelector((state) => state);
  // NOTE : CONTEXT
  const { headerLeft, headerCenter, headerRight } = useHeader();
  
  // NOTE : CLASS NAME
  const classname = classNames('navigation-header',
    scrollPosition > 56 && 'is-scroll'
  )
  const style = {
    height: insets?.top ? insets?.top + 56 : 56,
    paddingTop: insets?.top ? insets.top : 0
  }
  // NOTE : RN
  return (
    <header className={classname} style={style}>
      <div className={`${prefixClass}__left`}>{headerLeft}</div>
      <div className={`${prefixClass}__center`}>{headerCenter ? headerCenter : title}</div>
      <div className={`${prefixClass}__right`}>{headerRight}</div>
    </header>
  )
  
}
