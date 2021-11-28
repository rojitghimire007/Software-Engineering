import grading from 'img/grading.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Topsoil Removal',
      image: grading,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Sub-soil Removal',
      image: grading,
    },
  ];


const Grading = () => {
    return (
        SubCarousel(links)
    );
}
export default Grading;