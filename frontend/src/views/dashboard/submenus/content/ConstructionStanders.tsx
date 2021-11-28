import constructionStanders from 'img/constructionStanders.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionStanders',
      link: '/',
      id: 'Archive Drawing',
      image: constructionStanders,
    },
    {
      parent: 'ConstructionStanders',
      link: '/',
      id: 'Inventory Maps',
      image: constructionStanders,
    },
    {
      parent: 'ConstructionStanders',
      link: '/',
      id: 'Construction Drawing',
      image: constructionStanders,
    },
  ];


const ConstructionStanders = () => {
    return (
        SubCarousel(links)
    );
}
export default ConstructionStanders;