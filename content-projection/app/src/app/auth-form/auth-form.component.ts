import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, AfterContentInit, ContentChildren, QueryList, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from './auth-form.interface';
import { AuthRememberComponent } from '../auth-remember/auth-remember.component';
import { AuthMessageComponent } from "../auth-message/auth-message.component";


@Component({
  selector: 'auth-form',
  standalone: true,
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
        <ng-content select="auth-remember"> <!-- content child -->
        </ng-content>
        <!-- <div *ngIf="showMessage">You will be logged in for 30 days</div> -->
        <auth-message 
        [style.display]="(showMessage ? 'inherit':'none')"> <!-- view child  -->
        </auth-message>
        <ng-content select="button"></ng-content>
      </form>
    </div>
  `,
  imports: [CommonModule, FormsModule, AuthMessageComponent]
})
export class AuthFormComponent implements AfterContentInit, AfterViewInit {

  @ViewChild(AuthMessageComponent) messageComponent!: AuthMessageComponent;

  ngAfterViewInit(): void {
    //console.log(this.messageComponent);
  }

  showMessage: boolean = false;

  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  @ContentChildren(AuthRememberComponent)
  rememberComponents!: QueryList<AuthRememberComponent>;


  ngAfterContentInit(): void {

    if (this.messageComponent) {
      this.messageComponent.days = 30;
    }

    if (this.rememberComponents) {
      console.log(this.rememberComponents);
      this.rememberComponents.forEach(component => {
        component.checked.subscribe((checked: boolean) => this.showMessage = checked);
      });
      //this.rememberComponent.checked.subscribe((checked:boolean) => this.showMessage = checked );
    }
  }

  onSubmit(value: User) {
    console.log(`emitting ${value}`);
    this.submitted.emit(value);
  }

}
