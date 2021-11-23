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
        default: '',
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
];

const AppStructure = () => {
    return options;
}
export default AppStructure;