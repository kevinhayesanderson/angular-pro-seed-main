import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './auth-form/auth-form.interface';
import { AuthFormComponent } from "./auth-form/auth-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
  <div>
    <!-- <auth-form (submitted)="loginUser($event)"></auth-form> -->
    <div #entry><div>
    
  </div>
  `,
  imports: [RouterOutlet, AuthFormComponent],
})
export class AppComponent {
  title = 'app';

  @ViewChild("entry", { read: ViewContainerRef, static: true }) entry!: ViewContainerRef;

  constructor(private viewContainer: ViewContainerRef) { }

  ngOnInit(): void {
    this.entry.createComponent(AuthFormComponent);
    //this.viewContainer.createComponent(AuthFormComponent); //loading at end
  }

  loginUser(user: User) {
    console.log('Login', user);
  }
}
