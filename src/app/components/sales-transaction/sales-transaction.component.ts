import { Component ,OnInit,ElementRef,ViewChild} from '@angular/core';
import { SelectableSettings } from '@progress/kendo-angular-grid';
import { CheckboxColumnComponent } from '@progress/kendo-angular-grid';
import {BsModalService} from 'ngx-bootstrap/modal';
import { APIResponseDTO } from '../../models/api-response-model';
import { CustomerService } from '../../services/customer-service/customer.service';
import { ProductService } from '../../services/product-service/product.service';
import { GetCustomer } from '../../models/customer-model';
import { GetProduct } from '../../models/product-model';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
  import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GridModule } from '@progress/kendo-angular-grid';
import { InvoiceService } from '../../services/invoice-service/invoice.service';
import { ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { GetSales, PostSales } from '../../models/sales-transaction';
@Component({
  selector: 'app-sales-transaction',
  standalone: true,
  imports: [CommonModule,GridModule,ReactiveFormsModule,MatInputModule,MatSelectModule,MatButtonModule,MatFormFieldModule,MatOptionModule],
  templateUrl: './sales-transaction.component.html',
  styleUrl: './sales-transaction.component.css'
})
export class SalesTransactionComponent implements OnInit{


  customerList : GetCustomer[] | null = [];
  productList : GetProduct[] |null= [];


  salesList : GetSales[] | null = [];

  toasterMessage:string = "";
  messageType:'success' | 'danger' = "success";

  quantity:number = 0;
  public form !:FormGroup;

  listRow :[] = [];

  postSales: PostSales = new PostSales();
  skip:any = 0;
  pagesize:any = 10;
  selectedIds: { customerId: number, invoiceId: number }[] = [];
  public selectableSettings: SelectableSettings = {
    enabled: true,
    mode:'multiple',

    checkboxOnly: true
};

  constructor(private modalService:BsModalService,private fb:FormBuilder,private _customerService:CustomerService,private _productService:ProductService,private _salesTransactionService:InvoiceService){}
  ngOnInit(): void {
    this.form = this.fb.group({
      customerId: [0, Validators.required],
      productId: [0, [Validators.required,Validators.min(1)]],
      quantity: [1, [Validators.required,Validators.min(1)]],

    });
    this.getCustomers();
    this.getProducts();
    this.getSales();


   
    

 
    
  }
  getSales()
  {

    
    this._salesTransactionService.getSales()
    .subscribe((response: APIResponseDTO<GetSales[]>) => {
      if (response.isSuccess) {
        this.salesList = response.entity ?? null;
        console.log(response.message); 


      } else {
        console.error(response.message); 
        this.toasterMessage = response.message;
        this.messageType = "danger";
      }
    }, error => {
      console.error('An error occurred:', error); 
    });
  }
getProducts()
{

  this._productService.GetProducts()
  .subscribe((response: APIResponseDTO<GetProduct[]>) => {
    if (response.isSuccess) {
      this.productList = response.entity ?? null;
      this.productList = this.productList?.filter((x : GetProduct) => x.quantity > 0) ?? null;
      console.log(response.message); 
console.log('Products',this.productList);


    } else {
      console.error(response.message); 
      this.toasterMessage = response.message;
      this.messageType = "danger";
    }
  }, error => {
    console.error('An error occurred:', error); 
  });
}
getCustomers(): void {
  this._customerService.getCustomers()
    .subscribe((response: APIResponseDTO<GetCustomer[]>) => {
      if (response.isSuccess) {
        this.customerList = response.entity ?? null;
        console.log(response.message); 

      } else {
        console.error(response.message); 
        this.toasterMessage = response.message;
        this.messageType = "danger";
      }
    }, error => {
      console.error('An error occurred:', error); 
    });
}

  createSale(model:any)
  {
    this._salesTransactionService.createSales(model)
    .subscribe((response: APIResponseDTO<GetSales[]>) => {
      if (response.isSuccess) {
        let res = response.entity ?? null;
        console.log(response.message); 
        
      this.form.reset();
        this.toasterMessage = "Added successfully";
        this.messageType = "success";
        this.getSales();



      } else {
        console.error(response.message); 
        this.toasterMessage = "Error while adding";
        this.messageType = "danger";
      this.form.reset();

        this.getSales();




      }
    }, error => {
      console.error('An error occurred:', error); 
      this.toasterMessage = "Error while adding";
      this.messageType = "danger";
      this.form.reset();

      this.getSales();




    });
  }
  submit()
  {
    if(this.form.valid)
      {
        this.postSales.customerId = this.form.value.customerId;
      this.postSales.productId = this.form.value.productId;
      this.postSales.quantity = this.form.value.quantity;
      this.createSale(this.postSales);
      }
      else{
        this.toasterMessage = "Form is invalid";
        this.messageType = "danger";
      }
  }
  onRowSelect(selection: any) {
    console.log('SELECIOM',selection.selectedRows);
    const selectedData = selection.selectedRows
    .filter((item: any) => !item.dataItem.hasInvoice) 
    .map((item: any) => ({
      customerId: item.dataItem.customerId,
      invoiceId: item.dataItem.id
    }));
  
  this.selectedIds = this.selectedIds.concat(selectedData);
  
    console.log('Selected IDs:', this.selectedIds);
  }

  generateInvoicePdf()
  {
    
    this._salesTransactionService.generateInvoicePdf(this.selectedIds).subscribe(
      (res: Blob) => {
        const url = window.URL.createObjectURL(res);
      
        window.open(url, '_blank','Invoice');
        // window.location.href = url; 
  
        window.URL.revokeObjectURL(url);

    
      },
      (error) => {
        console.error('Error generating invoice:', error);
      }
    );
  }
  generateInvoice()
  {
    if(this.selectedIds.length >0)
      {
        this._salesTransactionService.generateInvoice(this.selectedIds).subscribe((res)=>{
          console.log(res);
        })
      }
      else{
        this.messageType = 'danger';
        this.toasterMessage = 'select values which does not have invoice';
      }

  }

  isSelectionEnabled(row:any) : boolean
  {
    console.group('row',row);
    return true;

  }

}
