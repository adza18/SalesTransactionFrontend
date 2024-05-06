import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../app.config';
import { Observable,map,catchError,of } from 'rxjs';
import { GetCustomer, PostCustomer } from '../../models/customer-model';
import { APIResponseDTO } from '../../models/api-response-model';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public _baseURL : string = BASE_URL;
  public _getCustomerUrl : string = "customer/GetCustomers";
  public _getCustomerByIdUrl : string = "customer/GetCustomerById";
  public _updateCustomerUrl : string = "customer/UpdateCustomer";
  public _addCustomerUrl : string = "customer/AddCustomer";
  public _deleteCustomerUrl : string = "customer/DeleteCustomer";



  

  constructor(private http:HttpClient) { }



  getCustomers(): Observable<APIResponseDTO<GetCustomer[]>> {
    return this.http.get<APIResponseDTO<GetCustomer[]>>(`${this._baseURL}${this._getCustomerUrl}`);
  }
  
  getCustomerById(id: number): Observable<APIResponseDTO<GetCustomer>> {
    let url = `${this._baseURL}${this._getCustomerByIdUrl}/${id}`;
    return this.http.get<APIResponseDTO<GetCustomer>>(url);
  }

  addCustomer(obj: PostCustomer): Observable<APIResponseDTO<GetCustomer>> {
    let url = this._baseURL + this._addCustomerUrl;

    return this.http.post<APIResponseDTO<GetCustomer>>(url,obj);
  }

  updateCustomer(obj: PostCustomer,id:number): Observable<APIResponseDTO<GetCustomer>> {
    let url = `${this._baseURL}${this._updateCustomerUrl}/${id}`;


    return this.http.put<APIResponseDTO<GetCustomer>>(url,obj);
  }

  
  deleteCustomer(id: number): Observable<any> {
    let url = `${this._baseURL}${this._deleteCustomerUrl}/${id}`;


    return this.http.delete<any>(url);
  }
}
