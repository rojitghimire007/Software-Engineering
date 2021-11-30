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
import CreateProject from "views/administrative/CreateProject";
import DashboardInventory from "views/dashboard/submenus/content/DashboardInventory";
import BendInfo from "views/bending/BendInfo";
import MasterLog from "views/masterLog/MasterLog";
import ListUser from "views/userListProj/ListUser";
import NeedsAnalysis from "views/dashboard/submenus/content/NeedsAnalysis";
import ProjectAuthorization from "views/dashboard/submenus/content/ProjectAuthorization";
import OverviewOfConstruction from "views/dashboard/submenus/content/OverviewOfConstruction";
import SpecialConstructionTechnique from "views/dashboard/submenus/content/SpecialConstructionTechnique";
import GuidlinesForParallelConstruction from "views/dashboard/submenus/content/GuidelinesforParallelConstruction";
import ConstructionStanders from "views/dashboard/submenus/content/ConstructionStanders";
import ConstructionTeam from "views/dashboard/submenus/content/ConstructionTeam";
import Permits from "views/dashboard/submenus/content/Permits";
import Environmental from "views/dashboard/submenus/content/Environmental";
import Clearing from "views/dashboard/submenus/content/Clearing";
import Grading from "views/dashboard/submenus/content/Grading";
import MaterialInventory from "views/dashboard/submenus/content/MaterialInventory";
import GPSSurvey from "views/dashboard/submenus/content/GPSSurvey";
import Trenching from "views/dashboard/submenus/content/Trenching";
import HDD from "views/dashboard/submenus/content/HDD";
import Bending from "views/dashboard/submenus/content/Bending";
import Welding from "views/dashboard/submenus/content/Welding";
import XRay from "views/dashboard/submenus/content/XRay";
import Stringing from "views/dashboard/submenus/content/Stringing";
import Blasting from "views/dashboard/submenus/content/Blasting";
import Coating from "views/dashboard/submenus/content/Coating";
import Padding from "views/dashboard/submenus/content/Padding";
import TrenchPlugs from "views/dashboard/submenus/content/TrenchPlugs";
import Lowering from "views/dashboard/submenus/content/Lowering";
import Weights from "views/dashboard/submenus/content/Weights";
import HydrostaticTesting from "views/dashboard/submenus/content/HydrostaticTesting";
import Restoration from "views/dashboard/submenus/content/Restoration";
import Pigs from "views/dashboard/submenus/content/Pigs";
import InspectorReports from "views/dashboard/submenus/content/InspectorReports";
import Safety from "views/dashboard/submenus/content/Safety";
import WeatherTracking from "views/dashboard/submenus/content/WeatherTracking";
import Menu from "views/dashboard/submenus/content/Menu";
import PipeCutting from "views/cutting/PipeCutting";
import TieIns from "views/dashboard/submenus/content/TieIns";
import ContractorPipline from "views/dashboard/submenus/content/ContractorPipeline";
import ContractorClearing from "views/dashboard/submenus/content/ContractorClearing";
import ContractorXRay from "views/dashboard/submenus/content/ContractorXray";
import ContractorTesting from "views/dashboard/submenus/content/ContractorTesting";
import ContractorSeeding from "views/dashboard/submenus/content/ContractorSeeding";
import ContractorPainting from "views/dashboard/submenus/content/ContractorPainting";
import ContractorFencing from "views/dashboard/submenus/content/ContractorFencing";
import ContractorRoad from "views/dashboard/submenus/content/ContractorRoad";
import UplandAndConstruction from "views/dashboard/submenus/content/UplandAndConstruction";
import MTRS from "views/dashboard/submenus/content/MTRS";
import ChiefReports from "views/dashboard/submenus/content/ChiefReports";
import FirstAid from "views/dashboard/submenus/content/FirstAid";
import SafetyTopic from "views/dashboard/submenus/content/SafetyTopic";
import PipeAndSteelDimensions from "views/dashboard/submenus/content/PipeAndSteelDimensions";

// const StrungPipes = React.lazy(() => import('views/stringing/NewStrungPipes'));
import SignUpUser from "views/administrative/SignUpUser";
import Weld from "views/welding/Weld";
import WeldingForcast from "views/welding/weldingForecast";
import CreateTable from "views/welding/createTable";
import PipeGange from "views/welding/pipeGange/pipeGange";
import SingleVbutt from "views/welding/pipeGange/singleVbutt";
import FiringLine from "views/welding/pipeGange/firingLine";
import WeldingProcedure from "views/welding/weldingProcedure";
import Services from "views/information/Services";
import Training from "views/information/Training";
import Careers from "views/information/Careers";

