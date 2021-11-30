import excel from 'img/excel.png';
import word from 'img/word.png';
import SubCarousel from '../SubCarousel';



const links = [
    // Inventory
    {
      parent: 'Menu',
      link: 'https://docs.google.com/spreadsheets/d/1LoUXpn22dM2g6-qPabgTjxpttJIJwxxD/edit#gid=1981330534',
      id: 'Web Page.xlsx',
      image: excel,
    },
    {
      parent: 'Menu',
      link: 'https://docs.google.com/spreadsheets/d/1ZV6oaPZK1t0rXUP44Uug-TxxG0o93awt/edit#gid=88468563',
      id: 'Privacy Statement.xlsx',
      image: excel,
    },
    {
      parent: 'Menu',
      link: 'https://docs.google.com/spreadsheets/d/1vud32zJt1z51UfA4rpOSTHL62hAHco5N/edit#gid=1654361036',
      id: 'Term of Use.xlsx',
      image: excel,
    },
    {
        parent: 'Menu',
        link: 'https://docs.google.com/spreadsheets/d/1eeFIg5NXnK0NNp5tdVypHuMvhcGmRV5p/edit#gid=293875588',
        id: 'Current Projects.xlsx',
        image: excel,
    },
    {
        parent: 'Menu',
        link: 'https://docs.google.com/spreadsheets/d/184AhIwLE0YOf-Cp7GmkZ8kgx8W8Hgde8/edit#gid=517526746',
        id: 'Login.xlsx',
        image: excel,
    },
    {
        parent: 'Menu',
        link: 'https://docs.google.com/spreadsheets/d/1j8fJwTDpwzewXyOCl6dzNpQ1h5LD33Jq/edit?rtpof=true#gid=705371492',
        id: 'Menu 11-12-2020.xlsx',
        image: excel,
    },
    {
        parent: 'Menu',
        link: 'https://docs.google.com/spreadsheets/d/11e5Jj5B48ZCprvQ2tC1pLUU77mnt0wWF/edit#gid=190094116',
        id: 'Access Profile.xlsx',
        image: excel,
    },
    {
        parent: 'Menu',
        link: 'https://docs.google.com/document/d/1VwHrLNYeL9vwnoT09T8bM7ggSj77_lSG/edit#heading=h.gjdgxs',
        id: 'zBending and Pipe Gang.docx',
        image: word,
    },
    {
        parent: 'Menu',
        link: 'https://docs.google.com/document/d/17HahHvqvzzZ-fNrXW5tl_0kVHbll_6vG/edit',
        id: 'zData base Log.docx',
        image: word,
    },
    {
        parent: 'Menu',
        link: 'https://docs.google.com/document/d/1vOXHw77hFsmi9qfqaWfe_c0OWMJN0kIe/edit#heading=h.gjdgxs',
        id: 'zHeat Number Tab Pipe Heat Number.docx',
        image: word,
    },
    {
        parent: 'Menu',
        link: 'https://docs.google.com/document/d/1YpfVL770llbCLUUaqhwS70C0P-8p80Nm/edit',
        id: 'zPipe Inventory Tab(HH).docx',
        image: word,
    },
    {
        parent: 'Menu',
        link: 'https://docs.google.com/document/d/15CBR9N037wHm-GsUZU3siJnC8JGPmn6V/edit',
        id: 'zStringing Stock Pile.docx',
        image: word,
    },
    {
        parent: 'Menu',
        link: 'https://docs.google.com/document/d/1kH8GQf4RUP6vcUuPR-McjkvqW_3msHeb/edit',
        id: 'zStringing Tab.docx',
        image: word,
    },
  ];


  const MaterialInventory = () => {
    return (
        SubCarousel(links)
    );
}
export default MaterialInventory;