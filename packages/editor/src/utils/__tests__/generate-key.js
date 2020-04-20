import generateKey from '../generate-key';

describe('generateKey', () => {
  it('generates songId', ()=>{
      expect(generateKey('songId')).toHaveLength(6);
      expect(generateKey('songId')).not.toEqual(generateKey('songId'));
  });
});