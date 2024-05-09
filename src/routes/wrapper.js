import React from 'react';
import { Route } from "react-router-dom";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { ROUTE_NAME } from './name';
const RouteWrapper = ({
  component: Component,
  layout: Layout,
  className,
  isAuthenticated,
  title,
  header,
  ...rest
}) => {

  Layout = (Layout === undefined) ? props => (<>{props.children}</>) : Layout;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return (
            <Layout className={className} title={title} header={header}>
              <Component {...props} />
            </Layout>
          )
        } else {
          return (
            <Redirect
              to={{
                pathname: ROUTE_NAME.PAGE_MAIN
              }}
            />
          )
        }
      }}
    />
  );
}

export default RouteWrapper;
