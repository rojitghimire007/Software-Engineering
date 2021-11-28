import React, { ComponentType } from "react";
import ShowPipes from "views/pipes/ShowPipes";
import ShowFittings from "views/fittings/ShowFittings";
import NewStrungPipes from "views/stringing/StrungPipes";
import ProjectsPage from "views/administrative/ProjectsPage";
import ProjectSelect from "views/ProjectSelect";
import AboutUs from "views/information/AboutUs";
import ContactUs from "views/information/ContactUs";
import TESTING from "views/TESTING";
import StrungItems from "views/stringing/StrungItems";
// import oldString from 'views/stringing/StrungItems';
import CreateProject from "views/administrative/createProject";
import DashboardInventory from "views/dashboard/submenus/DashboardInventory";
import BendInfo from "views/bending/BendInfo";
import MasterLog from "views/masterLog/MasterLog";
import ListUser from "views/userListProj/ListUser";
import NeedsAnalysis from "views/dashboard/submenus/NeedsAnalysis";
import ProjectAuthorization from "views/dashboard/submenus/ProjectAuthorization";
import OverviewOfConstruction from "views/dashboard/submenus/OverviewOfConstruction";
import SpecialConstructionTechnique from "views/dashboard/submenus/SpecialConstructionTechnique";
import GuidlinesForParallelConstruction from "views/dashboard/submenus/GuidelinesforParallelConstruction";
import ConstructionStanders from "views/dashboard/submenus/content/ConstructionStanders";
import ConstructionTeam from "views/dashboard/submenus/content/ConstructionTeam";
import Permits from "views/dashboard/submenus/Permits";
import Environmental from "views/dashboard/submenus/Environmental";
import Clearing from "views/dashboard/submenus/content/Clearing";
import Grading from "views/dashboard/submenus/Grading";
import MaterialInventory from "views/dashboard/submenus/MaterialInventory";
import GPSSurvey from "views/dashboard/submenus/GPSSurvey";
import Trenching from "views/dashboard/submenus/content/Trenching";
import HDD from "views/dashboard/submenus/HDD";
import Bending from "views/dashboard/submenus/content/Bending";
import Welding from "views/dashboard/submenus/Welding";
import XRay from "views/dashboard/submenus/XRay";
import Stringing from "views/dashboard/submenus/Stringing";

const Dashboard = React.lazy(() => import("views/dashboard/Dashboard"));
// const StrungPipes = React.lazy(() => import('views/stringing/NewStrungPipes'));
const Login = React.lazy(() => import("views/Login"));

const routes: {
  path: string;
  name: string;
  component: ComponentType<any>;
  exact: boolean;
}[] = [
  { path: "/projects", exact: true, name: "Projects", component: ProjectsPage },
  {
    path: "/project-select",
    exact: true,
    name: "Project Select",
    component: ProjectSelect,
  },

  //Carousel path and SubCarousel Paths
  { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard },
  {
    path: "/dashboard/inventory",
    exact: true,
    name: "Dashboard",
    component: DashboardInventory,
  },
  {
    path: "/dashboard/needsAnalysis",
    exact: true,
    name: "NeedsAnalysis",
    component: NeedsAnalysis,
  },
  {
    path: "/dashboard/projectAuthorization",
    exact: true,
    name: "ProjectAuthorization",
    component: ProjectAuthorization,
  },
  {
    path: "/dashboard/overviewOfConstruction",
    exact: true,
    name: "OverviewOfConstruction",
    component: OverviewOfConstruction,
  },
  {
    path: "/dashboard/specialConstructionTechnique",
    exact: true,
    name: "SpecialConstructionTechnique",
    component: SpecialConstructionTechnique,
  },
  {
    path: "/dashboard/guidelines",
    exact: true,
    name: "GuidelinesForParallelConstruction",
    component: GuidlinesForParallelConstruction,
  },
  {
    path: "/dashboard/constructionStanders",
    exact: true,
    name: "ConstructionStanders",
    component: ConstructionStanders,
  },
  {
    path: "/dashboard/constructionTeam",
    exact: true,
    name: "ConstructionTeam",
    component: ConstructionTeam,
  },
  {
    path: "/dashboard/permits",
    exact: true,
    name: "Permits",
    component: Permits,
  },
  {
    path: "/dashboard/environmental",
    exact: true,
    name: "Environmental",
    component: Environmental,
  },
  {
    path: "/dashboard/clearing",
    exact: true,
    name: "Clearing",
    component: Clearing,
  },
  {
    path: "/dashboard/grading",
    exact: true,
    name: "Grading",
    component: Grading,
  },
  {
    path: "/dashboard/inventory/materialInventory",
    exact: true,
    name: "MaterialInventory",
    component: MaterialInventory,
  },
  {
    path: "/dashboard/gpsSurvey",
    exact: true,
    name: "GPSSurvey",
    component: GPSSurvey,
  },
  {
    path: "/dashboard/trenching",
    exact: true,
    name: "Trenching",
    component: Trenching,
  },
  { path: "/dashboard/hdd", exact: true, name: "HDD", component: HDD },
  {
    path: "/dashboard/bending",
    exact: true,
    name: "Bending",
    component: Bending,
  },
  {
    path: "/dashboard/welding",
    exact: true,
    name: "Welding",
    component: Welding,
  },
  { path: "/dashboard/xray", exact: true, name: "XRay", component: XRay },
  {
    path: "/dashboard/stringing",
    exact: true,
    name: "Stringing",
    component: Stringing,
  },

  { path: "/login", exact: true, name: "Login", component: Login },
  { path: "/pipes", exact: true, name: "Show", component: ShowPipes },
  {
    path: "/pipes/strung",
    exact: true,
    name: "Show",
    component: NewStrungPipes,
  },
  {
    path: "/pipes/strung/new",
    exact: true,
    name: "Show",
    component: StrungItems,
  },
  // {
  //   path: '/pipes/strung/new',
  //   exact: true,
  //   name: 'Show',
  //   component: oldString,
  // },
  { path: "/about", exact: true, name: "About", component: AboutUs },
  { path: "/contact", exact: true, name: "Contact", component: ContactUs },
  //{ path: '/services', exact: true, name: 'Services', component: Services },
  // {
  //   path: '/pipes/strung/new',
  //   exact: true,
  //   name: 'Show',
  //   component: NewStrungPipes,
  // },
  { path: "/fittings", exact: true, name: "Fittings", component: ShowFittings },
  { path: "/testing", exact: true, name: "TESTING", component: TESTING },
  {
    path: "/create-project",
    exact: true,
    name: "Create Project",
    component: CreateProject,
  },
  { path: "/bending", exact: true, name: "Bending", component: BendInfo },
  { path: "/aggregate", exact: true, name: "Aggregate", component: MasterLog },
  {
    path: "/project/user",
    exact: true,
    name: "Project Users",
    component: ListUser,
  },
];

export default routes;
