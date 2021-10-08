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
    primary: '#008b00', // default hue: 700
    primaryLight: '#4fbc3d',
    primaryDark: '#005c00',
    secondary: '#b83ca5', // default hue: 400
    secondaryLight: '#ed6fd7',
    secondaryDark: '#850076',
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