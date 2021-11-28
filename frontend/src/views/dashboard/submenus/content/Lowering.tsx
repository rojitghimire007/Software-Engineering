import lowering from 'img/lowering.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Lowering Equipment',
      image: lowering,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Lowering Equipment',
        image: lowering,
      },
  ];

const Lowering = () => {
    return (
        SubCarousel(links)
    );
}
export default Lowering;