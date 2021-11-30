import projectAuthorization from 'img/projectAuthorization.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ProjectAuthorization',
      link: '/',
      id: 'FERC Pre-Filing Process',
      image: projectAuthorization,
    },
    {
      parent: 'ProjectAuthorization',
      link: '/',
      id: 'Pre-Construction Surveys',
      image: projectAuthorization,
    },
    {
      parent: 'ProjectAuthorization',
      link: '/',
      id: 'Application to FERC',
      image: projectAuthorization,
    },
    {
        parent: 'ProjectAuthorization',
        link: '/',
        id: 'Right-of-Way Acquisition',
        image: projectAuthorization,
    },
    {
        parent: 'ProjectAuthorization',
        link: '/',
        id: 'Notice to Proceed',
        image: projectAuthorization,
    },
    {
        parent: 'ProjectAuthorization',
        link: '/',
        id: 'Blanket Certificate Process',
        image: projectAuthorization,
    },
  ];


const ProjectAuthorization = () => {
    return (
        SubCarousel(links)
    );
}
export default ProjectAuthorization;