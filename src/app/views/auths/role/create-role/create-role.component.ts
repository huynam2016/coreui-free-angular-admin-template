import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  ModalModule,
  ButtonModule,
  ModalService,
  ModalComponent,
  FormModule,
} from '@coreui/angular';
import { Subscription } from 'rxjs';
import { AnimationEvent } from '@angular/animations';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-role',
  imports: [ModalModule, ButtonModule, FormModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.scss',
})
export class CreateRoleComponent {
  @Input() initialData: any = {}; // Input to receive initial form data
  @Output() formSubmit = new EventEmitter<any>(); // Output to emit updated data

  updateForm: FormGroup;

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder) {
    this.updateForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.initialData) {
      this.updateForm.patchValue(this.initialData); // Prefill the form
    }
  }

  save(): void {
    if (this.updateForm.valid) {
      this.formSubmit.emit(this.updateForm.value); // Emit updated data
      this.bsModalRef.hide(); // Close modal
    }
  }

  cancel(): void {
    this.bsModalRef.hide(); // Close modal
  }
}
