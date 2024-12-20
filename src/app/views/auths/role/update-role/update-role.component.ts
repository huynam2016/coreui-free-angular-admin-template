import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';
import { CheckBoxSelectionService, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../../../../_services';

@Component({
  selector: 'app-update-role',
  imports: [
    ButtonModule,
    TextBoxModule,
    TextAreaModule,
    GridAllModule,
    CheckBoxModule,
    MultiSelectModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './update-role.component.html',
  styleUrl: './update-role.component.scss',
  providers: [CheckBoxSelectionService],
})
export class UpdateRoleComponent implements OnInit {
  title = 'Sửa vai trò';
  @Input() dataIn: any = {};
  @Output() dataOut = new EventEmitter<any>();
  form!: FormGroup;
  data: any;
  dataFeilds: Object = { text: 'DisplayName', value: 'Id' };
  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private dataService: DataService
  ) {
    this.createForm();
    this.getPermissions();
  }
  ngOnInit(): void {
    if (this.dataIn) {
      this.form.patchValue(this.dataIn); // Prefill the form
    }
  }
  createForm() {
    this.form = this.fb.group({
      Id: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      PermissionIds: ['', [Validators.required]],
      IsActive: ['', [Validators.required]]
    });
  }
  cancel() {
    this.bsModalRef.hide();
  }
  save() {
    if (this.form.valid) {
      this.dataOut.emit(this.form.value); // Emit updated data
      this.bsModalRef.hide(); // Close modal
    }
  }
  getPermissions() {
    this.dataService.getAll('Permission/GetAll').subscribe((res: any) => {
      this.data = res.Data;
    });
  }
}
