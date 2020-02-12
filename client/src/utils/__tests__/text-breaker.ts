import textBreaker from '../text-breaker';

const testInput = [
`   

   `,
`
١- (جايين يا أبانا
اسمع لدعانا
بتواضع يرجع شعبك
يطلب رحمة من عندك
بقلوب محتاجه إليك) 2

القرار– (ده رجانا فيك يا إلهنا
وهنستنى المواعيد
نحوك نرفع أعيننا 
وايمانا فيك بيزيد
بنصدق كل وعودك دا
انت في الوعد أمين 
تملا حياتنا من جودك
مجداً ليك يا معين )

2- (أرضنا عطشانة 
بجروح مليانة 
من فيض حبك ترويها
لمسة إيدك تشفيها
وتردها تاني إليك) 2

3- (بنتوب قدامك
بنعود لحنانك
نعلن ملكك في حياتنا
في بيوتنا وإجتماعاتنا
وقلوبنا تسجد ليك) 2
`, `

جايلك بتوبة عند رجليك
مشتاق لحضنك لمسة ايديك
تيجي تغير تشفي تحرر
تديني قوة وانت تزيد

انا هاجيلك علشان انت الضمان
فيك الكفاية فيك الامان
يملاني حبك يملاني فكرك
فيض بروحك وسلام 

عندك هالاقي فرحي وسلامي
وفي محضرك تملا كياني
وخير ورحمة هيتبعاني
في كل يوم من حياتي
`,`
قرار :- ( ماكو مثلك ربي ... هل كد مني قريب 
    ماكو مثلك ربي ... صلاتي يستجيب ) *٢

( انت تحبني ... رغم عيوبي ... وكل ضعفاتي
و حبك ربي ... يرفعني يغيرلي حياتي )*٢

قرار :- ( ماكو مثلك ربي ... هل كد مني قريب 
    ماكو مثلك ربي ... صلاتي يستجيب ) *٢

( بأسمك اصلي ...لابوي الأب السماوي
و لمن اصلي ... يسمعني و يقبل طلباتي )*٢

قرار :- ( ماكو مثلك ربي ... هل كد مني قريب
  ماكو مثلك ربي ... صلاتي يستجيب ) *٢
`
];


describe('testBreaker', () => {
    it('returns an array', ()=>{
        expect(Array.isArray(textBreaker(''))).toBeTruthy();
    });

    it('breaks into slides by empty lines', () => {
        expect(textBreaker(testInput[0])).toHaveLength(0);
        expect(textBreaker(testInput[1])).toHaveLength(4);
        expect(textBreaker(testInput[2])).toHaveLength(3);
    });

    it('assigns correct slide type', ()=>{ 
        const chorusR = 'القرار';
        const slides = textBreaker(testInput[1]);
        expect(chorusR === slides[1].name).toBeTruthy();
        expect(slides[0]).toHaveProperty('type', 'VERSE');
        expect(slides[1]).toHaveProperty('type', 'CHORUS');
        expect(slides[2]).toHaveProperty('type', 'VERSE');
    });

    it('auto assigns verces by default', ()=>{
        const slides = textBreaker(testInput[2]);
        expect(slides[0]).toHaveProperty('type', 'VERSE');
        expect(slides[1]).toHaveProperty('type', 'VERSE');
    });

    it('assigns verse numbers correctly', ()=>{
        const slides = textBreaker(testInput[1]);
        expect(slides[0]).toHaveProperty('name', '1');                
        expect(slides[2]).toHaveProperty('name', '2');                
        expect(slides[3]).toHaveProperty('name', '3');                
  
        const slides2 = textBreaker(testInput[2]);
        expect(slides2[0]).toHaveProperty('name', '1');                
        expect(slides2[1]).toHaveProperty('name', '2');                
        expect(slides2[2]).toHaveProperty('name', '3');                
    });

    it('returns text by lines without slide info', ()=>{
        const slides = textBreaker(testInput[1]);
        expect(slides[0]).toHaveProperty('text');
        expect(slides[0].text).toHaveLength(5);                
        expect(slides[0].text[0]).toEqual('(جايين يا أبانا');
        expect(slides[1].text[0]).toEqual('(ده رجانا فيك يا إلهنا');

        const slides2 = textBreaker(testInput[2]);
        expect(slides2[0].text).toHaveLength(4);     
        
        const slides3 = textBreaker(testInput[3]);
        expect(slides3[0].text[0]).toEqual('( ماكو مثلك ربي ... هل كد مني قريب');        
    });

    it('processes duplicated slides correctly', ()=>{

    });
});