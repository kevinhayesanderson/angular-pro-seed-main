import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from './auth-form.interface';
import { CommonModule } from '@angular/common';
import { AuthMessageComponent } from '../auth-message/auth-message.component';

@Component({
  selector: 'auth-form',
  standalone: true,
  imports: [CommonModule, FormsModule, AuthMessageComponent],
  template:`
  <div>
      <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
       <h3>{{title}}</h3>
        <label>
          Email address
          <input type="email" name="email" ngModel #email>
        </label>
        <label>
          Password
          <input type="password" name="password" ngModel>
        </label>
        <button type="submit">{{title}}</button>
      </form>
    </div>
  `,
   styles: [`
   .email {
     border-color : #9f72e6;
   }
   `],
})
export class AuthFormComponent {
  title="Login";

  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  onSubmit(value: User) {
    console.log(`emitting ${value}`);
    this.submitted.emit(value);
  }
}
