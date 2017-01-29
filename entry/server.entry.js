import http from 'http';
import connect from 'midori/connect';
import createApp from '/server';

const server = connect(createApp(), http.createServer());

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});

server.listen(process.env.PORT);
