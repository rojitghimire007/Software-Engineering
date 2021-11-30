import safety from 'img/safety.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Mechanical',
      image: safety,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Electrical',
        image: safety,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Pressure',
        image: safety,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Tempurature',
        image: safety,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Chemical',
        image: safety,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Biological',
        image: safety,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Radiation',
        image: safety,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Sound',
        image: safety,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Gravity',
        image: safety,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Motion',
        image: safety,
      },
  ];

const SafetyTopic = () => {
    return (
        SubCarousel(links)
    );
}
export default SafetyTopic;