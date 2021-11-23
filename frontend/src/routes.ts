import React, { ComponentType } from 'react';
import ShowPipes from 'views/pipes/ShowPipes';
import ShowFittings from 'views/fittings/ShowFittings';
import NewStrungPipes from 'views/stringing/StrungPipes';
import ProjectsPage from 'views/ProjectsPage';
import ProjectSelect from 'views/ProjectSelect';
import BendInfo from 'views/bending/BendInfo';
import MasterLog from 'views/masterLog/MasterLog';
import ListUser from 'views/userListProj/ListUser';

const Dashboard = React.lazy(() => import('views/dashboard/Dashboard'));
// const StrungPipes = React.lazy(() => import('views/stringing/NewStrungPipes'));
const Login = React.lazy(() => import('views/Login'));

const routes: {
  path: string;
  name: string;
  component: ComponentType<any>;
  exact: boolean;
}[] = [
  { path: '/projects', exact: true, name: 'Projects', component: ProjectsPage },
  { path: '/project-select', exact: true, name: 'Project Select', component: ProjectSelect },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/login', exact: true, name: 'Login', component: Login },
  { path: '/pipes', exact: true, name: 'Show', component: ShowPipes },
  { path: '/pipes/strung', exact: true, name: 'Show', component: NewStrungPipes },
  // {
  //   path: '/pipes/strung/new',
  //   exact: true,
  //   name: 'Show',
  //   component: NewStrungPipes,
  // },
  { path: '/fittings', exact: true, name: 'Fittings', component: ShowFittings },
  { path: '/bending', exact: true, name: 'Bending', component: BendInfo },
  { path: '/aggregate', exact: true, name: 'Aggregate', component: MasterLog },
  { path: '/project/user', exact: true, name: 'Project Users', component: ListUser}
];

export default routes;
