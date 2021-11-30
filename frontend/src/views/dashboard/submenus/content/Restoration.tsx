import restoration from 'img/restoration.png';
import SubCarousel from '../SubCarousel';


const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Replacing Sub-Soil',
      image: restoration,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Replace Topsoil',
      image: restoration,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'De-Compact',
      image: restoration,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Fertilzer',
        image: restoration,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Seeding',
        image: restoration,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Strawing',
        image: restoration,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Dirt',
        image: restoration,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Rock',
        image: restoration,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Fences and Gates',
        image: restoration,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Erosion Control',
        image: restoration,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Land Owner Report',
        image: restoration,
      },
  ];

const Restoration = () => {
    return (
        SubCarousel(links)
    );
}
export default Restoration;