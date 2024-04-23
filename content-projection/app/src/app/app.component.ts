import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './auth-form/auth-form.interface';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { AuthRememberComponent } from "./auth-remember/auth-remember.component";

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
  <div>
      <auth-form 
        (submitted)="createUser($event)">
        <h3>Create account</h3>
        <button type="submit">
          Join us
        </button>
      </auth-form>
      <auth-form 
        (submitted)="loginUser($event)">
        <h3>Login</h3>
        <auth-remember
          (checked)="rememberUser($event)">
        </auth-remember>
        <button type="submit">
          Login
        </button>
      </auth-form>
    </div>
  `,
    imports: [RouterOutlet, AuthFormComponent, AuthRememberComponent]
})
export class AppComponent {
  title = 'app';
  createUser(user: User) {
    console.log('Create account', user);
  }

  loginUser(user: User) {
    console.log('Login', user);
  }

  rememberMe: boolean = false;

  rememberUser(remember: boolean) {
    this.rememberMe = remember;
  }
}
