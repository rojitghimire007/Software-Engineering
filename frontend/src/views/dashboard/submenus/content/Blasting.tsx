import blasting from 'img/trenching.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Equipment',
      image: blasting,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Blasting Media',
      image: blasting,
    },
  ];

const Blasting = () => {
    return (
        SubCarousel(links)
    );
}
export default Blasting;