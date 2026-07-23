import { Injectable, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
    providedIn: 'root',
})
export class LanguageService {
    private transloco = inject(TranslocoService);

    private readonly STORAGE_KEY = 'language';

    constructor() {
        const lang = localStorage.getItem(this.STORAGE_KEY) || 'en';
        this.setLanguage(lang)
    }

    get currentLanguage() {
        return this.transloco.getActiveLang();
    }

    toggleLanguage() {
        this.setLanguage(this.currentLanguage === 'en' ? 'ar' : 'en');
    }

    setLanguage(lang: string) {
        this.transloco.setActiveLang(lang);

        localStorage.setItem(this.STORAGE_KEY, lang);

        document.documentElement.lang = lang;

        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
}