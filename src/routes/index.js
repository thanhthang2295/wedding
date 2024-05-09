import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from './config';
import { LoadingSuspense } from 'components/elements';
import { map } from 'lodash';

export const RootRouter = () => {
  // NOTE : RN
  return (
    <React.Suspense fallback={<LoadingSuspense />}>
      <Switch>
        {
          map(ROUTES, function (route, index) {
            const { path, className, component, exact, isPrivate, title, header } = route;
            return (
              <Route key={'no-authentication' + index} exact={exact} path={path} component={component} />
            )
          })
        }
      </Switch>
    </React.Suspense>
  )
}
