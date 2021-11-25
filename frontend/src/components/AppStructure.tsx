const options = [
    {
        main: 'Material Inventory',
        default: '/dashboard',
        subItems: [{
            main: 'Pipes',
            default: '/pipes',
        },
        {
            main: 'Fittings',
            default: '/fittings'
        }],
    },
    {
        main: 'Welding',
        subItems: [''],
        default: '',
    },
    {
        main: 'Stringing',
        subItems: [''],
        default: '/pipes/strung/new',
    },
    {
        main: 'Bending',
        subItems: [''],
        default: '/bending',
    },
    {
        main: 'Coating',
        subItems: [''],
        default: '',
    },
    {
        main: 'Other',
        subItems: [''],
        default: '',
    },
    {
        main: 'Master Log',
        subItems: [''],
        default: '/aggregate',
    },
    {
        main: 'Associate User',
        subItems: [''],
        default: '/project/user',
        admin: 'true'
    },
];

const AppStructure = () => {
    return options;
}
export default AppStructure;