/* eslint-disable no-console */
import chalk from 'chalk';

const formatError = () => '';

const simpleError = (err, req, res) => {
  const status = err.statusCode || err.status || 500;

  let message = '';
  let stack = '';

  if (process.env.NODE_ENV !== 'production') {
    try {
      console.log(
        `${
          chalk.bold.red(`Server error ${status}`)
        }\n${
          chalk.red(err.message)
        }\n${
          formatError(err, {color: true, frames: 20})
        }`
      );
      message = `<h2>${err.message}</h2>`;
      stack = `\n<pre>\n${formatError(err)}\n</pre>`;
    } catch (e) {
      stack = `\n<pre>\n${err.stack}\n</pre>`;
    }
    message = `<h2>${err.message}</h2>`;
  }

  console.log(err);

  const body = `
<!DOCTYPE html>
<html>
<head>
<title>Error 500</title>
<style>
body{font-family: sans-serif; color: #333}
</style>
</head>
<body>
<h1>Error ${status}</h1>
${message}${stack}
</body>
</html>`;

  res.statusCode = status;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(body);
};

export default () => (app) => ({
  ...app,
  error: simpleError,
  request: (req, res) => {
    let result;
    try {
      result = app.request(req, res);
      if (result && typeof result.then === 'function') {
        return result.then(
          () => {},
          (err) => simpleError(err, req, res),
        );
      }
    } catch (err) {
      return simpleError(err, req, res);
    }
    return result;
  },
});
