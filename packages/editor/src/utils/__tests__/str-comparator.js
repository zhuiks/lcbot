import strComparator from '../str-comparator';

describe('strComparator', () => {
    it('compares two latin strings', ()=>{
        expect(strComparator('qwerty', 'qwerty')).toEqual(true);
        expect(strComparator('qwerty', 'asdfg')).toEqual(false);
    });
    it('compares two latin strings with spaces and upperCase', ()=>{
        expect(strComparator('qwert y', 'qwe r ty')).toEqual(true);
        expect(strComparator('qwertY', 'Qwerty')).toEqual(true);
    });
    
    it('compares two arabic strings', ()=>{
        expect(strComparator('أحِرة', 'احرة')).toEqual(true);
        const strA = `هل كد مني قريب 
   ماكو مثلك ربي  
   صلاتي يستجيب
    `;
    const strB = `هل كد مني قريب ماكو مثلك ربي صلاتي يستجيب`;
         expect(strComparator(strA, strB)).toEqual(true);
    });
});