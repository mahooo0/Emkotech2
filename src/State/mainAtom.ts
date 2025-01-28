// state/languageState.ts
import { atom } from 'recoil';

export const languageState = atom<string>({
    key: 'languageState', // unique ID
    default:
        typeof window !== 'undefined'
            ? localStorage.getItem('accept-language') || 'en'
            : 'en', // Default to 'en' if SSR
});
