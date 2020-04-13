import textBreaker from '../text-breaker';

const verseR = '[0-9]+';
const chorusR = 'القرار';
const regex = new RegExp(`^ *(${verseR}|${chorusR}) *[-|–|:]* *`, 'iu');

xdescribe('regex', () => {
    it('processes English string', ()=>{
        const m = regex.exec('القرار– (ده رجانا فيك يا إلهنا ');
        expect(m&&m[0]).toEqual('القرار– '); 
    });
});