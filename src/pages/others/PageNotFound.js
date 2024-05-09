import { IMAGES } from "assets/images";
import { memo, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import invoke from "react-native-webview-invoke/browser";
import { isEmpty } from "lodash";
import { Icon, Button, Image } from "components/elements";

const PageNotFound = () => {
  const prefixCls = 'page-not-found';

  const history = useHistory();
  const onClose = async () => {
    if (!isEmpty(invoke.fn)) {
      await invoke.fn.close();
    } else {
      history.goBack();
    }
  };

  useEffect(() => {
    document.querySelector("body").classList.add("js-open");
  }, [])

  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-inner`}>
        <Image src={IMAGES.oops404} alt="404" />
        <div className={`${prefixCls}-btn`}>
          <Button className="btn btn-link" onClick={onClose}><Icon name="chevron-left" /><span>Go back home</span></Button>
        </div>

      </div>
    </div>
  )
}

export default memo(PageNotFound);
