import React, { ComponentType } from 'react';
import ShowPipes from 'views/pipes/ShowPipes';
import ShowFittings from 'views/fittings/ShowFittings';
import NewStrungPipes from 'views/stringing/StrungPipes';
import WeldingForcast from 'views/welding/weldingForecast';
//import singleVbutt from 'views/welding/singleVbutt';
import CreateTable from 'views/welding/createTable';
import WeldingProcedure from 'views/welding/weldingProcedure';
import PipeGange from 'views/welding/pipeGange/pipeGange';
import FiringLine from 'views/welding/pipeGange/firingLine';
import SingleVbutt from 'views/welding/pipeGange/singleVbutt';

const Dashboard = React.lazy(() => import('views/dashboard/Dashboard'));
// const StrungPipes = React.lazy(() => import('views/stringing/NewStrungPipes'));
const Login = React.lazy(() => import('views/Login'));

const routes: {
  path: string;
  name: string;
  component: ComponentType<any>;
  exact: boolean;
}[] = [
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/login', exact: true, name: 'Login', component: Login },
  { path: '/pipes', exact: true, name: 'Show', component: ShowPipes },
  {
    path: '/pipes/strung',
    exact: true,
    name: 'Show',
    component: NewStrungPipes,
  },
  // {
  //   path: '/pipes/strung/new',
  //   exact: true,
  //   name: 'Show',
  //   component: NewStrungPipes,
  // },
  { path: '/fittings', exact: true, name: 'Fittings', component: ShowFittings },
  {
    path: '/welding/forecast',
    exact: true,
    name: 'Forecast',
    component: WeldingForcast,
  },
  {
    path: '/welding/create-table/:root,:grinding,:hot,:buffing,:second',
    exact: true,
    name: 'Create Table',
    component: CreateTable,
  },
  {
    path: '/welding/pipe-gange',
    exact: true,
    name: 'PipeGange',
    component: PipeGange,
  },
  {
    path: '/welding/firing-line',
    exact: true,
    name: 'PipeGange',
    component: FiringLine,
  },
  {
    path: '/welding/single-vbutt-weld',
    exact: true,
    name: 'SingVbuttWeld',
    component: SingleVbutt,
  },
  {
    path: '/welding-procedure',
    exact: true,
    name: 'Welding Procedure',
    component: WeldingProcedure,
  },
];

export default routes;
