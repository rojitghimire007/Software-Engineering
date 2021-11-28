import safety from 'img/safety.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'PPE',
      image: safety,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'OQ\'s',
      image: safety,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Hot Work Permits',
      image: safety,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Write ups',
        image: safety,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Incident Reports',
        image: safety,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Air Monitoring',
        image: safety,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Good Catch',
        image: safety,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'First Aid',
        image: safety,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Safety Topic',
        image: safety,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'MSDS',
        image: safety,
      },
  ];

const Safety = () => {
    return (
        SubCarousel(links)
    );
}
export default Safety;