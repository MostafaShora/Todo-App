import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.css',
})
export class ConfirmModal {

  title = input('Delete Task');
  message = input('Are you sure?');

  confirm = output<void>();
  cancel = output<void>();
}
