import inventoryImg from 'img/MaterialInventory.png';
import excel from 'img/excel.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'Contractors Tool Box',
      link: 'https://docs.google.com/spreadsheets/d/1PvsMsQp_bNtryQpfejX7sWW5LDxBZuJ7/edit#gid=1063903106',
      id: 'Pipe Data',
      image: excel,
    },
    {
      parent: 'Contractors Tool Box',
      link: '/',
      id: 'Steel Data',
      image: inventoryImg,
    },
    {
      parent: 'Contractors Tool Box',
      link: '/',
      id: 'Fitting Data',
      image: inventoryImg,
    },
    {
        parent: 'Contractors Tool Box',
        link: '/',
        id: 'Flange Data',
        image: inventoryImg,
      },
      {
        parent: 'Contractors Tool Box',
        link: '/',
        id: 'Nipples Data',
        image: inventoryImg,
      },
      {
        parent: 'Contractors Tool Box',
        link: '/',
        id: 'Olet Data',
        image: inventoryImg,
      },
      {
        parent: 'Contractors Tool Box',
        link: '/',
        id: 'Nuts and Bolts',
        image: inventoryImg,
      },
      {
        parent: 'Contractors Tool Box',
        link: '/',
        id: 'Gaskets',
        image: inventoryImg,
      },
  ];


  const PipeAndSteelDimensions = () => {
    return (
        SubCarousel(links)
    );
}
export default PipeAndSteelDimensions;