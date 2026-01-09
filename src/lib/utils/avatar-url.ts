const DICEBEAR_STYLES = [
  'adventurer',
  'adventurer-neutral',
  'avataaars',
  'avataaars-neutral',
  'big-ears',
  'big-ears-neutral',
  'big-smile',
  'bottts',
  'bottts-neutral',
  'croodles',
  'croodles-neutral',
  'dylan',
  'fun-emoji',
  'glass',
  'icons',
  'identicon',
  'lorelei',
  'lorelei-neutral',
  'micah',
  'miniavs',
  'notionists',
  'notionists-neutral',
  'open-peeps',
  'personas',
  'pixel-art',
  'pixel-art-neutral',
  'rings',
  'shapes',
  'thumbs',
] as const;

const DICEBEAR_BACKGROUND_COLORS = [
  'ffffff',
  'fafafa',
  'f5f5f5',
  'f3f4f6', // gray-100
  'e5e7eb', // gray-200
  'eef2ff', // indigo-50
  'ecfeff', // cyan-50
  'f0fdf4', // green-50
  'fff7ed', // orange-50
  'fdf2f8', // pink-50
  'fefce8', // yellow-50
  'f8fafc', // slate-50
  'b6e3f4', // light blue
  'c0aede', // lavender
  'd1d4f9', // periwinkle
  'ffd5dc', // soft pink
  'ffdfbf', // peach
] as const;

type DiceBearStyle = (typeof DICEBEAR_STYLES)[number];

type DiceBearBackgroundColor =
  (typeof DICEBEAR_BACKGROUND_COLORS)[number];

type CreateAvatarOptions = {
  seed?: string;
  style?: DiceBearStyle;
  backgroundColor?: DiceBearBackgroundColor | 'random';
  size?: number;
  radius?: number;
};

export const createAvatar = ({
  style,
  seed,
  backgroundColor = 'random',
  size = 64,
  radius = 50,
}: CreateAvatarOptions = {}): string => {
  const avatarStyle =
    style ??
    DICEBEAR_STYLES[
      Math.floor(Math.random() * DICEBEAR_STYLES.length)
    ];

  const avatarSeed = seed ?? crypto.randomUUID();

  const AvatarBgColor =
    backgroundColor === 'random'
      ? DICEBEAR_BACKGROUND_COLORS[
          Math.floor(
            Math.random() * DICEBEAR_BACKGROUND_COLORS.length,
          )
        ]
      : backgroundColor;

  const params = new URLSearchParams({
    seed: avatarSeed,
    backgroundColor: AvatarBgColor,
    size: size.toString(),
    radius: radius.toString(),
  });

  return `https://api.dicebear.com/9.x/${avatarStyle}/svg?${params.toString()}`;
};
