import pigs from 'img/pigs.png';
import SubCarousel from '../SubCarousel';


const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Cleaning Pig',
      image: pigs,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Brush Pig',
      image: pigs,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Scraper Pig',
      image: pigs,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Dependent Hydraulic Pig',
        image: pigs,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Hydraulic Activated Power Pig',
        image: pigs,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Sealing Pig',
        image: pigs,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Mandrel Pig',
        image: pigs,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Foam Pig',
        image: pigs,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Solid Cast Pig',
        image: pigs,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Spherical Pig',
        image: pigs,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Plugs',
        image: pigs,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Gel Pig',
        image: pigs,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Pig Reports',
        image: pigs,
      },
  ];

const Pigs = () => {
    return (
        SubCarousel(links)
    );
}
export default Pigs;