import { LANGUAGES } from '@/constants';

type ObjectValues<T> = T[keyof T];

export type LanguageLabel = ObjectValues<typeof LANGUAGES>;

export type Language = {
  value: keyof typeof LANGUAGES;
  label: LanguageLabel;
  icon: string;
};
