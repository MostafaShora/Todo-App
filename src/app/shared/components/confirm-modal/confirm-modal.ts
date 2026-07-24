import { Component, inject, input, output } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LanguageService } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-confirm-modal',
  imports: [TranslocoPipe],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.css',
})
export class ConfirmModal {

  protected language = inject(LanguageService);


  title = input('Delete Task');
  message = input('Are you sure?');

  confirm = output<void>();
  cancel = output<void>();
}
