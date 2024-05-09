import React from "react";
import { Button, Icon } from "components/elements";
import { useDispatch } from "react-redux";
import { onClose } from "redux/actions/app";
import { Loading } from "components/elements/Loading";
export const Welcome = () => {
  // NOTE : PREFIX
  const prefixCls = 'page-welcome';
  // NOTE : CONSTANTS
  const dispatch = useDispatch();
  // NOTE : FUNCTIONS
  const handleClose = () => {
    dispatch(onClose());
  }
  // NOTE : RN
  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-inner`}>
        <h2>Welcome</h2>
        <p>GS25 Nice Day</p>
        <div className={`${prefixCls}-btn`}>
          <Button className="btn btn-link" onClick={handleClose}>
            <Icon name="chevron-left" /><span>Go Back</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
