import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-base-button',
  templateUrl: './base-button.component.html',
  styleUrls: ['./base-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
}
