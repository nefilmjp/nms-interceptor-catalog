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
export const PARTS_PRIMARY_COLOR: Record<Color, string> = {
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
export const PARTS_SECONDARY_COLOR: Record<Color, string> = {
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
export const PARTS_HEAD: Record<Head, string> = {
  0: 'Medium',
  1: 'Wide',
  2: 'Narrow',
};

/** 眼 */
export const PARTS_EYES: Record<Eyes, string> = {
  0: 'None',
  1: '2x2Dots',
  2: '3x2Dots',
  3: '3Dots/Even',
  4: '3Dots/Vertex',
  5: '4Dots',
  6: 'Visor',
  7: 'Chevron',
  8: 'Triangle/Up',
  9: 'Triangle/Down',
  10: 'Circle',
  11: 'Line',
  12: 'Radial',
};

/** 顎 */
export const PARTS_JAW: Record<Jaw, string> = {
  0: 'None',
  1: 'Casing', // 両側の覆いのみ
  2: 'Triangle',
  3: 'Pointed',
  4: 'Slope',
  5: 'Duct',
  6: 'Grill',
  7: 'Teeth/Up',
  8: 'Teeth/Down',
  9: 'Teeth/SideDown',
  10: 'Teeth/MiddleDown',
};

/** オプション/体節 */
export const PARTS_OPTION_SEGMENT: Record<0 | 1 | 2, string> = {
  0: 'None',
  1: 'Short',
  2: 'Long',
};

/** ボディ/種類 */
export const PARTS_BODY_TYPE: Record<BodyType, string> = {
  0: 'Core',
  1: 'Half',
  2: 'Stepped',
  3: 'Full',
};

/** 上部構造/種類 */
export const PARTS_TOP_TYPE: Record<TopType, string> = {
  0: 'None',
  1: 'Folding', // 折り畳み
  2: 'Horizontal/Closed', // 横板/隙間なし
  3: 'Horizontal/Open', // 横板/隙間あり
  4: 'Vertical/O-Type', // 縦板/可動/隙間なし
  5: 'Vertical/H-Type', // 縦板/可動/H
  6: 'Vertical/X-Type (Half)', // 縦板/可動/X
  7: 'Vertical/X-Type (Full)', // 縦板/可動/X
  8: 'Boxed (Half)', // 縦板/固定
  9: 'Boxed (Full)', // 縦板/固定
};

/** オプション/フィン */
export const PARTS_OPTION_FIN: Record<0 | 1 | 2, string> = {
  0: 'None',
  1: 'Fin',
  2: 'Pod',
};

/** 下部構造/種類 */
export const PARTS_BOTTOM_TYPE: Record<BottomType, string> = {
  0: 'None',
  1: 'Legs', // 脚
  2: 'Horizontal/Closed', // 横板/隙間なし
  3: 'Horizontal/Open', // 横板/隙間あり/可動
  4: 'Vertical/O-Type', // 縦板/可動/隙間なし
  5: 'Vertical/H-Type', // 縦板/可動/H
  6: 'Vertical/X-Type (Half)', // 縦板/可動/X
  7: 'Vertical/X-Type (Full)', // 縦板/可動/X
  8: 'Boxed (Half)', // 縦板/固定
  9: 'Boxed (Full)', // 縦板/固定
};

/** スカート/種類 */
export const PARTS_SKIRT_TYPE: Record<SkirtType, string> = {
  0: 'None',
  1: 'Stepped', // 段付き
  2: 'Pointed', // 三角
  3: 'Blunted', // 台形
  4: 'Vented', // 吸気口つき
};

export const PARTS_DEFAULT = {
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
  backpackLabel: 'Backpack',
  wingLabel: 'Wing',
};
