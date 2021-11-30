import welding from 'img/Welding.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Welder Test Card',
      image: welding,
    },
    {
      parent: 'ConstructionTeam',
      link: '/welding',
      id: 'Repair Welds',
      image: welding,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Cut-Outs',
      image: welding,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Tie-ins',
        image: welding,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Fabrication Drawing',
        image: welding,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Fabrication Pictures',
        image: welding,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Weld Photos',
        image: welding,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Weld Waiver Request',
        image: welding,
      },
      {
        parent: 'ConstructionTeam',
        link: '/welding/forecast',
        id: 'Welder Stats',
        image: welding,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Welding Productivity',
        image: welding,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Welding Equipment',
        image: welding,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Welding Procedure',
        image: welding,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Welding Electrode MSDS',
        image: welding,
      },
  ];


const Welding = () => {
    return (
        SubCarousel(links)
    );
}
export default Welding;