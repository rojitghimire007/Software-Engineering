import React, { ComponentType } from 'react';
import ShowPipes from 'views/pipes/ShowPipes';
import ShowFittings from 'views/fittings/ShowFittings';
import NewStrungPipes from 'views/stringing/StrungPipes';
import ProjectsPage from 'views/administrative/ProjectsPage';
import ProjectSelect from 'views/ProjectSelect';
import AboutUs from 'views/information/AboutUs';
import ContactUs from 'views/information/ContactUs';

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
  { path: '/about', exact: true, name: 'About', component: AboutUs },
  { path: '/contact', exact: true, name: 'Contact', component: ContactUs },
  // {
  //   path: '/pipes/strung/new',
  //   exact: true,
  //   name: 'Show',
  //   component: NewStrungPipes,
  // },
  { path: '/fittings', exact: true, name: 'Fittings', component: ShowFittings },
];

export default routes;
