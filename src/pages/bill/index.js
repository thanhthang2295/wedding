import React, { memo } from "react";
import { Button, Icon } from "components/elements";
import { useDispatch, useSelector } from "react-redux";
import { onClose } from "redux/actions/app";

const Bill = () => {
  const prefixCls = 'page-bill';
  // NOTE : CONSTANTS
  const dispatch = useDispatch();
  // NOTE : USE REDUCER;
  const { appReducer: { dataEncrypt } } = useSelector((state) => state);
  // NOTE : FUNCTIONS
  const handleClose = () => {
    dispatch(onClose());
  }
  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-inner`}>
        <h2>Bill</h2>
        <div className={`${prefixCls}-btn`}>
          <Button className="btn btn-link" onClick={handleClose}>
            <Icon name="chevron-left" /><span>Go Back</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default memo(Bill);
