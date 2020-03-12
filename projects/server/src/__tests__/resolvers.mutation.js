const resolvers = require('../resolvers');

const mockContext = {
  dataSources: {
    songs: {
      saveSong: jest.fn(),
      getSong : jest.fn(),
    }
  }
};

describe('[Mutation.saveSong]', () => {
  const { saveSong } = mockContext.dataSources.songs;
  const { getSong } = mockContext.dataSources.songs;

  it('returns true if saving succeeds', async () => {
    saveSong.mockReturnValueOnce( 999 );
    getSong.mockReturnValueOnce({ id: 999, title: 'foo' });

    // check the resolver response
    const res = await resolvers.Mutation.saveSong(
      null,
      { title: 'foo' },
      mockContext,
    );
    expect(res).toEqual({
      success: true,
      song: { title: 'foo', id: 999 },
      message: 'Song saved successfully',
    });

    // check if the dataSource was called with correct args
    expect(saveSong).toBeCalledWith({ title: 'foo' });
  });

  it('returns false if saving fails', async () => {
    saveSong.mockReturnValueOnce(false);

    // check the resolver response
    const res = await resolvers.Mutation.saveSong(
      null,
      { title: 'foo' },
      mockContext,
    );

    expect(res.message).toBeDefined();
    expect(res.success).toBeFalsy();
  });
});
