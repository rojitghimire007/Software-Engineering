import inspectorReports from 'img/inspectorReports.png';
import excel from 'img/excel.jpg';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
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
        link: '/',
        id: 'Blank CPG Photo Report.xls',
        image: excel,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Blank Qualified Welding Personnel.xlsx',
        image: excel,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Utility Inspector Report.xlsx',
        image: excel,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
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