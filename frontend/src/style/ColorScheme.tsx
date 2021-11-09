// Returns the array containing the color scheme

interface ColorScheme {
    primary:string,
    primaryLight:string,
    primaryDark:string,
    secondary:string,
    secondaryLight:string,
    secondaryDark:string,
    background:string,
    surface:string,
    error:string,
    onPrimary:string,
    onSecondary:string,
    onBackground:string,
    onSurface:string,
    onError:string,
};

const ColorScheme = {
    // primary: '#0288d1', // default hue: 700
    // primaryLight: '#5eb8ff',
    // primaryDark: '#005b9f',
    // secondary: '#9e9e9e', // default hue: 400
    // secondaryLight: '#cfcfcf',
    // secondaryDark: '#707070',
    // background: '#cfd8dc',
    // surface: '#000000',
    // error: '#B00020',
    // onPrimary: '#ffffff',
    // onSecondary: '#000000',
    // onBackground: '#000000',
    // onSurface: '#000000',
    // onError: '#FFFFFF',
    
    // new scheme
    primary: '#81977B', // default hue: 700
    primaryLight: '#B9C6B6',
    primaryDark: '#687D62',
    // secondary: '#937B99', // default hue: 400
    // secondaryLight: '#BDAEC0',
    // secondaryDark: '#79627F',
    secondary: '#727B7C', // default hue: 400
    secondaryLight: '#3F4B4C',
    secondaryDark: '#3D4640',
    background: '#cfd8dc',
    surface: '#000000',
    error: '#B00020',
    onPrimary: '#ffffff',
    onSecondary: '#000000',
    onBackground: '#000000',
    onSurface: '#000000',
    onError: '#FFFFFF',
};

/* 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    || Primary Swatch ||    
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    {hue = hex}

900 = #005c00
800 = #007a00
700 = #008b00 (default)
600 = #1a9d12
500 = #26ab1c
400 = #4fb846
300 = #72c568
200 = #9cd494
100 = #c3e5be
50  = #e6f5e5

~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    || Secondary Swatch ||     
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    {hue = hex}

900 = #5f0077
800 = #7b0084
700 = #8b008b 
600 = #9c0992
500 = #a90e97
400 = #b83ca5 (default)
300 = #c561b5
200 = #d78fca
100 = #e7bcdf
50  = #f5e4f2

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/


export default ColorScheme;