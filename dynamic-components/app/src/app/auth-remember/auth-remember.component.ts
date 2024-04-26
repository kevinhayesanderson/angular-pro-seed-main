import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'auth-remember',
  standalone: true,
  imports: [],
  template: `
  <label>
      <input type="checkbox" (change)="onChecked($event)">
      Keep me logged in
    </label>
  `
})
export class AuthRememberComponent {
  @Output() checked: EventEmitter<boolean> = new EventEmitter<boolean>();

  onChecked(event: any) {
    this.checked.emit(event.target.checked);
  }
}
