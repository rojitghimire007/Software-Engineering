import weatherTracking from 'img/weatherTracking.png';
import excel from 'img/excel.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: 'https://docs.google.com/spreadsheets/d/1IHs0H4ASCQDnrgJJuXB0OBD9YDiKfJ0C/edit#gid=447801262',
      id: 'Weather Tracking.xlsx',
      image: excel,
    },
    {
        parent: 'ConstructionTeam',
        link: 'https://docs.google.com/spreadsheets/d/1IHs0H4ASCQDnrgJJuXB0OBD9YDiKfJ0C/edit#gid=447801262',
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