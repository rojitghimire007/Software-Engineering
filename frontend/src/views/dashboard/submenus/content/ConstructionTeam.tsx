import constructionTeam from 'img/constructionTeam.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/dashboard/contractorPipeline',
      id: 'Pipeline Contractor',
      image: constructionTeam,
    },
    {
      parent: 'ConstructionTeam',
      link: '/dashboard/contractorClearing',
      id: 'Clearing Contractor',
      image: constructionTeam,
    },
    {
      parent: 'ConstructionTeam',
      link: '/dashboard/contractorXRay',
      id: 'X-Ray Contractor',
      image: constructionTeam,
    },
    {
        parent: 'ConstructionTeam',
        link: '/dashboard/contractorTesting',
        id: 'Testing Contractor',
        image: constructionTeam,
    },
    {
        parent: 'ConstructionTeam',
        link: '/dashboard/contractorSeeding',
        id: 'Seeding Contractor',
        image: constructionTeam,
    },
    {
        parent: 'ConstructionTeam',
        link: '/dashboard/contractorPainting',
        id: 'Painting Contractor',
        image: constructionTeam,
    },
    {
        parent: 'ConstructionTeam',
        link: '/dashboard/contractorFencing',
        id: 'Fencing Contractor',
        image: constructionTeam,
    },
    {
        parent: 'ConstructionTeam',
        link: '/dashboard/contractorRoad',
        id: 'Road Contractor',
        image: constructionTeam,
    },
  ];


  const ConstructionTeam = () => {
    return (
        SubCarousel(links)
    );
}
export default ConstructionTeam;