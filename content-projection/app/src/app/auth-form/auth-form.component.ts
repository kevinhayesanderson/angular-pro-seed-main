import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, AfterContentInit, ContentChildren, QueryList, ViewChild, AfterViewInit, ViewChildren, ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
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
          <input type="email" name="email" ngModel #email>
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
        <auth-message 
        [style.display]="(showMessage ? 'inherit':'none')"> <!-- view child  -->
        </auth-message>
        <auth-message 
        [style.display]="(showMessage ? 'inherit':'none')"> <!-- view child  -->
        </auth-message>
        <ng-content select="button"></ng-content>
      </form>
    </div>
  `,
  styles: [`
  .email {
    border-color : #9f72e6;
  }
  `],
  imports: [CommonModule, FormsModule, AuthMessageComponent]
})
export class AuthFormComponent implements AfterContentInit, AfterViewInit {

  @ViewChild('email') email!: ElementRef;

  @ViewChildren(AuthMessageComponent) messageComponents!: QueryList<AuthMessageComponent>;

  ngAfterViewInit(): void {
    //console.log(this.messageComponent);
    //console.log(this.email.nativeElement);

    //nativeElement only works on web//
    // this.email.nativeElement.setAttribute('placeholder', 'Enter your email address');
    // this.email.nativeElement.classList.add('email');
    // this.email.nativeElement.focus();

    //for platform agnostic, use renderer to modify elements
    this.renderer.setAttribute(this.email.nativeElement, "placeholder", "Enter your email address");
    this.renderer.addClass(this.email.nativeElement, "email");
    this.renderer.selectRootElement(this.email.nativeElement).focus();

    if (this.messageComponents) {
      this.messageComponents.forEach(component => {
        component.days = 30;
      })
      this.cd.detectChanges();
    }


  }

  constructor(private cd: ChangeDetectorRef, private renderer: Renderer2) {
  }

  showMessage: boolean = false;

  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  @ContentChildren(AuthRememberComponent)
  rememberComponents!: QueryList<AuthRememberComponent>;

  ngAfterContentInit(): void {

    // if (this.messageComponent) {
    //   this.messageComponent.days = 30;
    // }

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
