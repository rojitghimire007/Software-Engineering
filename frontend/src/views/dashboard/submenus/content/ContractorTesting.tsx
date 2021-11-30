import constructionTeam from 'img/constructionTeam.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Construction Team Tracking',
      image: constructionTeam,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Equipment Tracking',
      image: constructionTeam,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Operator Qualification Tracking',
      image: constructionTeam,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'OQ\'s',
        image: constructionTeam,
      },
  ];

const ContractorTesting = () => {
    return (
        SubCarousel(links)
    );
}
export default ContractorTesting;