import clearing from 'img/clearing.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Tree Falling',
      image: clearing,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Clearing and Chipping',
      image: clearing,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Grubbing and Grinding',
      image: clearing,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Timber Mat Hauling',
        image: clearing,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Timber Mat Installation',
        image: clearing,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Fencing',
        image: clearing,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Utility Relocate',
        image: clearing,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Demolition',
        image: clearing,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Disposal',
        image: clearing,
    },
  ];


const Clearing = () => {
    return (
        SubCarousel(links)
    );
}
export default Clearing;