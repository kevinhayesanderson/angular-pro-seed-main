import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
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
    <button (click)="destroyComponent()">Destroy</button>
  </div>
  `,
  imports: [RouterOutlet, AuthFormComponent],
})
export class AppComponent {
  title = 'app';

  @ViewChild("entry", { read: ViewContainerRef, static: true }) entry!: ViewContainerRef;

  componentRef!: ComponentRef<AuthFormComponent>;

  constructor(private viewContainer: ViewContainerRef) { }

  ngOnInit(): void {
    this.componentRef = this.entry.createComponent(AuthFormComponent);
    this.componentRef.instance.title = "Create Account";
    this.componentRef.instance.submitted.subscribe(this.loginUser);
    //this.viewContainer.createComponent(AuthFormComponent); //loading at end
  }

  loginUser(user: User) {
    console.log('Login', user);
  }

  destroyComponent() {
    this.componentRef?.destroy();
  }
}
