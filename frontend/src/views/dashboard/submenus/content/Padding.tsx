import padding from 'img/padding.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Screen Dirt',
      image: padding,
    },
    {
      parent: 'ConstructionTeam',
      link: '/bending',
      id: 'Sand Bags',
      image: padding,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Spray Foam',
      image: padding,
    },
  ];

const Padding = () => {
    return (
        SubCarousel(links)
    );
}
export default Padding;