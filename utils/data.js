const names = [
    'num1',
    'num2',
    'num3',
    'num4',
    'num5',
    'num6',
    'num7',
    'num8',
    'num9',
    'num0'
];


    
const thoughts = [
    'IDK',
    'I agree!!!',
    'could be worse',
    'Why?',
    'nah',
    'not really',
    'sure sure',
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomName = () =>
    `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

const getRandomthoughts = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        // results.push({
            // thoughts: getRandomArrItem(thoughts)
        // });
    }
    return results;
};

module.exports = {getRandomName, getRandomthoughts}