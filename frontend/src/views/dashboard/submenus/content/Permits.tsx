import permits from 'img/permits.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'One Calls',
      image: permits,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Road Permits',
      image: permits,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Haul Permits',
      image: permits,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Railroad',
        image: permits,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Heavy Haul Map',
        image: permits,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'DOT Escort Program',
        image: permits,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Sound Ordinance',
        image: permits,
},
  ];


const Permits = () => {
    return (
        SubCarousel(links)
    );
}
export default Permits;