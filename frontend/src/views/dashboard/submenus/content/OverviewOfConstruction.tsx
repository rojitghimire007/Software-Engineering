import overviewOfConstruction from 'img/overviewOfConstruction.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'OverviewOfConstruction',
      link: '/',
      id: 'Design of Line Pipe and Equipment',
      image: overviewOfConstruction,
    },
    {
      parent: 'OverviewOfConstruction',
      link: '/',
      id: 'Construction Survey',
      image: overviewOfConstruction,
    },
    {
      parent: 'OverviewOfConstruction',
      link: '/',
      id: 'Trenching',
      image: overviewOfConstruction,
    },
    {
        parent: 'OverviewOfConstruction',
        link: '/',
        id: 'Hauling and Stringing',
        image: overviewOfConstruction,
    },
    {
        parent: 'OverviewOfConstruction',
        link: '/',
        id: 'Pipe Bending',
        image: overviewOfConstruction,
    },
    {
        parent: 'OverviewOfConstruction',
        link: '/',
        id: 'Welding',
        image: overviewOfConstruction,
    },
    {
        parent: 'OverviewOfConstruction',
        link: '/',
        id: 'Coating',
        image: overviewOfConstruction,
    },
    {
        parent: 'OverviewOfConstruction',
        link: '/',
        id: 'Lowering the Pipe into the Trench',
        image: overviewOfConstruction,
    },
    {
        parent: 'OverviewOfConstruction',
        link: '/dashboard/tieIns',
        id: 'Tie-ins',
        image: overviewOfConstruction,
    },
    {
        parent: 'OverviewOfConstruction',
        link: '/',
        id: 'Backfilling',
        image: overviewOfConstruction,
    },
    {
        parent: 'OverviewOfConstruction',
        link: '/',
        id: 'Testing and Initial Interal Inspection',
        image: overviewOfConstruction,
    },
    {
        parent: 'OverviewOfConstruction',
        link: '/',
        id: 'Cleanup and Restoration of Right-of-Way',
        image: overviewOfConstruction,
    },
    {
        parent: 'OverviewOfConstruction',
        link: '/',
        id: 'Environmental Compliance and Monitoring',
        image: overviewOfConstruction,
    },
  ];


const OverviewOfConstruction = () => {
    return (
        SubCarousel(links)
    );
}
export default OverviewOfConstruction;