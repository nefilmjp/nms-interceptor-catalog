import fse from 'fs-extra';

import db from '../public/data/interceptor.db.json' assert { type: 'json' };

import type { ShipData } from '../src/types/';

db.forEach((data) => {
  const shipId = data.uuid.substring(0, 8);
  const imageId = data.imageIds[0];
  const html = `<!DOCTYPE html>
<html lang="en" prefix="og: http://ogp.me/ns#">
<head>
<meta charset="utf-8">
<title>Ship ID ${shipId} - No Man&#x39;s Sky Interceptor Catalog</title>
<meta property="og:url" content="https://nmsint.vercel.app/ship/${shipId}/" />
<meta property="og:site_name" content="No Man&#x39;s Sky Interceptor Catalog" />
<meta property="og:title" content="Ship ID ${shipId} - No Man&#x39;s Sky Interceptor Catalog" />
<meta property="og:description" content="Detailed information for the interceptor." />
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
