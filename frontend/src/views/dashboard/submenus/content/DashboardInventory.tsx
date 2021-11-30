import inventoryImg from 'img/MaterialInventory.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'Material Inventory',
      link: '/dashboard/inventory/materialInventory',
      id: 'Material Inventory',
      image: inventoryImg,
    },
    {
      parent: 'Material Inventory',
      link: '/',
      id: 'Purchase Order',
      image: inventoryImg,
    },
    {
      parent: 'Material Inventory',
      link: '/',
      id: 'Manufacturer Manuals',
      image: inventoryImg,
    },
    {
      parent: 'Material Inventory',
      link: '/',
      id: 'Truck Tickets',
      image: inventoryImg,
    },
    {
      parent: 'Material Inventory',
      link: '/dashboard/MTRS',
      id: 'MTRS',
      image: inventoryImg,
    },
    {
      parent: 'Material Inventory',
      link: '/',
      id: 'Drops (Cuts)',
      image: inventoryImg,
    },
    {
      parent: 'Material Inventory',
      link: '/',
      id: 'Un-used Material',
      image: inventoryImg,
    },
    {
      parent: 'Material Inventory',
      link: '/',
      id: 'Material Disposal',
      image: inventoryImg,
    },
    {
      parent: 'Material Inventory',
      link: '/',
      id: 'Material Report',
      image: inventoryImg,
    },
  ];


const DashboardInventory = () => {
    return (
        SubCarousel(links)
    );
}
export default DashboardInventory;