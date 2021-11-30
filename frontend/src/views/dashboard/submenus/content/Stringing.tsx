import stringing from 'img/Stringing.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/pipes/strung/new',
      id: 'Stringing',
      image: stringing,
    },
    {
      parent: 'ConstructionTeam',
      link: '/stringing/cutting',
      id: 'Cutting',
      image: stringing,
    },
    {
      parent: 'ConstructionTeam',
      link: '/dashboard/xray',
      id: 'X-Ray',
      image: stringing,
    },
  ];


const Stringing = () => {
    return (
        SubCarousel(links)
    );
}
export default Stringing;