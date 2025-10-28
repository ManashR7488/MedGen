export const colorText = (text, colorCode) => {
    return `\x1b[${colorCode}m${text}\x1b[0m`;
  }
  
  // Define color codes
  export const colors = {
    reset: 0,
    red: 31,
    green: 32,
    yellow: 33,
    blue: 34,
    magenta: 35,
    cyan: 36,
    white: 37,
    bgRed: 41,
    bgGreen: 42,
    bgYellow: 43,
    bgBlue: 44,
    bgMagenta: 45,
    bgCyan: 46,
    bgWhite: 47,
  };