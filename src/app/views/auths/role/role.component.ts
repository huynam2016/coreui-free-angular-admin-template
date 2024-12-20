import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import {
  RowComponent,
  ColComponent,
  GridModule,
  ModalService,
} from '@coreui/angular';
import { GridAllModule, GridComponent } from '@syncfusion/ej2-angular-grids';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import {
  ToastComponent,
  ToastPositionModel,
  ToastModule,
} from '@syncfusion/ej2-angular-notifications';
import { DataService } from '../../../_services/common/data.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateRoleComponent } from './create-role/create-role.component';
import { UpdateRoleComponent } from './update-role/update-role.component';
import { CREATE_ROLE, EDIT_ROLE, GETALL_ROLES } from './role-uri';
import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-role',
  imports: [
    CommonModule,
    RowComponent,
    ColComponent,
    GridModule,
    GridAllModule,
    TextBoxModule,
    ButtonModule,
    ToastModule,
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss',
})
export class RoleComponent implements OnInit {
  httpParams = new HttpParams();
  @ViewChild('grid', { static: true }) grid!: GridComponent;
  @ViewChild('toast', { static: true }) toast!: ToastComponent;
  position: ToastPositionModel = { X: 'Right' };
  data: any;
  bsModalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private dataService: DataService
  ) {
    this.httpParams = new HttpParams();
  }
  ngOnInit(): void {
    this.getRoles();

  }
  getRoles() {
    this.dataService.getAll(GETALL_ROLES, this.httpParams).subscribe((res: any) => {
      this.data = res.Data;
    });
  }
  create() {
    this.bsModalRef = this.modalService.show(CreateRoleComponent, {
      backdrop: 'static', // Prevent backdrop clicks
      keyboard: false, // Prevent closing the modal with the ESC key
      class: 'modal-lg', // Large modal
    });
    this.bsModalRef.content.dataOut.subscribe((dataOut: any) => {
      this.dataService.post(CREATE_ROLE, dataOut).subscribe(
        (res) => {
          if (res.IsSuccess) {
            this.toast.show({
              title: 'Create thành công!',
              cssClass: 'e-toast-success',
              icon: 'e-success toast-icons',
            });
            this.getRoles();
            this.grid.refresh();
          } else {
            this.toast.show({
              title: res.Error.Message.toString(),
              cssClass: 'e-toast-danger',
              icon: 'e-danger toast-icons',
            });
          }
        },
        (error) => console.error('Error:', error)
      );
    });
  }
  update(e: any) {
    this.bsModalRef = this.modalService.show(UpdateRoleComponent, {
      initialState: {
        dataIn: e,
        // Pass initial data to the form
      },
      backdrop: 'static', // Prevent backdrop clicks
      keyboard: false, // Prevent closing the modal with the ESC key
      class: 'modal-lg', // Large modal
    });
    this.bsModalRef.content.dataOut.subscribe((dataOut: any) => {
      // console.log('Updated Data:', dataOut); // Handle the updated data here
      this.dataService.post(EDIT_ROLE, dataOut).subscribe(
        (res) => {
          if (res.IsSuccess) {
            this.toast.show({
              title: 'Edit thành công!',
              cssClass: 'e-toast-success',
              icon: 'e-success toast-icons',
            });
            this.getRoles();
            this.grid.refresh();
          } else {
            this.toast.show({
              title: res.Error.Message.toString(),
              cssClass: 'e-toast-danger',
              icon: 'e-danger toast-icons',
            });
          }
        },
        (error) => console.error('Error:', error)
      );
    });
  }
}
