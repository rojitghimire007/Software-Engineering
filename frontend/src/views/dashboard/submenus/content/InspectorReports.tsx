import inspectorReports from 'img/inspectorReports.png';
import excel from 'img/excel.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/dashboard/chiefReports',
      id: 'Chief Reports',
      image: inspectorReports,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Assistance Chief Reports',
      image: inspectorReports,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Environmental Inspector Reports',
      image: inspectorReports,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Utility Inspector Reports',
        image: inspectorReports,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Welding Inspector Reports',
        image: inspectorReports,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Coating Inspector Reports',
        image: inspectorReports,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Safety Inspector Reports',
        image: inspectorReports,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Electrical Inspector Reports',
        image: inspectorReports,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Concrete Inspector Reports',
        image: inspectorReports,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Poly Inspector Reports',
        image: inspectorReports,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Tank Inspectors',
        image: inspectorReports,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Material Inspector Reports',
        image: inspectorReports,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Hydrostatic Testing Inspector Reports',
        image: inspectorReports,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Road Inspector Report',
        image: inspectorReports,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'HDD Inspector Report',
        image: inspectorReports,
      },
      {
        parent: 'ConstructionTeam',
        link: 'https://docs.google.com/spreadsheets/d/1Rl6n8eeJU3vueVUqDRQwM6QgqP8lqBit/edit#gid=797439740',
        id: 'Blank CPG Photo Report.xls',
        image: excel,
      },
      {
        parent: 'ConstructionTeam',
        link: 'https://docs.google.com/spreadsheets/d/1Fsg-Gf3-kFu8GYG-2XMN6rBl8hGl3qbf/edit#gid=1424690196',
        id: 'Blank Qualified Welding Personnel.xlsx',
        image: excel,
      },
      {
        parent: 'ConstructionTeam',
        link: 'https://docs.google.com/spreadsheets/d/1hILrv5AaGSo5RtKsD5upiGV6DHqS_kL6/edit#gid=835424141',
        id: 'Utility Inspector Report.xlsx',
        image: excel,
      },
      {
        parent: 'ConstructionTeam',
        link: 'https://docs.google.com/spreadsheets/d/1rBxSfqyTpxqnkB3ILv3g_-f-j_x8QYjo/edit#gid=1271156030',
        id: 'Welding Inspector Daily.xlsx',
        image: excel,
      },
  ];

const InspectorReports = () => {
    return (
        SubCarousel(links)
    );
}
export default InspectorReports;