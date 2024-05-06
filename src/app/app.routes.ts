import { Routes } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import { ProductComponent } from './components/product/product.component';
import { SalesTransactionComponent } from './components/sales-transaction/sales-transaction.component';

export const routes: Routes = [
    { path: 'customers', component: CustomerComponent },
    { path: 'products', component: ProductComponent },
    { path: 'sales', component: SalesTransactionComponent },


];
