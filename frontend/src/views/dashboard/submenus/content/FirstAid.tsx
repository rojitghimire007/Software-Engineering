import safety from 'img/safety.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: 'https://drive.google.com/drive/folders/14nVrbS2FrwQN90uqjzFz_RlIa9ILesr1',
      id: 'Material Safety Data.pdf',
      image: safety,
    },
    {
      parent: 'ConstructionTeam',
      link: 'https://drive.google.com/drive/folders/14nVrbS2FrwQN90uqjzFz_RlIa9ILesr1',
      id: 'Material Safety Data.pdf',
      image: safety,
    },
  ];

const FirstAid = () => {
    return (
        SubCarousel(links)
    );
}
export default FirstAid;