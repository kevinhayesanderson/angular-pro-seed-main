import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from './auth-form.interface';

@Component({
  selector: 'auth-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div>
      <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
        <ng-content select="h3"></ng-content>
        <label>
          Email address
          <input type="email" name="email" ngModel>
        </label>
        <label>
          Password
          <input type="password" name="password" ngModel>
        </label>
        <ng-content select="auth-remember"></ng-content>
        <ng-content select="button"></ng-content>
      </form>
    </div>
  `
})
export class AuthFormComponent {
  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  onSubmit(value: User) {
    console.log(`emitting ${value}`);
    this.submitted.emit(value);
  }
}
