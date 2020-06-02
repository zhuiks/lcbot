import validateLink from '../validate-link';

describe('Validate Link', () => {
    it('validates empty string', ()=>{
        expect(validateLink("")).toEqual(true); 
    });
    it('validates youtu.be link', ()=>{
        expect(validateLink("https://youtu.be/BxqWX92ACqc")).toEqual(true); 
    });
    it('validates youtube.com link', ()=>{
        expect(validateLink("https://www.youtube.com/watch?v=BxqWX92ACqc")).toEqual(true); 
    });
    it('fails on incorrect link', ()=>{
        expect(validateLink("not a link")).toEqual(false); 
        expect(validateLink("https://regex101.com/")).toEqual(false); 
        expect(validateLink("https://www.yoube.com/watch?v=BxqWX92ACqc")).toEqual(false); 
    });
    xit('fails on not list and chanel links', () => {
        expect(validateLink("https://www.youtube.com/playlist?list=PLA9jpzeFPVIFZdlQ0A-0e3di1KoiCnpy9")).toEqual(false); 
        expect(validateLink("https://www.youtube.com/channel/UCKboH-UpojYan_MXrJ2mhJg")).toEqual(false); 
    })
});