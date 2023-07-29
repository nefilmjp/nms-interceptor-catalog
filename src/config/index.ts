export const PATH_PREFIX = process.env['NEXT_PUBLIC_PATH_PREFIX'];

export const THUMB_SIZES = {
  s: {
    label: 'XS (sq)',
    w: 90,
    h: 90,
    ext: 'jpg',
  },
  b: {
    label: 'S (sq)',
    w: 160,
    h: 160,
    ext: 'jpg',
  },
  t: {
    label: 'S',
    w: 160,
    h: 90,
    ext: 'jpg',
  },
  m: {
    label: 'M',
    w: 320,
    h: 180,
    ext: 'webp',
  },
  l: {
    label: 'L',
    w: 640,
    h: 360,
    ext: 'webp',
  },
  // h: {
  //   label: 'XL',
  //   w: 1024,
  //   h: 576,
  //   ext: 'webp',
  // },
};

export const CHART_COLOR = {
  blue: 'rgba(54,162,235,0.8)',
  red: 'rgba(255,99,132,0.8)',
  green: 'rgba(75,192,192,0.8)',
  orange: 'rgba(255,159,64,0.8)',
  purple: 'rgba(153,102,255,0.8)',
  yellow: 'rgba(255,205,86,0.8)',
  gray: 'rgba(201,203,207,0.8)',
  lightBlue: 'rgba(54,162,235,0.5)',
  lightRed: 'rgba(255,99,132,0.5)',
  lightGreen: 'rgba(75,192,192,0.5)',
  lightOrange: 'rgba(255,159,64,0.5)',
  lightPurple: 'rgba(153,102,255,0.5)',
  lightYellow: 'rgba(255,205,86,0.5)',
  lightGray: 'rgba(201,203,207,0.5)',
};

export const CHART_COLOR_ARRAY = [
  'rgba(54,162,235,0.8)',
  'rgba(255,99,132,0.8)',
  'rgba(75,192,192,0.8)',
  'rgba(255,159,64,0.8)',
  'rgba(153,102,255,0.8)',
  'rgba(255,205,86,0.8)',
];

export const SHIP_AVAILABILITY = {
  0: 'Not ready',
  1: 'Public',
  2: 'Private',
  3: 'Conditional',
};
