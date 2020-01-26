const resolvers = require('../resolvers');

describe('[Query.songs]', () => {
  const mockContext = {
    dataSources: {
      songs: { getAllSongs: jest.fn() },
    },
  };
  // just for easy access
  const { getAllSongs } = mockContext.dataSources.songs;

  it('calls lookup from songs api', async () => {
    // NOTE: these results get reversed in the resolver
    getAllSongs.mockReturnValueOnce([{ id: 999, title: 'foo' }]);

    // check the resolver response
    const res = await resolvers.Query.songs(null, {}, mockContext);
    expect(res).toEqual([{ id: 999, title: 'foo' }]);
  });

  xit('respects pageSize arg', async () => {
    // NOTE: these results get reversed in the resolver
    getAllLaunches.mockReturnValue([
      { id: 1, cursor: 'foo' },
      { id: 999, cursor: 'bar' },
    ]);

    // check the resolver response
    const res = await resolvers.Query.launches(
      null,
      { pageSize: 1 },
      mockContext,
    );
    expect(res).toEqual({
      cursor: 'bar',
      hasMore: true,
      launches: [{ id: 999, cursor: 'bar' }],
    });
  });

  xit('respects cursor arg', async () => {
    // NOTE: these results get reversed in the resolver
    getAllLaunches.mockReturnValueOnce([
      { id: 1, cursor: 'a' },
      { id: 999, cursor: 'b' },
    ]);

    // check the resolver response
    const res = await resolvers.Query.launches(
      null,
      { after: 'b' },
      mockContext,
    );

    expect(res).toEqual({
      hasMore: false,
      cursor: 'a',
      launches: [{ id: 1, cursor: 'a' }],
    });
  });

  xit('respects both pageSize and cursor', async () => {
    // NOTE: these results get reversed in the resolver
    getAllLaunches.mockReturnValue([
      { id: 1, cursor: 'a' },
      { id: 999, cursor: 'b' },
      { id: 123, cursor: 'c' },
    ]);

    // check the resolver response
    const res = await resolvers.Query.launches(
      null,
      { after: 'c', pageSize: 1 },
      mockContext,
    );

    expect(res).toEqual({
      cursor: 'b',
      hasMore: true,
      launches: [{ id: 999, cursor: 'b' }],
    });
  });
});

describe('[Query.song]', () => {
  const mockContext = {
    dataSources: {
      songs: { getSong: jest.fn() },
    },
  };

  it('calls lookup from song api', async () => {
    const { getSong } = mockContext.dataSources.songs;
    getSong.mockReturnValueOnce({
      id: 999,
    });

    // check the resolver response
    const res = await resolvers.Query.song(null, { id: 999 }, mockContext);
    expect(res).toEqual({ id: 999 });

    // make sure the dataSources were called properly
    expect(getSong).toBeCalledWith( 999 );
  });
});