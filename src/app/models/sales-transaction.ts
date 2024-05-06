export class PostSales {


    constructor(
        public customerId:any = null,
        public productId:any = null,
        public quantity:any = null,

    ) {}
   
    
}

export class GetSales {


    constructor(
        public Id:any = null,
        public customerId:any = null,
        public productId:any = null,
        public customerName:any = null,
        public productName:any = null,
        public quantity:any = null,
        public total:any = null,
        public createdDate:any = null,
        public hasInvoice:any = null,
        public rate:any = null,




    ) {}
   
    
}
