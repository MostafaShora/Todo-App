import { Component, inject } from '@angular/core';
import { Theme } from '../../core/services/theme';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly theme = inject(Theme);
}
