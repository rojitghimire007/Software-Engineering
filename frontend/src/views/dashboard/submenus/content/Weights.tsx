import weights from 'img/padding.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Concrete Weights',
      image: weights,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Saddle Weights',
        image: weights,
      },
  ];

const Weights = () => {
    return (
        SubCarousel(links)
    );
}
export default Weights;