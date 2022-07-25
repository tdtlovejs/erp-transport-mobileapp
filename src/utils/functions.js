import {PRACTICE_TYPES} from './constants';

export const shuffleArray = (array) => {
    const arrShuffle = [...array]
    let currentIndex = arrShuffle.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [arrShuffle[currentIndex], arrShuffle[randomIndex]] = [
            arrShuffle[randomIndex], arrShuffle[currentIndex]];
    }

    return arrShuffle;
}


export const axiosTimerFunc = (startTime) => {
    let now = Date.now();
    let seconds = Math.floor((now - startTime)/1000);
    let milliseconds = Math.floor((now - startTime)%1000);
    return `${seconds}.${milliseconds} seconds`;
}

export const delay = ms => new Promise(res => setTimeout(res, ms));
export const toHHMMSS = (nbSeconds) => {
    var sec_num = parseInt(nbSeconds, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return (hours !== "00" ? hours+':' : "") + minutes + ':' + seconds;
}

export const checkSameText = (textA, textB) => {
    const listWordA = textA.trim().toLowerCase().replaceAll('  ', ' ').replace(/[^a-zA-Z ]/g, "").replaceAll('.', '').replaceAll('okay', 'ok');
    const listWordB = textB.trim().toLowerCase().replaceAll('  ', ' ').replace(/[^a-zA-Z ]/g, "").replaceAll('.', '').replaceAll('okay', 'ok');
    return listWordA === listWordB
}


export const randomIndexFromLength = (countRandom, length, firstIndex) => {
    let listIndex = firstIndex !== undefined ? [firstIndex] : [];
    for (let index = 0; index < countRandom; index ++) {
        let itemIndex;
        do
            itemIndex = Math.floor(Math.random() * length)
        while (listIndex.includes(itemIndex))
        listIndex = [
            ...listIndex,
            itemIndex
        ]
    }
    return shuffleArray(listIndex);
}
