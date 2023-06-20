import {
  request,
  toMatchInvalidParameterValueError,
  toMatchMissingParameterError,
} from './helper';

describe('POST /osc/commands/execute listFiles', () => {
  it('with fileType: image, entryCount: 3, maxThumbSize: 640', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({
        name: 'camera.listFiles',
        parameters: { fileType: 'image', entryCount: 3, maxThumbSize: 640 },
      })
      .expect(200);
    expect(res.body.results.totalEntries).toEqual(10);
    res.body.results.entries.map((entry: unknown) => {
      expect(entry).toMatchSnapshot({
        fileUrl: expect.stringMatching(/^(http|https):\/\/.+\/.+\/.+\/.+\.JPG/),
      });
    });
  });

  it('with fileType: image, entryCount: 3, maxThumbSize: 640, _detail :true', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({
        name: 'camera.listFiles',
        parameters: {
          fileType: 'image',
          entryCount: 3,
          maxThumbSize: 640,
          _detail: true,
        },
      })
      .expect(200);
    expect(res.body.results.totalEntries).toEqual(10);
    res.body.results.entries.map((entry: unknown) => {
      expect(entry).toMatchSnapshot({
        fileUrl: expect.stringMatching(/^(http|https):\/\/.+\/.+\/.+\/.+\.JPG/),
      });
    });
  });

  it('with fileType: image, entryCount: 3, maxThumbSize: 0', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({
        name: 'camera.listFiles',
        parameters: { fileType: 'image', entryCount: 3, maxThumbSize: 0 },
      })
      .expect(200);
    expect(res.body.results.totalEntries).toEqual(10);
    res.body.results.entries.map((entry: unknown) => {
      expect(entry).toMatchSnapshot({
        fileUrl: expect.stringMatching(/^(http|https):\/\/.+\/.+\/.+\/.+\.JPG/),
      });
    });
  });

  it('with fileType: image, entryCount: 3, maxThumbSize: 0, _detail: true', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({
        name: 'camera.listFiles',
        parameters: {
          fileType: 'image',
          entryCount: 3,
          maxThumbSize: 0,
          _detail: true,
        },
      })
      .expect(200);
    expect(res.body.results.totalEntries).toEqual(10);
    res.body.results.entries.map((entry: unknown) => {
      expect(entry).toMatchSnapshot({
        fileUrl: expect.stringMatching(/^(http|https):\/\/.+\/.+\/.+\/.+\.JPG/),
      });
    });
  });

  it('with fileType: video, entryCount: 3, maxThumbSize: 640', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({
        name: 'camera.listFiles',
        parameters: { fileType: 'video', entryCount: 3, maxThumbSize: 640 },
      })
      .expect(200);
    expect(res.body).toMatchSnapshot();
  });

  it('should respond missingParameterError', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({ name: 'camera.listFiles', parameters: {} })
      .expect(400);
    toMatchMissingParameterError(res);
  });

  it('should respond invalidParameterValueError', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({
        name: 'camera.listFiles',
        parameters: {
          fileType: 'image',
          entryCount: 3,
          maxThumbSize: 640,
          _detail: 'dummy',
        },
      })
      .expect(400);
    toMatchInvalidParameterValueError(res);
  });
});

describe('THETA X POST /osc/commands/execute listFiles', () => {
  it('with fileType: image, entryCount: 3, maxThumbSize: 640', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({
        name: 'camera.listFiles',
        parameters: { fileType: 'image', entryCount: 3, maxThumbSize: 640 },
      })
      .set('emulating-theta-model', 'x')
      .expect(200);
    expect(res.body.results.totalEntries).toEqual(10);
    res.body.results.entries.map((entry: unknown) => {
      expect(entry).toMatchSnapshot({
        fileUrl: expect.stringMatching(/^(http|https):\/\/.+\/.+\/.+\/.+\.JPG/),
      });
    });
  });

  it('with fileType: image, entryCount: 3, maxThumbSize: 0', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({
        name: 'camera.listFiles',
        parameters: { fileType: 'image', entryCount: 3, maxThumbSize: 0 },
      })
      .set('emulating-theta-model', 'x')
      .expect(200);
    expect(res.body.results.totalEntries).toEqual(10);
    res.body.results.entries.map((entry: unknown) => {
      expect(entry).toMatchSnapshot({
        fileUrl: expect.stringMatching(/^(http|https):\/\/.+\/.+\/.+\/.+\.JPG/),
      });
    });
  });

  it('with fileType: image, entryCount: 3, maxThumbSize: 640, _detail :true', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({
        name: 'camera.listFiles',
        parameters: {
          fileType: 'image',
          entryCount: 3,
          maxThumbSize: 640,
          _detail: true,
        },
      })
      .set('emulating-theta-model', 'x')
      .expect(200);
    expect(res.body.results.totalEntries).toEqual(10);
    res.body.results.entries.map((entry: unknown) => {
      expect(entry).toMatchSnapshot({
        fileUrl: expect.stringMatching(/^(http|https):\/\/.+\/.+\/.+\/.+\.JPG/),
      });
    });
  });

  it('with fileType: video, entryCount: 3, maxThumbSize: 640', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({
        name: 'camera.listFiles',
        parameters: { fileType: 'video', entryCount: 3, maxThumbSize: 640 },
      })
      .set('emulating-theta-model', 'x')
      .expect(200);
    expect(res.body).toMatchSnapshot();
  });

  it('with fileType: image, entryCount: 3, maxThumbSize: 0, _detail: true', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({
        name: 'camera.listFiles',
        parameters: {
          fileType: 'image',
          entryCount: 3,
          maxThumbSize: 0,
          _detail: true,
        },
      })
      .set('emulating-theta-model', 'x')
      .expect(200);
    expect(res.body.results.totalEntries).toEqual(10);
    res.body.results.entries.map((entry: unknown) => {
      expect(entry).toMatchSnapshot({
        fileUrl: expect.stringMatching(/^(http|https):\/\/.+\/.+\/.+\/.+\.JPG/),
      });
    });
  });

  it('should respond missingParameterError', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({ name: 'camera.listFiles', parameters: {} })
      .set('emulating-theta-model', 'x')
      .expect(400);
    toMatchMissingParameterError(res);
  });

  it('should respond invalidParameterValueError', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({
        name: 'camera.listFiles',
        parameters: {
          fileType: 'image',
          entryCount: 3,
          maxThumbSize: 640,
          _detail: 'dummy',
        },
      })
      .set('emulating-theta-model', 'x')
      .expect(400);
    toMatchInvalidParameterValueError(res);
  });
});

