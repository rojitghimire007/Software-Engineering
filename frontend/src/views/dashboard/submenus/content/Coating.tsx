import coating from 'img/Coating.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/coating',
      id: 'Pipe Coating Spec',
      image: coating,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Weld Coating Spec',
      image: coating,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Coating Reports',
      image: coating,
    },
  ];

const Coating = () => {
    return (
        SubCarousel(links)
    );
}
export default Coating;