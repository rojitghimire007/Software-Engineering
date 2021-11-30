import inspectorReports from 'img/inspectorReports.png';
import excel from 'img/excel.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: 'https://docs.google.com/spreadsheets/d/1PPNmnRgFs1IcTzp9j-8tKeQkUtDtTdxf/edit#gid=233097638',
      id: 'Risk Manager Report.xlsx',
      image: excel,
    },
    {
        parent: 'ConstructionTeam',
        link: 'https://docs.google.com/spreadsheets/d/1PPNmnRgFs1IcTzp9j-8tKeQkUtDtTdxf/edit#gid=233097638',
        id: 'Risk Manager Report.xlsx',
        image: excel,
    },
 
  ];

const ChiefReports = () => {
    return (
        SubCarousel(links)
    );
}
export default ChiefReports;