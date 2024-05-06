import { Component ,OnInit,ElementRef,ViewChild} from '@angular/core';
import { GetCustomer,PostCustomer } from '../../models/customer-model';
import { CustomerService } from '../../services/customer-service/customer.service';
import { APIResponseDTO } from '../../models/api-response-model';
import { ToasterComponent } from '../shared/toaster/toaster.component';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import {GridModule} from '@progress/kendo-angular-grid';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { MatDialog } from '@angular/material/dialog';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [ToasterComponent,GridModule,CustomerFormComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit{

  @ViewChild('modalAdd') modalAdd!: BsModalRef;
  @ViewChild('modalEdit') modalEdit!: BsModalRef;

  customers: GetCustomer[] | null = [];
  title:string ="Add Customer";
  toasterMessage:string = "";
  messageType:'success' | 'danger' = "success";
  config = {
    animated:true,
    backdrop:true,
    keyboard:true,
    ignoreBackdropClick:true
  }

  skip:any = 0;
  pagesize:any = 10;
  editData:GetCustomer = new GetCustomer();

  isNew:boolean = false;

  constructor(private _customerService:CustomerService,public dialog: MatDialog,private modalService:BsModalService)
  {
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  updateData(data:any){
    this.getCustomers();
    this.close();
    if(data=='error')
      {
        this.toasterMessage = "Error updating customer";
        this.messageType = "danger";
      }
      else{
        this.toasterMessage = "Customer updated successfully";
        this.messageType = "success";
      }
  }
  getCustomers(): void {
    this._customerService.getCustomers()
      .subscribe((response: APIResponseDTO<GetCustomer[]>) => {
        if (response.isSuccess) {
          this.customers = response.entity ?? null;
          console.log(response.message); 
          console.log("Customers",this.customers); 

        } else {
          console.error(response.message); 
          this.toasterMessage = response.message;
          this.messageType = "danger";
        }
      }, error => {
        console.error('An error occurred:', error); 
      });
  }

  close(){
    if(this.isNew)
      {
    this.modalAdd.hide();
      }
      else{
        this.modalEdit.hide();
      }
  }
  addCustomer(template:any){
    this.title = "Add Customer";
    this.isNew = true;
    this.modalAdd = this.modalService.show(
      template, Object.assign({},this.config,{class:'modal-md'})
    )
    ;

    
  
  }

  editCustomer(item:any,template:any){
    this.title = "Edit Customer";
    this.isNew = false;
    this.editData = item;
    this.modalEdit = this.modalService.show(
      template, Object.assign({},this.config,{class:'modal-md'})
    )
    ;
  }
 
 

}
