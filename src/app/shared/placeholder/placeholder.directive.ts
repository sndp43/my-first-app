import { Directive, ViewContainerRef } from "@angular/core";

@Directive(
  {
    selector:'[appPlaceholder]'
  }
)

export class PlaceHolderDirective{

  //viewContainerRef will give access to place where to render dynamic component
  constructor(public viewContainerRef:ViewContainerRef){}

}
