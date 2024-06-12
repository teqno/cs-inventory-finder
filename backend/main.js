import { createServer } from 'http';
import { get } from 'https';
import url from 'url';

const requestListener = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  console.log("Request is Incoming");
  const url_parts = url.parse(req.url, true);
  const steamId = url_parts.path.split('/')[1];
  const options = {
    host: "steamcommunity.com",
    path: `/inventory/${steamId}/730/2?l=english&count=5000`
    // path: `/inventory/${steamId}/730/2?l=english`
  };
  get(options, (steam_res) => {
    var bodyChunks = [];
    steam_res.on('data', function (chunk) {
      bodyChunks.push(chunk);
    }).on('end', function () {
      var body = Buffer.concat(bodyChunks);
      res.end(body);
    });
  });
};

const server = createServer(requestListener);

server.listen(3000, 'localhost', function () {
  console.log("Server is Listening at Port 3000!");
});