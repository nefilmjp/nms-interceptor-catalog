import {
  BodyType,
  BottomType,
  Color,
  Eyes,
  Head,
  Jaw,
  SkirtType,
  TopType,
} from '@/types';

/** カラー */
const PARTS_PRIMARY_COLOR: Record<Color, string> = {
  0: 'Dark purple',
  1: 'White',
  2: 'Orange',
  3: 'Red',
  4: 'Blue',
  5: 'Green',
  6: 'Yellow',
  7: 'Pink',
  8: 'Gray',
};

/** カラー */
const PARTS_SECONDARY_COLOR: Record<Color, string> = {
  0: 'Unused',
  1: 'White',
  2: 'Orange',
  3: 'Red',
  4: 'Blue',
  5: 'Green',
  6: 'Yellow',
  7: 'Pink',
  8: 'Gray',
};

/** 頭 */
const PARTS_HEAD: Record<Head, string> = {
  0: 'Cylon',
  1: 'Wide',
  2: 'Narrow',
};

/** 眼 */
const PARTS_EYES: Record<Eyes, string> = {
  0: 'None',
  1: 'Quadra Spot',
  2: 'Octa Spot',
  3: 'Nu',
  4: 'Asos',
  5: 'Quadra Dot',
  6: 'Pi',
  7: 'Upsilon',
  8: 'Delta',
  9: 'Tau',
  10: 'Omicron',
  11: 'Linea',
  12: 'Lambda',
};

/** 顎 */
const PARTS_JAW: Record<Jaw, string> = {
  0: 'None',
  1: 'Ant', // 両側の覆いのみ
  2: 'Slope',
  3: 'Pointed',
  4: 'Plough',
  5: 'Duct',
  6: 'Grill',
  7: 'Teeth',
  8: 'Widow',
  9: 'Mantis',
  10: 'Scorpion',
};

/** オプション/体節 */
const PARTS_OPTION_SEGMENT: Record<0 | 1 | 2, string> = {
  0: 'None',
  1: 'Spine',
  2: 'Long Spine',
};

/** ボディ/種類 */
const PARTS_BODY_TYPE: Record<BodyType, string> = {
  0: 'Base',
  1: 'Pommel',
  2: 'Hilt',
  3: 'Guard',
};

/** 上部構造/種類 */
const PARTS_TOP_TYPE: Record<TopType, string> = {
  0: 'None',
  1: 'U-Wing', // 折り畳み
  2: 'I-Wing Closed', // 横板/隙間なし
  3: 'I-Wing Open', // 横板/隙間あり
  4: 'X-Wing Closed', // 縦板/可動/隙間なし
  5: 'X-Wing', // 縦板/可動/H
  6: 'X-Wing Rear/Full', // 縦板/可動/X
  7: 'Carriage', // 縦板/固定
};

/** オプション/フィン */
const PARTS_OPTION_FIN: Record<0 | 1 | 2, string> = {
  0: 'None',
  1: 'Fin',
  2: 'Pod Fin',
};

/** 下部構造/種類 */
const PARTS_BOTTOM_TYPE: Record<BottomType, string> = {
  0: 'None',
  1: 'Tank', // 脚
  2: 'I-Wing Closed', // 横板/隙間なし
  3: 'I-Wing Open', // 横板/隙間あり/可動
  4: 'X-Wing Closed', // 縦板/可動/隙間なし
  5: 'X-Wing', // 縦板/可動/H
  6: 'X-Wing Rear/Full', // 縦板/可動/X
  7: 'Carriage', // 縦板/固定
};

/** スカート/種類 */
const PARTS_SKIRT_TYPE: Record<SkirtType, string> = {
  0: 'None',
  1: 'Shard', // 段付き
  2: 'Pointed', // 三角
  3: 'Wedge', // 台形
  4: 'Vented', // 吸気口つき
};

export const PARTS_NMSGE = {
  primaryColor: PARTS_PRIMARY_COLOR,
  secondaryColor: PARTS_SECONDARY_COLOR,
  bodyType: PARTS_BODY_TYPE,
  topType: PARTS_TOP_TYPE,
  bottomType: PARTS_BOTTOM_TYPE,
  skirtType: PARTS_SKIRT_TYPE,
  head: PARTS_HEAD,
  eyes: PARTS_EYES,
  jaw: PARTS_JAW,
  segment: PARTS_OPTION_SEGMENT,
  fin: PARTS_OPTION_FIN,
  backpackLabel: 'Stinger',
  wingLabel: 'Elytra',
};