const Dashboard = React.lazy(() => import("views/dashboard/Dashboard"));
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
  {
    path: "/dashboard/blasting",
    exact: true,
    name: "Blasting",
    component: Blasting,
  },
  {
    path: "/dashboard/coating",
    exact: true,
    name: "Coating",
    component: Coating,
  },
  {
    path: "/dashboard/padding",
    exact: true,
    name: "Padding",
    component: Padding,
  },
  {
    path: "/dashboard/trenchPlugs",
    exact: true,
    name: "TrenchPlugs",
    component: TrenchPlugs,
  },
  {
    path: "/dashboard/lowering",
    exact: true,
    name: "Lowering",
    component: Lowering,
  },
  {
    path: "/dashboard/weights",
    exact: true,
    name: "Weights",
    component: Weights,
  },
  {
    path: "/dashboard/hydrostaticTesting",
    exact: true,
    name: "HydrostaticTesting",
    component: HydrostaticTesting,
  },
  {
    path: "/dashboard/restoration",
    exact: true,
    name: "Restoration",
    component: Restoration,
  },
  {
    path: "/dashboard/pigs",
    exact: true,
    name: "Pigs",
    component: Pigs,
  },
  {
    path: "/dashboard/inspectorReports",
    exact: true,
    name: "InspectorReports",
    component: InspectorReports,
  },
  {
    path: "/dashboard/safety",
    exact: true,
    name: "Safety",
    component: Safety,
  },
  {
    path: "/dashboard/weatherTracking",
    exact: true,
    name: "WeatherTracking",
    component: WeatherTracking,
  },
  {
    path: "/dashboard/menu",
    exact: true,
    name: "Menu",
    component: Menu,
  },
  {
    path: "/dashboard/tieIns",
    exact: true,
    name: "TieIns",
    component: TieIns,
  },
  {
    path: "/dashboard/contractorPipeline",
    exact: true,
    name: "ContractorPipeline",
    component: ContractorPipline,
  },
  {
    path: "/dashboard/contractorClearing",
    exact: true,
    name: "ContractorClearing",
    component: ContractorClearing,
  },
  {
    path: "/dashboard/contractorXRay",
    exact: true,
    name: "ContractorXRay",
    component: ContractorXRay,
  },
  {
    path: "/dashboard/contractorTesting",
    exact: true,
    name: "ContractorTesting",
    component: ContractorTesting,
  },
  {
    path: "/dashboard/contractorSeeding",
    exact: true,
    name: "ContractorSeeding",
    component: ContractorSeeding,
  },
  {
    path: "/dashboard/contractorPainting",
    exact: true,
    name: "ContractorPainting",
    component: ContractorPainting,
  },
  {
    path: "/dashboard/contractorFencing",
    exact: true,
    name: "ContractorFencing",
    component: ContractorFencing,
  },
  {
    path: "/dashboard/contractorRoad",
    exact: true,
    name: "ContractorRoad",
    component: ContractorRoad,
  },
  {
    path: "/dashboard/uplandAndConstruction",
    exact: true,
    name: "UplandAndConstruction",
    component: UplandAndConstruction,
  },
  {
    path: "/dashboard/MTRS",
    exact: true,
    name: "MTRS",
    component: MTRS,
  },
  {
    path: "/dashboard/chiefReports",
    exact: true,
    name: "ChiefReports",
    component: ChiefReports,
  },
  {
    path: "/dashboard/firstAid",
    exact: true,
    name: "FirstAid",
    component: FirstAid,
  },
  {
    path: "/dashboard/safetyTopic",
    exact: true,
    name: "SafetyTopic",
    component: SafetyTopic,
  },
  {
    path: "/dashboard/pipeAndSteelDimensions",
    exact: true,
    name: "PipeAndSteelDimensions",
    component: PipeAndSteelDimensions,
  },
  {
    path: "/stringing/cutting",
    exact: true,
    name: "Cutting",
    component: PipeCutting,
  },



  { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard },
  {
    path: "/dashboard/inventory",
    exact: true,
    name: "Dashboard",
    component: DashboardInventory,
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
  { path: "/about", exact: true, name: "About", component: AboutUs },
  { path: "/contact", exact: true, name: "Contact", component: ContactUs },
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
  {
    path:"/create/user",
    exact: true,
    name: "SignUp",
    component: SignUpUser
  },
  {
    path:"/welding",
    exact: true,
    name: "Welding",
    component: Weld
  },
  {
    path:"/cutting",
    exact: true,
    name: "Welding",
    component: PipeCutting
  },
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
  {
    path: '/services',
    exact: true,
    name: 'Services',
    component: Services,
  },
  {
    path: '/training',
    exact: true,
    name: 'Training',
    component: Training,
  },
  {
    path: '/careers',
    exact: true,
    name: 'Careers',
    component: Careers,
  },
  {
    path: '/contact',
    exact: true,
    name: 'Contact',
    component: ContactUs,
  },
];

export default routes;
