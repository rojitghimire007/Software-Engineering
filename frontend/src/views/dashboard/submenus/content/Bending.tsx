import bending from 'img/Bending.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Bending Equipment',
      image: bending,
    },
    {
      parent: 'ConstructionTeam',
      link: '/bending',
      id: 'Bending Report',
      image: bending,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Engineer Notes',
      image: bending,
    },
  ];

const Bending = () => {
    return (
        SubCarousel(links)
    );
}
export default Bending;