import { Component, inject } from '@angular/core';
import { Theme } from '../../core/services/theme';
import { LanguageService } from '../../core/i18n/language.service';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-header',
  imports: [TranslocoPipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly theme = inject(Theme);
  protected language = inject(LanguageService);
}
