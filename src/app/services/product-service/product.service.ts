import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../app.config';
import { Observable,map,catchError,of } from 'rxjs';
import { GetProduct,PostProduct } from '../../models/product-model';
import { APIResponseDTO } from '../../models/api-response-model';
import { HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public _baseURL : string = BASE_URL;
  public _GetProductUrl : string = "product/GetProducts";
  public _GetProductByIdUrl : string = "product/GetProductById";
  public _updateproductUrl : string = "product/Updateproduct";
  public _addproductUrl : string = "product/Addproduct";
  public _deleteproductUrl : string = "product/Deleteproduct";



  

  constructor(private http:HttpClient) { }



  GetProducts(): Observable<APIResponseDTO<GetProduct[]>> {
    return this.http.get<APIResponseDTO<GetProduct[]>>(`${this._baseURL}${this._GetProductUrl}`);
  }
  
  GetProductById(id: number): Observable<APIResponseDTO<GetProduct>> {
    let url = `${this._baseURL}${this._GetProductByIdUrl}/${id}`;
    return this.http.get<APIResponseDTO<GetProduct>>(url);
  }

  addproduct(obj: PostProduct): Observable<APIResponseDTO<GetProduct>> {
    let url = this._baseURL + this._addproductUrl;

    return this.http.post<APIResponseDTO<GetProduct>>(url,obj);
  }

  updateproduct(obj: PostProduct,id:number): Observable<APIResponseDTO<GetProduct>> {
    let url = `${this._baseURL}${this._updateproductUrl}/${id}`;


    return this.http.put<APIResponseDTO<GetProduct>>(url,obj);
  }

  
  deleteproduct(id: number): Observable<any> {
    let url = `${this._baseURL}${this._deleteproductUrl}/${id}`;


    return this.http.delete<any>(url);
  }
}
