import constructionTeam from 'img/constructionTeam.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Pipeline Contractor',
      image: constructionTeam,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Clearing Contractor',
      image: constructionTeam,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'X-Ray Contractor',
      image: constructionTeam,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Testing Contractor',
        image: constructionTeam,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Speeding Contractor',
        image: constructionTeam,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Painting Contractor',
        image: constructionTeam,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Fencing Contractor',
        image: constructionTeam,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
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