import { Component, OnInit } from '@angular/core';
import {
  RowComponent,
  ColComponent,
  GridModule,
  ModalService,
} from '@coreui/angular';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DataService } from '../../../_services/common/data.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateRoleComponent } from './create-role/create-role.component';
import { UpdateRoleComponent } from './update-role/update-role.component';
@Component({
  selector: 'app-role',
  imports: [
    RowComponent,
    ColComponent,
    GridModule,
    GridAllModule,
    TextBoxModule,
    ButtonModule,
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss',
})
export class RoleComponent implements OnInit {
  data: any;
  bsModalRef?: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private dataService: DataService
  ) {}
  ngOnInit(): void {
    this.dataService.getAll('Role/GetAll').subscribe((res: any) => {
      this.data = res.Data;
    });
  }
  openCreate(item: any) {
    this.bsModalRef = this.modalService.show(CreateRoleComponent, {
      initialState: {
        initialData: item // Pass initial data to the form
      }
    });

    this.bsModalRef.content.formSubmit.subscribe((updatedData: any) => {
      console.log('Updated Data:', updatedData); // Handle the updated data here
    });
  }
  update(e: any) {
    this.bsModalRef = this.modalService.show(UpdateRoleComponent, {
      initialState: {
       dataIn: e // Pass initial data to the form
      }
    });
  }
}
