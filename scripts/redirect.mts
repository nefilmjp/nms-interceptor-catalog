import fse from 'fs-extra';
import LZstring from 'lz-string';

import type { ShipData } from '../src/types/';

const buffer = fse.readFileSync(process.cwd() + '/public/data/interceptor.db');
const jsonString = LZstring.decompressFromUint8Array(new Uint8Array(buffer));
const json: ShipData[] = JSON.parse(jsonString);

json.forEach((data) => {
  const shipId = data.uuid.substring(0, 8);
  const imageId = data.imageIds![0];
  const html = `<!DOCTYPE html>
<html lang="en" prefix="og: http://ogp.me/ns#">
<head>
<meta charset="utf-8">
<title>${shipId} - No Man&#39;s Sky Interceptor Catalog</title>
<meta property="og:url" content="https://nmsint.vercel.app/ship/?id=${shipId}" />
<meta property="og:site_name" content="No Man&#39;s Sky Interceptor Catalog" />
<meta property="og:title" content="${shipId} - No Man&#39;s Sky Interceptor Catalog" />
<meta property="og:type" content="article" />
<meta property="og:image" content="https://i.imgur.com/${imageId}h.jpg" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:creator" content="@nefilm_rc" />
<meta http-equiv="refresh" content="0;URL=https://nmsint.vercel.app/ship/?id=${shipId}" />
</head>
<body></body>
</html>`;
  fse.outputFileSync(`out/ship/${shipId}/index.html`, html);
});

/*
<meta property="og:description" content="Detailed information for the interceptor." />
*/
