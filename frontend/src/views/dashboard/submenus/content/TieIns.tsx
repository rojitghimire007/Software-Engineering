import overviewOfConstruction from 'img/overviewOfConstruction.png';
import SubCarousel from '../SubCarousel';


const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Road Crossings',
      image: overviewOfConstruction,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Road Bores (slick bores)',
      image: overviewOfConstruction,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Water Crossings',
      image: overviewOfConstruction,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Induction Bends',
        image: overviewOfConstruction,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Test Sections',
        image: overviewOfConstruction,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Surface Facilities',
        image: overviewOfConstruction,
      },
  ];

const TieIns = () => {
    return (
        SubCarousel(links)
    );
}
export default TieIns;