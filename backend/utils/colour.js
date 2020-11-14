/**
 * Encodes a string in a colour: red, yellow or green
 * @param  {String} c   colour to highlight in
 * @param  {String} str the string to encode
 * @return {String}     coloured string for terminal printing
 */
function colour(c, str) {
    return (colour[c] || colour.black) + str + colour.black
}

function strip(str) {
    re.lastIndex = 0 // reset position
    return str.replace(re, '')
}

// RGB in this "color table"
// "\x1B[38;2;R;G;Bm"
// Example:
colour.lightgreen = '\x1B[38;2;0;255;0m'
colour.gold = '\x1B[38;2;255;215;0m'
colour.niceRed = '\x1B[38;2;255;0;0m'

colour.BOLD = '\x1B[1m'

colour.red = '\x1B[31m'
colour.green = '\x1B[32m'
colour.blue = '\x1b[34m'

colour.yellow = '\x1B[33m'
colour.magenta = '\x1b[35m'
colour.cyan = '\x1b[36m'
colour.white = '\x1b[37m'
colour.black = '\x1B[39m'

var reStr = Object.keys(colour)
    .map(key => colour[key])
    .join('|')
var re = new RegExp(('(' + reStr + ')').replace(/\[/g, '\\['), 'g')

colour.strip = strip

export { colour }
