import React, { ComponentType } from 'react';
import ShowPipes from 'views/pipes/ShowPipes';
import ShowFittings from 'views/fittings/ShowFittings';
import NewStrungPipes from 'views/stringing/StrungPipes';
import ProjectsPage from 'views/administrative/ProjectsPage';
import ProjectSelect from 'views/ProjectSelect';
import AboutUs from 'views/information/AboutUs';
import ContactUs from 'views/information/ContactUs';
import TESTING from 'views/TESTING';
import StrungItems from 'views/stringing/StrungItems';
import CreateProject from 'views/administrative/createProject'
import DashboardInventory from 'views/dashboard/submenus/DashboardInventory';
import Services from 'views/information/Services';
import { tableFooterClasses } from '@mui/material';
import Footer from 'components/Footer';
import Privacy from 'views/information/Privacy';

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
  { path: '/project-select', exact: true, name: 'Project Select', component: ProjectSelect, },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/dashboard/inventory', exact: true, name: 'Dashboard', component: DashboardInventory },
  { path: '/login', exact: true, name: 'Login', component: Login },
  { path: '/pipes', exact: true, name: 'Show', component: ShowPipes },
  {
    path: '/pipes/strung',
    exact: true,
    name: 'Show',
    component: NewStrungPipes,
  },
  {
    path: '/pipes/strung/new',
    exact: true,
    name: 'Show',
    component: StrungItems,
  },
  { path: '/about', exact: true, name: 'About', component: AboutUs },
  { path: '/contact', exact: true, name: 'Contact', component: ContactUs },
  { path: '/services', exact: true, name: 'Services', component: Services },
  { path: '/privacy', exact: true, name: 'Privacy', component: Privacy },
  // {
  //   path: '/pipes/strung/new',
  //   exact: true,
  //   name: 'Show',
  //   component: NewStrungPipes,
  // },
  { path: '/fittings', exact: true, name: 'Fittings', component: ShowFittings },
  { path: '/testing', exact: true, name: 'TESTING', component: TESTING },
  { path: '/create-project', exact: true, name: 'Create Project', component: CreateProject},
];

export default routes;
