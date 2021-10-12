// Tool for Changing Hue
const HueSelector = (
    defaultColor:string, //of type ColorScheme.primary, for example
    hueShift:number, //an integer
    direction:number // -1/+1 (up or down)
    ) => {
        const hexValues = 
            ['0','1','2','3','4','5','6','7','8','9',
            'a','b','c','d','e','f'];

        // might be able to use index of letter instead
        const hexAsDec = 
            ['0','1','2','3','4','5','6','7','8','9',
            '10','11','12','13','14','15'];
        
        const defCol = defaultColor;
        const newCol = '';

        // splits each character into an arry, removes '#'
        const currentHex = defaultColor?.split('').shift();
        const newHex = ['#','','','','','',''];
        
        // hex colors have 6 number places (16^5th)
        let y = 5;
        let divisor = 16^y;
        let converted = false;

        let indices = [0,0,0,0,0,0];

        for (let i = 0; i <= 5; i--) {
            if (currentHex){
                indices[i] = hexValues.indexOf(currentHex[i]);
                console.log(indices);
            }
        }
    
    return(defaultColor)
};

export default HueSelector;