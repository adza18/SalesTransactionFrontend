import { Component ,OnInit,ElementRef,ViewChild} from '@angular/core';
import { APIResponseDTO } from '../../models/api-response-model';
import { ToasterComponent } from '../shared/toaster/toaster.component';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import {GridModule} from '@progress/kendo-angular-grid';
import { MatDialog } from '@angular/material/dialog';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {BsModalService} from 'ngx-bootstrap/modal';
import { ProductFormComponent } from './product-form/product-form.component';
import { GetProduct } from '../../models/product-model';
import { ProductService } from '../../services/product-service/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ToasterComponent,GridModule,ProductFormComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  @ViewChild('modalAdd') modalAdd!: BsModalRef;
  @ViewChild('modalEdit') modalEdit!: BsModalRef;

  products: GetProduct[] | null = [];
  title:string ="Add Product";
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
  editData:GetProduct = new GetProduct();

  isNew:boolean = false;

  constructor(private _productService:ProductService,public dialog: MatDialog,private modalService:BsModalService)
  {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  updateData(data:any){
    this.getProducts();
    this.close();
    if(data=='error')
      {
        this.toasterMessage = "Error updating customer";
        this.messageType = "danger";
      }
      else{
        this.toasterMessage = "Product updated successfully";
        this.messageType = "success";
      }
  }
  getProducts(): void {
    this._productService.GetProducts()
      .subscribe((response: APIResponseDTO<GetProduct[]>) => {
        if (response.isSuccess) {
          this.products = response.entity ?? null;
          console.log(response.message); 
          console.log("Products",this.products); 

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
  addProduct(template:any){
    this.title = "Add Product";
    this.isNew = true;
    this.modalAdd = this.modalService.show(
      template, Object.assign({},this.config,{class:'modal-md'})
    )
    ;

    
  
  }

  editProduct(item:any,template:any){
    this.title = "Edit Product";
    this.isNew = false;
    this.editData = item;
   
    this.modalEdit = this.modalService.show(
      template, Object.assign({},this.config,{class:'modal-md'})
    )
    ;
  }
 
 

}


