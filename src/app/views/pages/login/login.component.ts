import { Component, ViewChild } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
} from '@coreui/angular';
import { AuthService } from '../../../_services';
import {
  ToastComponent,
  ToastPositionModel,
  ToastModule
} from '@syncfusion/ej2-angular-notifications';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    NgStyle,
    ReactiveFormsModule,
    CommonModule,
    ToastModule
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  @ViewChild('toast', { static: true }) toast!: ToastComponent;
  position: ToastPositionModel = { X: 'Right' };
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      logName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const user = this.loginForm.value;
      this.authService.login(user).subscribe((res: any)=> {
        if (!res.IsSuccess) {
          this.toast.show({
            title: res.Error.Message.toString(),
            cssClass: 'e-toast-danger',
            icon: 'e-danger toast-icons',
          });
        }
        if (res.IsSuccess) {
          this.toast.show({
            title: 'Đăng nhập thành công!',
            cssClass: 'e-toast-success',
            icon: 'e-success toast-icons',
          });
        }
      });

    } else {
      console.log('Form không hợp lệ');
      this.loginForm.markAllAsTouched();
    }
  }
}
