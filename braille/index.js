const braille = new Map([
    ['A', '⠠⠠⠁'],
    ['B', '⠠⠠⠃'],
    ['C', '⠠⠠⠉'],
    ['D', '⠠⠠⠙'],
    ['E', '⠠⠠⠑'],
    ['F', '⠠⠠⠋'],
    ['G', '⠠⠠⠛'],
    ['H', '⠠⠠⠓'],
    ['I', '⠠⠠⠊'],
    ['J', '⠠⠠⠚'],
    ['K', '⠠⠠⠅'],
    ['L', '⠠⠠⠇'],
    ['M', '⠠⠠⠍'],
    ['N', '⠠⠠⠝'],
    ['O', '⠠⠠⠕'],
    ['P', '⠠⠠⠏'],
    ['Q', '⠠⠠⠟'],
    ['R', '⠠⠠⠗'],
    ['S', '⠠⠠⠎'],
    ['T', '⠠⠠⠞'],
    ['U', '⠠⠠⠥'],
    ['V', '⠠⠠⠧'],
    ['W', '⠠⠠⠺'],
    ['X', '⠠⠠⠭'],
    ['Y', '⠠⠠⠽'],
    ['Z', '⠠⠠⠵'],
    ['a', '⠁'],
    ['b', '⠃'],
    ['c', '⠉'],
    ['d', '⠙'],
    ['e', '⠑'],
    ['f', '⠋'],
    ['g', '⠛'],
    ['h', '⠓'],
    ['i', '⠊'],
    ['j', '⠚'],
    ['k', '⠅'],
    ['l', '⠇'],
    ['m', '⠍'],
    ['n', '⠝'],
    ['o', '⠕'],
    ['p', '⠏'],
    ['q', '⠟'],
    ['r', '⠗'],
    ['s', '⠎'],
    ['t', '⠞'],
    ['u', '⠥'],
    ['v', '⠧'],
    ['w', '⠺'],
    ['x', '⠭'],
    ['y', '⠽'],
    ['z', '⠵'],
    ['0', '⠼⠚'],
    ['1', '⠼⠁'],
    ['2', '⠼⠃'],
    ['3', '⠼⠉'],
    ['4', '⠼⠙'],
    ['5', '⠼⠑'],
    ['6', '⠼⠋'],
    ['7', '⠼⠛'],
    ['8', '⠼⠓'],
    ['9', '⠼⠊'],
    ['"', '⠶'],
    ['\'', '⠄'],
    ['!', '⠖'],
    ['?', '⠦'],
    ['.', '⠲'],
    [',', '⠂'],
    ['-', '⠤'],
])

const ZERO_WIDTH_NON_JOINER = '‌'

const input = document.querySelector('#input')
const output = document.querySelector('#output')

input.addEventListener('keyup', convert_to_braille)
input.addEventListener('click', e => input.select())

output.addEventListener('keyup', convert_to_alpha)
output.addEventListener('click', e => output.select())

function convert_to_braille(evt) {
    let input = document.querySelector('#input')
    let output = document.querySelector('#output')

    output.value = ''
    rot13(input.value).split('').forEach(ch => {
        if(!braille.has(ch)) braille.set(ch, ch)

        output.value += braille.get(ch) + ZERO_WIDTH_NON_JOINER //zero width non joiner acts as a character separator
    })
}

function convert_to_alpha(evt) {
    let input = document.querySelector('#input')
    let output = document.querySelector('#output')

    if(evt.key === "Backspace") {
        evt.preventDefault()
        let chars = output.value.split(ZERO_WIDTH_NON_JOINER)
        chars.pop()
        output.value = chars.join(ZERO_WIDTH_NON_JOINER)
    }

    input.value = ''
    output.value.split(ZERO_WIDTH_NON_JOINER).forEach(ch => {
        for(let key of braille) {
            if(key[1] === ch) {
                input.value += rot13(key[0])
                return
            }
        }

        input.value += ch
    })
}

//dirty rot13 implementation from an old tool I wrote
function rot13(ch) {
    let out = "";
    for(var ind = 0; ind < ch.length; ind++) {
        char = ch.charCodeAt(ind);
        if(char < 65 || char > 122) {
            out += String.fromCharCode(char);
            continue;
        }
        if(char <= 77 || (char > 90 && char <= 109)) {
            out += String.fromCharCode(char + 13);
        } else {
            shifts = 13;
            if(char > 77 && char < 96) {
                shifts = (char + 13) - 90;
                out += String.fromCharCode(shifts + 64);
            } else {
                shifts = (char + 13) - 121;
                out += String.fromCharCode(shifts + 95);
            }
        }
    }
    return out;
}