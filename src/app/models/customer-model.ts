export class GetCustomer {


    constructor(
        public id:number = 0,
        public customerName:any = null,
        public email:any = null,
        public phoneNumber:any = null,

    ) {}
   
    
}


export class PostCustomer {


    constructor(
        public customerName:any = null,
        public email:any = null,
        public phoneNumber:any = null,

    ) {}
   
    
}

