import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onClose, onVoucher } from "redux/actions/app";

import { Button, Icon, Image } from "components/elements";
import { useHeader } from "layouts/Header/HeaderProvider";
import { IMAGES } from "assets/images";
import { Message } from "components/elements/Message";
import { getLocaleMessage, validResponse } from "common";
import { SERVICE_ASYNC } from "services/async";
import { Loading } from "components/elements/Loading";
import { isEmpty } from "lodash";
import invoke from "react-native-webview-invoke/browser";
import { goWelcome } from "routes/service";

const ScanQrCode = ({ location }) => {
  // NOTE : PREFIX
  const prefixSectionCls = 'section';
  const prefixFormCls = 'form';
  // NOTE : CONSTANTS
  const dispatch = useDispatch();
  const { state } = location;
  // NOTE : STATE
  const [countCallApi, setCountCallApi] = useState(0);
  // NOTE : USE REDUCER;
  const { appReducer: { insets, token, dataHash } } = useSelector((state) => state);
  // NOTE : HEADER HOOK
  const { setHeaderLeft, setHeaderCenter, setHeaderRight } = useHeader();
  // Set custom content for the header sections
  useEffect(() => {
    setHeaderLeft(<Button className='btn-icon navigation-header__btn' onClick={handleClose}>
      <Icon name='chevron-left' />
    </Button>);
  }, [setHeaderLeft, setHeaderCenter, setHeaderRight]);
  // NOTE : STYLE
  // const style = {
  //   paddingTop: insets?.top ? insets.top + 56 : 56,
  //   // paddingBottom: insets?.bottom ? insets.bottom + 60 : 0,
  // }
  // NOTE : FUNCTIONS
  const handleClose = () => {
    dispatch(onClose());
  }
  const handleVoucher = () => {
    dispatch(onVoucher());
  }
  const handleGetGift = async () => {
    
    if (countCallApi >= 3) {
      rnMessage('NoCallApi');
      return;
    }
    Loading.show();
    setCountCallApi(prev => prev + 1);
    let resGetGift = await SERVICE_ASYNC.POST({
      url: "/campaign/award",
      params: dataHash,
      accessToken: token
    })
    if (validResponse(resGetGift)) {
      Loading.hide();
      let itemName = resGetGift?.data?.itemName;
      let message = `Bạn nhận được ${itemName}`
      rnMessage('success', message);
    } else {
      Loading.hide();
      let errorCode = resGetGift?.errorCode;
      if (errorCode !== '') {
        rnMessage(errorCode);
      } else {
        rnMessage("NoCallApi");
      }
    }
  }
  // NOTE : HANDLER
  const rnMessage = (type, messge) => {
    switch (type) {
      case 'success':
        Message.success(
          {
            icon: 'success',
            message: "Chúc mừng",
            description: messge,
            buttons: [
              {
                className: 'btn-success',
                action: () => handleVoucher(),
                content: 'Xem Quà Ngay'
              }
            ]
          }
        )
        break;
    
      case 'CP00':
        Message.error(
          {
            icon: 'error',
            message: getLocaleMessage('message', 'CP00'),
            description: getLocaleMessage('description', 'CP00'),
            buttons: [
              {
                className: 'btn-error',
                action: () => handleClose(),
                content: 'Đã hiểu'
              }
            ]
          }
        )
        break;
      case 'CP04':
      case 'MB12':
        Message.error(
          {
            icon: 'error',
            message: getLocaleMessage('message', 'CP04'),
            description: getLocaleMessage('description', 'CP04'),
            buttons: [
              {
                className: 'btn-error',
                action: () => handleClose(),
                content: 'Đã hiểu'
              }
            ]
          }
        )
        break;
      case 'CP05':
        Message.error(
          {
            icon: 'clock-x',
            message: getLocaleMessage('message', 'CP05'),
            description: getLocaleMessage('description', 'CP05'),
            buttons: [
              {
                className: 'btn-error',
                action: () => handleClose(),
                content: 'Đã hiểu'
              }
            ]
          }
        )
        break;
      case 'CP06':
        Message.error(
          {
            icon: 'clock-x',
            message: getLocaleMessage('message', 'CP06'),
            description: getLocaleMessage('description', 'CP06'),
            buttons: [
              {
                className: 'btn-error',
                action: () => handleClose(),
                content: 'Đã hiểu'
              }
            ]
          }
        )
        break;
      case 'NoCallApi':
        Message.error(
          {
            icon: 'error',
            message: getLocaleMessage('message', 'error'),
            description: getLocaleMessage('description', 'error'),
            buttons: [
              {
                className: 'btn-error',
                action: () => handleClose(),
                content: 'Đã hiểu'
              }
            ]
          }
        )
        break;
    
      default:
        Message.error(
          {
            icon: 'error',
            message: getLocaleMessage('message', 'error'),
            description: getLocaleMessage('description', 'error'),
            buttons: [
              {
                className: 'btn-error',
                action: () => handleGetGift(),
                content: 'Thử lại'
              }
            ]
          }
        )
        break;
    }
  }
  // NOTE : RN
  return (
    <div className="container">
      <div className={prefixSectionCls + '-block'}>
        <div className={prefixFormCls + '-block'}>
          <Image src={IMAGES.congratulation} alt='Chúc mừng quý khách ' />
          <div>
            <p>Chào mừng bạn đến với chương trình</p>
            <strong>{state?.campaignName}</strong>
          </div>
        </div>
        <div className={prefixSectionCls + '-block__bottom'}>
          <Button className="btn-primary" onClick={handleGetGift}>Nhận Quà</Button>
        </div>
      </div>
    </div>
  )
}

export default memo(ScanQrCode);
