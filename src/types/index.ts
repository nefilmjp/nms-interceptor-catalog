import { DATASETS } from '@/config';

/** Fixed Length Array */
export type FixedLengthArray<
  T,
  N extends number,
  A extends any[] = [], // eslint-disable-line @typescript-eslint/no-explicit-any
> = A extends {
  length: N;
}
  ? A
  : FixedLengthArray<T, N, [...A, T]>;

/** Typed Enum */
export type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

/** Int Enum */
export type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

export type OptionBool = IntRange<0, 2>;
export type Option3 = IntRange<0, 3>;

export type Color = IntRange<0, 9>;
export type Head = IntRange<0, 3>;
export type Eyes = IntRange<0, 13>;
export type Jaw = IntRange<0, 11>;
export type BodyType = IntRange<0, 4>;

/** ボディ */
export interface Core {
  /** ボディ/種類 */
  bodyType?: BodyType | undefined;
  /** ボディ/ブースター/内側 */
  bodyInnerBooster?: OptionBool | undefined;
  /** ボディ/ブースター/中央 */
  bodyMiddleBooster?: OptionBool | undefined;
  /** ボディ/ブースター/外側 */
  bodyOuterBooster?: OptionBool | undefined;
  /** ボディ/水平尾翼 */
  bodyWing?: Option3 | undefined;
  /** ボディ/サイドブースター */
  bodySideBooster?: OptionBool | undefined;
  /** ボディ/体節 */
  bodySegment?: Option3 | undefined;
  /** ボディ/バックパック */
  bodyBackpack?: OptionBool | undefined;
}

/** 上部構造/種類 */
export type TopType = IntRange<0, 10>;

/** 上部構造 */
export interface Top {
  /** 上部構造/種類 */
  topType?: TopType | undefined;
  /** 上部構造/幅広（横板/隙間ありのみ） */
  topWide?: OptionBool | undefined;
  /** 上部構造/カナード（縦板/可動/Hのみ） */
  topCanard?: OptionBool | undefined;
  /** 上部構造/先端なし（縦板/固定のみ） */
  topHalf?: OptionBool | undefined;
  /** 上部構造/ブースター */
  topBooster?: OptionBool | undefined;
  /** 上部構造/アンテナ */
  topAntenna?: OptionBool | undefined;
  /** 上部構造/フィン */
  topFin?: Option3 | undefined;
}

/** 上部構造/種類 */
export type BottomType = IntRange<0, 10>;

/** 下部構造 */
export interface Bottom {
  /** 下部構造/種類 */
  bottomType?: BottomType | undefined;
  /** 下部構造/幅広（横板/隙間ありのみ） */
  bottomWide?: OptionBool | undefined;
  /** 下部構造/先端なし（縦板/固定のみ） */
  bottomHalf?: OptionBool | undefined;
  /** 下部構造/ブースター */
  bottomBooster?: OptionBool | undefined;
  /** 下部構造/フィン */
  bottomFin?: Option3 | undefined;
}

/** スカート/種類 */
export type SkirtType = IntRange<0, 5>;

/** スカート */
export interface Skirt {
  /** スカート/種類 */
  skirtType?: SkirtType | undefined;
  /** スカート/カラー */
  skirtColored?: OptionBool | undefined;
  /** スカート/ウィングレット */
  skirtWinglet?: OptionBool | undefined;
  /** スカート/翼端ニードル */
  skirtNeedle?: OptionBool | undefined;
}

export interface Interceptor extends Core, Top, Bottom, Skirt {
  primaryColor?: Color | undefined;
  secondaryColor?: Color | undefined;
  head?: Head | undefined;
  eyes?: Eyes | undefined;
  jaw?: Jaw | undefined;
}

export interface InterceptorQuery {
  primaryColor?: (Color | -1)[] | undefined;
  secondaryColor?: (Color | -1)[] | undefined;
  head?: (Head | -1)[] | undefined;
  eyes?: (Eyes | -1)[] | undefined;
  jaw?: (Jaw | -1)[] | undefined;

  bodyType?: (BodyType | -1)[] | undefined;
  bodyInnerBooster?: (OptionBool | -1)[] | undefined;
  bodyMiddleBooster?: (OptionBool | -1)[] | undefined;
  bodyOuterBooster?: (OptionBool | -1)[] | undefined;
  bodyWing?: (Option3 | -1)[] | undefined;
  bodySideBooster?: (OptionBool | -1)[] | undefined;
  bodySegment?: (Option3 | -1)[] | undefined;
  bodyBackpack?: (OptionBool | -1)[] | undefined;

  topType?: (TopType | -1)[] | undefined;
  topWide?: (OptionBool | -1)[] | undefined;
  topCanard?: (OptionBool | -1)[] | undefined;
  topHalf?: (OptionBool | -1)[] | undefined;
  topBooster?: (OptionBool | -1)[] | undefined;
  topAntenna?: (OptionBool | -1)[] | undefined;
  topFin?: (Option3 | -1)[] | undefined;

  bottomType?: (BottomType | -1)[] | undefined;
  bottomWide?: (OptionBool | -1)[] | undefined;
  bottomHalf?: (OptionBool | -1)[] | undefined;
  bottomBooster?: (OptionBool | -1)[] | undefined;
  bottomFin?: (Option3 | -1)[] | undefined;

  skirtType?: (SkirtType | -1)[] | undefined;
  skirtColored?: (OptionBool | -1)[] | undefined;
  skirtWinglet?: (OptionBool | -1)[] | undefined;
  skirtNeedle?: (OptionBool | -1)[] | undefined;
}

//----------------------------------------------------------
// 位置情報

/** 1 to 256 */
export type Galaxy = IntRange<0, 256>;

/** Hex */
export type PortalGlyph = IntRange<0, 16>;

export type PortalAddress = FixedLengthArray<PortalGlyph, 12>;

//----------------------------------------------------------

export interface ShipData {
  //uuid: string;
  shipId: string;
  /** 公開設定（0:未設定, 1:公開, 2:未公開, 3:条件付き） */
  availability?: 0 | 1 | 2 | 3;
  /** 画像ID配列 */
  imageIds: string[];
  /** Interceptor */
  interceptor: Interceptor;
  /** データセット */
  dataset: (typeof DATASETS)[number];
  /** 0-255 */
  galaxy?: Galaxy | undefined;
  /** Portal Address (decimal) */
  address?: number | undefined;
}
