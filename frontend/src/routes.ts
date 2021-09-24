import React, { ComponentType } from 'react';

const Dashboard = React.lazy(() => import('views/dashboard/Dashboard'));
const Login = React.lazy(() => import('views/Login'));
// const Organizations = React.lazy(() =>
//   import("./views/organizations/Organizations")
// );
// const AddOrganization = React.lazy(() =>
//   import("./views/organizations/AddOrganization")
// );
// const OrganizationDetails = React.lazy(() =>
//   import("./views/organizations/OrganizationDetails")
// );

const routes: {
  path: string;
  name: string;
  component: ComponentType<any>;
  exact: boolean;
}[] = [
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/login', exact: true, name: 'Login', component: Login },
  //   {
  //     path: "/organizations/",
  //     exact: true,
  //     name: "Organizations",
  //     component: Organizations,
  //   },
];

export default routes;
