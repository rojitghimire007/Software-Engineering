import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// routes config
import routes from '../routes';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse">Loading</div>
  </div>
);

const TheContent = () => {
  return (
    <Suspense fallback={loading}>
      <Switch>
        {routes.map((route, idx) => {
          return (
            <Route
              key={idx}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          );
        })}
        <Redirect from="/" to="/dashboard" />
      </Switch>
    </Suspense>
  );
};

export default React.memo(TheContent);
