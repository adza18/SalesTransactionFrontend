enum HttpStatusCode {
    OK = 200,
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    InternalServerError = 500
  }
  
  export class APIResponseDTO<T> {
    isSuccess: boolean = true;
    message: string = '';
    entity?: T | null;
    httpStatusCode: HttpStatusCode = HttpStatusCode.OK;
  
    constructor(init?: Partial<APIResponseDTO<T>>) {
      Object.assign(this, init);
    }
  }
  