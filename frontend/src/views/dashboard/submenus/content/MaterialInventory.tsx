import inventoryImg from 'img/MaterialInventory.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'Material Inventory',
      link: '/pipes',
      id: 'Pipes',
      image: inventoryImg,
    },
    {
      parent: 'Material Inventory',
      link: '/fittings',
      id: 'Fittings',
      image: inventoryImg,
    },
    {
      parent: 'Database Log',
      link: '/aggregate',
      id: 'Database Log',
      image: inventoryImg,
    },
  ];


  const MaterialInventory = () => {
    return (
        SubCarousel(links)
    );
}
export default MaterialInventory;