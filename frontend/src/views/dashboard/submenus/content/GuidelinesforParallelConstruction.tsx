import guidelines from 'img/guidelines.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'GuidelinesForParallelConstruction',
      link: '/',
      id: 'Encroachment Area',
      image: guidelines,
    },
    {
      parent: 'GuidelinesForParallelConstruction',
      link: '/',
      id: 'Designated Contact',
      image: guidelines,
    },
  ];


const GuidelinesForParallelConstruction = () => {
    return (
        SubCarousel(links)
    );
}
export default GuidelinesForParallelConstruction;