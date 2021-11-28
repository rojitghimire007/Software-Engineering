import needsAnalysis from 'img/needsAnalysis.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'NeedsAnalysis',
      link: '/',
      id: 'Needs Analysis',
      image: needsAnalysis,
    },
    {
      parent: 'NeedsAnalysis',
      link: '/',
      id: 'Open Seasons',
      image: needsAnalysis,
    },
    {
      parent: 'NeedsAnalysis',
      link: '/',
      id: 'Corridor Analysis',
      image: needsAnalysis,
    },
  ];


const NeedsAnalysis = () => {
    return (
        SubCarousel(links)
    );
}
export default NeedsAnalysis;