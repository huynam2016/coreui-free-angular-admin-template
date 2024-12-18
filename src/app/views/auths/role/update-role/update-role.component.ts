import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ButtonModule } from '@coreui/angular';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-update-role',
  imports: [ButtonModule,TextBoxModule,TextAreaModule, ReactiveFormsModule, CommonModule],
  templateUrl: './update-role.component.html',
  styleUrl: './update-role.component.scss',
})
export class UpdateRoleComponent implements OnInit {
  @Input() dataIn: any = {};
  @Output() dataOut = new EventEmitter<any>();
  form!: FormGroup;
  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder) {
    this.createForm();
  }
  ngOnInit(): void {
    console.log(this.dataIn);
  }
  createForm() {
    this.form = this.fb.group({
      Name: ['', [Validators.required]],
      Description: ['', [Validators.required]],
    });
  }
  cancel() {
    this.bsModalRef.hide();
  }
  save() {}
}
