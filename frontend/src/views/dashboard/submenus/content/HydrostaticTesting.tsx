import hydrostaticTesting from 'img/hydrostaticTesting.png';
import SubCarousel from '../SubCarousel';


const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Testing Equipment Certs',
      image: hydrostaticTesting,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Test Head Certs & Drawings',
      image: hydrostaticTesting,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Water Sources',
      image: hydrostaticTesting,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Water Disposal',
        image: hydrostaticTesting,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Hydrostatic Test Reports',
        image: hydrostaticTesting,
      },
  ];

const HydrostaticTesting = () => {
    return (
        SubCarousel(links)
    );
}
export default HydrostaticTesting;