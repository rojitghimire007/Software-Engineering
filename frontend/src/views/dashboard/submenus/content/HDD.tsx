import hdd from 'img/hdd.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Road Crossing',
      image: hdd,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Railroad Crossing',
      image: hdd,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Wetland Crossing',
      image: hdd,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'River Crossing',
        image: hdd,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Stream Crossing',
        image: hdd,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Equipment',
        image: hdd,
      },
  ];


const HDD = () => {
    return (
        SubCarousel(links)
    );
}
export default HDD;