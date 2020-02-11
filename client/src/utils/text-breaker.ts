import fixArabicNumbers from './fixArabicNumber';

export interface slideType {
    type: string;
    name: string | null | undefined;
    text: string[];
}

const textBreaker = (input: string) => {
    let slides: slideType[] = [];
    const verseR = '[0-9]+';
    const chorusR = 'القرار';
    let verseCounter = 0;

    fixArabicNumbers(input.trim())
        .split(/(?:(?:\r\n|[\n\v\f\x85\u2028\u2029])\s*){2,}/)
        .forEach(text => {
            if (text.trim().length) {
                const regex = new RegExp(`^\s*(${verseR}|${chorusR})\s*[-|–|:]?\s*`, 'i');
                const m = text.match(regex);
                let slideName = m && m[1]; //m.groups && m.groups.type_name;
                const slideType = slideName === chorusR ? 'CHORUS' : 'VERSE';
                if(slideType === 'VERSE') {
                    verseCounter = m && parseInt(m[1]) || verseCounter+1;
                    slideName = verseCounter.toString();
                }
                const slideText = m && m.index!==undefined
                    ? text.slice(m.index + m[0].length) 
                    : text;
                slides.push({
                    type: slideType,
                    name: slideName,
                    text: slideText.trim().split(/\r\n|[\n\v\f\r\x85\u2028\u2029]/)
                });
            }
        });
    return slides;
}
export default textBreaker;