import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorServie } from "./auth/auth-interceptor.service";
import { RecipeServiceService } from "./recipes/recipe-service.service";

@NgModule({
  providers:[
    RecipeServiceService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptorServie,
      multi:true
    }
  ]
})
export class CoreModule{}
