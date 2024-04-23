import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './auth-form/auth-form.interface';
import { AuthFormComponent } from './auth-form/auth-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthFormComponent],
  template:`
  <div>
      <auth-form 
        (submitted)="createUser($event)">
        <h3>Create account</h3>
      </auth-form>
      <auth-form (submitted)="loginUser($event)">
        <h3>Login</h3>
      </auth-form>
    </div>
  `
})
export class AppComponent {
  title = 'app';
  createUser(user: User) {
    console.log('Create account', user);
  }

  loginUser(user: User) {
    console.log('Login', user);
  }
}
