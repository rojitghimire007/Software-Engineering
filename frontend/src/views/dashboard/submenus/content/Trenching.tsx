import trenching from 'img/trenching.png';
import SubCarousel from '../SubCarousel';


const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Excavator',
      image: trenching,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Ditching Machine',
      image: trenching,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Blasting',
      image: trenching,
    },
  ];

const Trenching = () => {
    return (
        SubCarousel(links)
    );
}
export default Trenching;