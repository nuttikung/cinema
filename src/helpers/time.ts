import { LANGUAGES } from '@/constants';

export const convertDurationHumanize = (duration: number, language: string): string => {
  const hr = language === LANGUAGES['EN'] ? 'HR' : 'ชม';
  const minute = language === LANGUAGES['EN'] ? 'MINS' : 'นาที';
  const hour = Math.floor(duration / 60);
  const minutes = (duration - hour * 60) % 60;
  return `${hour} ${hr}. ${minutes} ${minute}.`;
};
