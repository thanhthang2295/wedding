import classNames from "classnames";
import { createRef, forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { IMAGES } from "assets/images";
import { uniqueId } from "lodash";
import { execFunc } from "common/method";
import { LoadingPayment, LoadingSuspense } from "../LoadingBase";
import { DomUtils } from "utils/DomUtil";
import { Image } from "../Image";

export const loadingRef = createRef();
export const Loading = {
  show: (obj) => loadingRef?.current?.show(obj),
  hide: () => loadingRef?.current?.hide(),
  payment: (obj) => loadingRef?.current?.payment(obj),
}

export const LoadingComponent = forwardRef((_, ref) => {
  const prefixCls = 'loading';
  const [active, setActive] = useState(false);
  const [type, setType] = useState('');

  useImperativeHandle(ref, () => ({
    show: (data) => {
      setActive(true);
      // setTimeout(() => {
      //   handleCancel();
      // }, [3 * 1000])
      DomUtils.addClass(document.body, 'js-active');
    },
    payment: (data) => {
      setType('payment');
      setActive(true);
      DomUtils.addClass(document.body, 'js-active');
    },
    hide: () => {
      setActive(false);
      DomUtils.removeClass(document.body, 'js-active');
    },
  }));

  // NOTE : handle
  const handleClose = () => {
    ref?.current?.hide();
  }

  const handleCancel = (action) => {
    action && execFunc(action())
    ref.current.hide();
  }

  // NOTE : RN
  const rnLoading = useMemo(() => {
    switch (type) {
      case 'payment':
        return <LoadingPayment />
      default:
        return <LoadingSuspense />
    }
  }, [type])

  // NOTE : Config
  const classname = classNames(prefixCls, active && 'js-active');
  if (!active) return null;
  return createPortal(<div
    id={prefixCls +"-"+  uniqueId()}
    className={classname}
    aria-labelledby="alert"
    aria-hidden="true"
  // onClick={handleClose}
  >
    <div className={`${prefixCls}-mask`}></div>
    <div className={`${prefixCls}-container`}>
      <div className={`${prefixCls}-content`}>
        <div className={`${prefixCls}-body`}>
          {rnLoading}
        </div>
      </div>
    </div>
  </div>, document.body)
})
