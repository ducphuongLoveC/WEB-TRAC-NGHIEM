
export const shuffleArray = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    
    while (currentIndex !== 0) {
 // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];

        array[randomIndex] = temporaryValue;
    }

    return array;
};

export const findArray = (obj) => {
    for (let key in obj) {
        if (Array.isArray(obj[key])) {
            return obj[key]; // Trả về mảng đầu tiên tìm thấy
        }
    }
    return null; // Không tìm thấy mảng
}

