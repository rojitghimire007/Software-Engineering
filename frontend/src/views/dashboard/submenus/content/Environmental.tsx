import environmental from 'img/environmental.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Upland and Construction',
      image: environmental,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Stream and Wetland Crossings',
      image: environmental,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Spill Prevention, Containment and Control',
      image: environmental,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Maintenance',
        image: environmental,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Environmental Construction Management and Inspection',
        image: environmental,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Emergency Construction',
        image: environmental,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Winter Season Construction Plan',
        image: environmental,
},
  ];


const Environmental = () => {
    return (
        SubCarousel(links)
    );
}
export default Environmental;