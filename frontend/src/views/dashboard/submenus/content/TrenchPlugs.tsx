import trenchPlugs from 'img/Bending.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Spray Foam',
      image: trenchPlugs,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Sand Bags',
      image: trenchPlugs,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Gravel Bags',
      image: trenchPlugs,
    },
  ];

const TrenchPlugs = () => {
    return (
        SubCarousel(links)
    );
}
export default TrenchPlugs;