describe('THETA Z1 POST /osc/commands/execute listFiles', () => {
  it('with fileType: image, entryCount: 3, maxThumbSize: 640', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({
        name: 'camera.listFiles',
        parameters: { fileType: 'image', entryCount: 3, maxThumbSize: 640 },
      })
      .set('emulating-theta-model', 'z1')
      .expect(200);
    expect(res.body.results.totalEntries).toEqual(10);
    res.body.results.entries.map((entry: unknown) => {
      expect(entry).toMatchSnapshot({
        fileUrl: expect.stringMatching(
          /^(http|https):\/\/.+\/.+\/.+\/.+\/.+\.JPG/,
        ),
      });
    });
  });

  it('with fileType: image, entryCount: 3, maxThumbSize: 640, _detail: false', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({
        name: 'camera.listFiles',
        parameters: {
          fileType: 'image',
          entryCount: 3,
          maxThumbSize: 640,
          _detail: false,
        },
      })
      .set('emulating-theta-model', 'z1')
      .expect(200);
    expect(res.body.results.totalEntries).toEqual(10);
    res.body.results.entries.map((entry: unknown) => {
      expect(entry).toMatchSnapshot({
        fileUrl: expect.stringMatching(
          /^(http|https):\/\/.+\/.+\/.+\/.+\/.+\.JPG/,
        ),
      });
    });
  });

  it('with fileType: image, entryCount: 3, maxThumbSize: 0', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({
        name: 'camera.listFiles',
        parameters: { fileType: 'image', entryCount: 3, maxThumbSize: 0 },
      })
      .set('emulating-theta-model', 'z1')
      .expect(200);
    expect(res.body.results.totalEntries).toEqual(10);
    res.body.results.entries.map((entry: unknown) => {
      expect(entry).toMatchSnapshot({
        fileUrl: expect.stringMatching(
          /^(http|https):\/\/.+\/.+\/.+\/.+\/.+\.JPG/,
        ),
      });
    });
  });

  it('with fileType: image, entryCount: 3, maxThumbSize: 0, _detail: false', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({
        name: 'camera.listFiles',
        parameters: {
          fileType: 'image',
          entryCount: 3,
          maxThumbSize: 0,
          _detail: false,
        },
      })
      .set('emulating-theta-model', 'z1')
      .expect(200);
    expect(res.body.results.totalEntries).toEqual(10);
    res.body.results.entries.map((entry: unknown) => {
      expect(entry).toMatchSnapshot({
        fileUrl: expect.stringMatching(
          /^(http|https):\/\/.+\/.+\/.+\/.+\/.+\.JPG/,
        ),
      });
    });
  });

  it('with fileType: video, entryCount: 3, maxThumbSize: 640', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({
        name: 'camera.listFiles',
        parameters: { fileType: 'video', entryCount: 3, maxThumbSize: 640 },
      })
      .set('emulating-theta-model', 'z1')
      .expect(200);
    expect(res.body).toMatchSnapshot();
  });

  it('should respond missingParameterError', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({ name: 'camera.listFiles', parameters: {} })
      .set('emulating-theta-model', 'z1')
      .expect(400);
    toMatchMissingParameterError(res);
  });

  it('should respond invalidParameterValueError', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({
        name: 'camera.listFiles',
        parameters: {
          fileType: 'image',
          entryCount: 3,
          maxThumbSize: 640,
          _detail: 'dummy',
        },
      })
      .set('emulating-theta-model', 'z1')
      .expect(400);
    toMatchInvalidParameterValueError(res);
  });
});
