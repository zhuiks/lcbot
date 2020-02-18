import textBreaker from '../text-breaker';

const str = 'أنّبََاًﻹ';

xdescribe('normalization', () => {
    it('removes diactric signs', ()=>{
        const strNorm = str.normalize('NFKD').replace(/[\u064B-\u065F]/g, '');
        expect(strNorm).toEqual('انبالا'); 
    });
});