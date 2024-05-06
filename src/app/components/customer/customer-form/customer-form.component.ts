import { Component ,OnInit,Input,Output,EventEmitter} from '@angular/core';
import { GetCustomer,PostCustomer } from '../../../models/customer-model';
import { CustomerService } from '../../../services/customer-service/customer.service';
import { APIResponseDTO } from '../../../models/api-response-model';
import { ToasterComponent } from '../../shared/toaster/toaster.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [ReactiveFormsModule,ToasterComponent,MatInputModule,MatButtonModule,MatFormFieldModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent implements OnInit{
  @Input() isNew!: boolean;
  @Input() editData!: GetCustomer;


  @Output() outputEvent: EventEmitter<any> = new EventEmitter<any>();
  toasterMessage:string = "";
  messageType:'success' | 'danger' = "success";

  public form !:FormGroup;
  customer: PostCustomer = new PostCustomer();

  updateId!:number;
  constructor(private _customerService:CustomerService,private fb:FormBuilder){

  }

  ngOnInit(): void {

    console.log('is New',this.isNew);
    console.log('Data',this.editData);


    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],

    });

    if(!this.isNew && this.editData)
      {
        this.patchValuesToForm();
      }
  }
  patchValuesToForm(): void {
    const { customerName, email, phoneNumber } = this.editData;
    this.updateId = this.editData.id;
    this.form.patchValue({
      name: customerName,
      email: email,
      phoneNumber: phoneNumber
    });
  }
  submit()
  {
    if (this.form.valid) {
      this.customer.customerName = this.form.value.name;
      this.customer.email = this.form.value.email;
      this.customer.phoneNumber = this.form.value.phoneNumber;
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
    this._customerService.addCustomer(this.customer)
      .subscribe((response: APIResponseDTO<GetCustomer>) => {
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
    this._customerService.updateCustomer(this.customer,this.updateId)
      .subscribe((response: APIResponseDTO<GetCustomer>) => {
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
