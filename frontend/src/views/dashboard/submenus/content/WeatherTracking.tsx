import weatherTracking from 'img/weatherTracking.png';
import excel from 'img/excel.jpg';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Weather Tracking.xlsx',
      image: excel,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Weather Tracking.xlsx',
        image: excel,
    },

  ];

const WeatherTracking = () => {
    return (
        SubCarousel(links)
    );
}
export default WeatherTracking;