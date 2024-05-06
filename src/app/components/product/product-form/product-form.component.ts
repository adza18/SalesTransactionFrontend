import { Component ,OnInit,Input,Output,EventEmitter} from '@angular/core';
import { APIResponseDTO } from '../../../models/api-response-model';
import { ToasterComponent } from '../../shared/toaster/toaster.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GetProduct,PostProduct } from '../../../models/product-model';
import { ProductService } from '../../../services/product-service/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule,ToasterComponent,MatInputModule,MatButtonModule,MatFormFieldModule],

  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit{
  @Input() isNew!: boolean;
  @Input() editData!: GetProduct;


  @Output() outputEvent: EventEmitter<any> = new EventEmitter<any>();
  toasterMessage:string = "";
  messageType:'success' | 'danger' = "success";

  public form !:FormGroup;
  product: PostProduct = new PostProduct();

  updateId!:number;
  constructor(private _productService:ProductService,private fb:FormBuilder){

  }

  ngOnInit(): void {



    this.form = this.fb.group({
      name: ['', Validators.required],
      quantity: [0, [Validators.required,Validators.min(1)]],
      price: [0, [Validators.required,Validators.min(10)]],

    });

    if(!this.isNew && this.editData)
      {
        this.patchValuesToForm();
      }
  }
  patchValuesToForm(): void {
    console.log('edit date',this.editData);
    const { name, quantity, price } = this.editData;
    this.updateId = this.editData.id;
    this.form.patchValue({
      name: name,
      quantity: quantity,
      price: price
    });
  }
  submit()
  {
    if (this.form.valid) {
      this.product.name = this.form.value.name;
      this.product.quantity = this.form.value.quantity;
      this.product.price = this.form.value.price;
      if(this.isNew)
        {
          this.saveCustomer();
        }
        else{
          this.updateCustomer();
        }
    } else {
    }
  }

  saveCustomer(): void {
    this._productService.addproduct(this.product)
      .subscribe((response: APIResponseDTO<GetProduct>) => {
        if (response.isSuccess) {
          let res = response.entity ?? null;
          this.toasterMessage = response.message;
          console.log(response.message); 
          this.outputEvent.emit('success');

        } else {
          console.error(response.message); 
          this.outputEvent.emit('error');

        }
      }, error => {
        console.error('An error occurred:', error); 
        this.outputEvent.emit('error');

      });
  }

  updateCustomer(): void {
    this._productService.updateproduct(this.product,this.updateId)
      .subscribe((response: APIResponseDTO<GetProduct>) => {
        if (response.isSuccess) {
          let res = response.entity ?? null;
          console.log(response.message); 
          this.outputEvent.emit('success');



        } else {
          console.error(response.message); 
        this.outputEvent.emit('error');

        }
      }, error => {
        console.error('An error occurred:', error); 
        this.outputEvent.emit('error');

      });
  }
  

}

