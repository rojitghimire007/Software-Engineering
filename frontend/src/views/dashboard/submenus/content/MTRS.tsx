import inventoryImg from 'img/MaterialInventory.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'Material Inventory',
      link: '/',
      id: 'Actuator',
      image: inventoryImg,
    },
    {
      parent: 'Material Inventory',
      link: '/',
      id: 'Valves Certs',
      image: inventoryImg,
    },
    {
      parent: 'Database Log',
      link: '/',
      id: 'Closures',
      image: inventoryImg,
    },
    {
        parent: 'Database Log',
        link: '/',
        id: 'Flange Insulation Kits-Joints-Certs',
        image: inventoryImg,
      },
      {
        parent: 'Database Log',
        link: '/',
        id: 'MTRS for Bolts',
        image: inventoryImg,
      },
      {
        parent: 'Database Log',
        link: '/',
        id: 'MTRS for Caps',
        image: inventoryImg,
      },
      {
        parent: 'Database Log',
        link: '/',
        id: 'MTRS for Fittings',
        image: inventoryImg,
      },
      {
        parent: 'Database Log',
        link: '/',
        id: 'MTRS for Gaskets and Gasket Kits',
        image: inventoryImg,
      },
      {
        parent: 'Database Log',
        link: '/',
        id: 'MTRS for Hex Plugs',
        image: inventoryImg,
      },
      {
        parent: 'Database Log',
        link: '/',
        id: 'MTRS for Nipples',
        image: inventoryImg,
      },
      {
        parent: 'Database Log',
        link: '/',
        id: 'MTRS for Pig Popper',
        image: inventoryImg,
      },
      {
        parent: 'Database Log',
        link: '/',
        id: 'MTRS for Pipe',
        image: inventoryImg,
      },
      {
        parent: 'Database Log',
        link: '/',
        id: 'MTRS for Reducers',
        image: inventoryImg,
      },
      {
        parent: 'Database Log',
        link: '/',
        id: 'MTRS for Tees',
        image: inventoryImg,
      },
      {
        parent: 'Database Log',
        link: '/',
        id: 'O-Lets',
        image: inventoryImg,
      },
      {
        parent: 'Database Log',
        link: '/',
        id: 'Pipe Supports',
        image: inventoryImg,
      },
      {
        parent: 'Database Log',
        link: '/',
        id: 'Shafer Operator',
        image: inventoryImg,
      },
      {
        parent: 'Database Log',
        link: '/',
        id: 'Stopple',
        image: inventoryImg,
      },
  ];


  const MTRS = () => {
    return (
        SubCarousel(links)
    );
}
export default MTRS;