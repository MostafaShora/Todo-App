import { provideTransloco, TranslocoLoader } from '@jsverse/transloco';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);

  getTranslation(lang: string) {
    return this.http.get<Record<string, string>>(
      `/assets/i18n/${lang}.json`
    );
  }
}

export const provideAppTransloco = () =>
  provideTransloco({
    config: {
      availableLangs: ['en', 'ar'],
      defaultLang: 'en',
      fallbackLang: 'en',

      reRenderOnLangChange: true,

      prodMode: false,
    },

    loader: TranslocoHttpLoader,
  });