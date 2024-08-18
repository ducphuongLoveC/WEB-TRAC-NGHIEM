export const customSpace = (string, space) => {
    const stringHanlded = string.split(' ');
    let result = '';

    for (let i = 0; i < stringHanlded.length; i++) {

        if (i != stringHanlded.length - 1) {
            result += stringHanlded[i] + space;
        } else {
            result += stringHanlded[i]
        }
    }
    return result;

}



