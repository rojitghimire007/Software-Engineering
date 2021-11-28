import gpsSurvey from 'img/gpsSurvey.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Route - Alignment Surveys',
      image: gpsSurvey,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Boundry and Monument Surveys',
      image: gpsSurvey,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Encroachment Surveys',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Depth of Cover (DOC) Surveys',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Construction Staking',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'As-Built Surveys',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Weld Mapping',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Valves',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Fences',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Certified Easement Plats',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Crossings Surveys',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Utility Crossings Surveys',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Cathodic Protection',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Pipeline Markers',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Test Station',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Surveying Silk Fence',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Surveying Super Fence',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Mates',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Water Bars',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Air Bridges',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Abandonment',
        image: gpsSurvey,
      },
  ];


const GPSSurvey = () => {
    return (
        SubCarousel(links)
    );
}
export default GPSSurvey;