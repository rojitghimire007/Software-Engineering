import specialConstructionTechnique from 'img/specialConstructionTechnique.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'SpecialConstructionTechnique',
      link: '/',
      id: 'Open Cut River and Stream Crossing',
      image: specialConstructionTechnique,
    },
    {
      parent: 'SpecialConstructionTechnique',
      link: '/',
      id: 'Horizontal Directional Drilling',
      image: specialConstructionTechnique,
    },
    {
      parent: 'SpecialConstructionTechnique',
      link: '/',
      id: 'Wetlands',
      image: specialConstructionTechnique,
    },
    {
        parent: 'SpecialConstructionTechnique',
        link: '/',
        id: 'Residential Areas',
        image: specialConstructionTechnique,
    },
    {
        parent: 'SpecialConstructionTechnique',
        link: '/',
        id: 'Agricultural Areas',
        image: specialConstructionTechnique,
    },
    {
        parent: 'SpecialConstructionTechnique',
        link: '/',
        id: 'Construction on Steep Slopes',
        image: specialConstructionTechnique,
    },
    {
        parent: 'SpecialConstructionTechnique',
        link: '/',
        id: 'Road and Rail Crossings',
        image: specialConstructionTechnique,
    },
    {
        parent: 'SpecialConstructionTechnique',
        link: '/',
        id: 'Material Staging and Contractor Yard',
        image: specialConstructionTechnique,
    },
    {
        parent: 'SpecialConstructionTechnique',
        link: '/',
        id: 'Quality Control and Quality Assurance',
        image: specialConstructionTechnique,
    },
    {
        parent: 'SpecialConstructionTechnique',
        link: '/',
        id: 'Working Atop In-Service Pipelines',
        image: specialConstructionTechnique,
    },
  ];


const SpecialConstructionTechnique = () => {
    return (
        SubCarousel(links)
    );
}
export default SpecialConstructionTechnique;