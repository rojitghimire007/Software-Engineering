import environmental from 'img/environmental.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'General',
      image: environmental,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Right-of-way Width',
      image: environmental,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Clearing',
      image: environmental,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Grading',
        image: environmental,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Access Roads',
        image: environmental,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Residential Area',
        image: environmental,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Trenching',
        image: environmental,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Backfilling Specifications',
        image: environmental,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'HydrostaticTesting',
        image: environmental,
    },
  ];


const UplandAndConstruction = () => {
    return (
        SubCarousel(links)
    );
}
export default UplandAndConstruction;