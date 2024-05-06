import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CustomerService } from './services/customer-service/customer.service';
import { InvoiceService } from './services/invoice-service/invoice.service';
import { ProductService } from './services/product-service/product.service';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import {BsModalService} from 'ngx-bootstrap/modal';


import { ModalModule } from 'ngx-bootstrap/modal';
export const BASE_URL = 'https://localhost:7008/api/';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(),
    provideClientHydration(),
    provideAnimationsAsync(),
    ModalModule,
    BsModalService,
    CustomerService,
    InvoiceService,
    ProductService,
  ]
};
