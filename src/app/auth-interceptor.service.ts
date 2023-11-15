import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor{
    intercept(req:HttpRequest<any>,next:HttpHandler){
        const modifiedRequest= req.clone({headers:req.headers.append('Auth','xyz')})
        console.log('Request it is on the way');
        return next.handle(modifiedRequest).pipe(tap(event=>{
            console.log(event);
            if(event.type===HttpEventType.Response){
                console.log('Response is arrived')
                console.log(event.body);
            }
        }));
    }
}