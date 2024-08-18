const randomId = (length, { value, percent }) => {

    const characters = {
        string: 'abcdef',
        number: '1234567890'
    };

    let result = new Array(length).fill('');
    const calPercent = Math.floor((length * percent) / 100);

    let countString = value === 'string' ? calPercent : length - calPercent;
    let countNumber = length - countString;

    while (result.join('').length < length) {
        const randomIndex = Math.floor(Math.random() * length);
        if (result[randomIndex] === '') {
            if (countString > 0 && (value === 'string' || result.join('').length >= countNumber)) {
                const charIndex = Math.floor(Math.random() * characters.string.length);
                result[randomIndex] = characters.string[charIndex];
                countString--;
            } else if (countNumber > 0) {
                const charIndex = Math.floor(Math.random() * characters.number.length);
                result[randomIndex] = characters.number[charIndex];
                countNumber--;
            }
        }
    }

    return result.join('');
};

export default randomId;
