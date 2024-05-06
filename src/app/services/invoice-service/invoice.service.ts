import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../app.config';
import { GetSales, PostSales } from '../../models/sales-transaction';
import { Observable } from 'rxjs';
import { APIResponseDTO } from '../../models/api-response-model';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  public _baseURL : string = BASE_URL;
  public _postTransaction : string = "salesTransaction/CreateSales";
  public _getTransaction : string = "salesTransaction/GetSales";
  public _generateInvoiceUrl:string = "invoice/GenerateInvoice";
  public _generateInvoicePdfUrl:string = "invoice/GenerateInvoicePdf";


  constructor(private http:HttpClient) { }


  createSales(model:PostSales): Observable<APIResponseDTO<GetSales[]>> {
    return this.http.post<APIResponseDTO<GetSales[]>>(`${this._baseURL}${this._postTransaction}`,model);
  }

  getSales(): Observable<APIResponseDTO<GetSales[]>> {
    return this.http.get<APIResponseDTO<GetSales[]>>(`${this._baseURL}${this._getTransaction}`);
  }

  generateInvoice(model:any[]):Observable <APIResponseDTO<any[]>> {
    return this.http.post<APIResponseDTO<any[]>>(`${this._baseURL}${this._generateInvoiceUrl}`,model);
  }

  generateInvoicePdf(model:any[]):Observable<Blob> {
    const apiUrl = this._baseURL + this._generateInvoicePdfUrl;


    return this.http.post(apiUrl, model,{ responseType: 'blob' });
  }

}
