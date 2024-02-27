import EnglishFlag from '@/assets/gb.svg';
import ThaiFlag from '@/assets/th.svg';
import { Language } from '@/types';

const FLAGS: Record<string, string> = {
  EN: EnglishFlag,
  TH: ThaiFlag,
};

export const LANGUAGES: Record<string, string> = {
  EN: 'ENGLISH',
  TH: 'THAI',
};

const getSupportLanguages = (): Language[] => {
  let result: Language[] = [];
  for (const language in LANGUAGES) {
    result.push({
      value: language,
      label: LANGUAGES[language as string],
      icon: FLAGS[language as string],
    });
  }
  return result;
};

export const SUPPORT_LANGUAGE = getSupportLanguages();
