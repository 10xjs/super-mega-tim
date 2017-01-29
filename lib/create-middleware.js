export default ({request, error}) => (app) => {
  const result = {...app};

  if (typeof app.request !== 'function') {
    throw new TypeError('wtf no req?!');
  }
  if (typeof app.error !== 'function') {
    result.error = (err) => {
      console.error(err);
    };
  }

  if (request) {
    result.request = (req, res) => Promise.resolve()
      .then(() => request(req, res))
      .then(() => res.headersSent || app.request(req, res))
      .catch((err) => {
        console.log('FUUUUU', err);
        return app.error && app.error(err, req, res)
      });
  }

  if (error) {
    result.error = (err, req, res) => Promise.resolve()
      .then(() => error(err, req, res))
      .then(() => res.headersSent || app.request(req, res))
      .catch((err) => app.error(err, req, res));
  }

  return result;
};
