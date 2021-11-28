import xray from 'img/MaterialInventory.png';
import SubCarousel from '../SubCarousel';


const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'X-Ray Equipment Spec',
      image: xray,
    },
    {
      parent: 'ConstructionTeam',
      link: '/bending',
      id: 'X-Ray Report',
      image: xray,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'X-Ray Film',
      image: xray,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Liquid Penetrants',
        image: xray,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Magnetic Particles',
        image: xray,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Untested Welds',
        image: xray,
      },
  ];


const XRay = () => {
    return (
        SubCarousel(links)
    );
}
export default XRay;