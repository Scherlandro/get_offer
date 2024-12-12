import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppMaterialModule} from "./app-material/app-material.module";
import {A11yModule} from "@angular/cdk/a11y";
import {FormsModule} from "@angular/forms";
import {ErrorDiologComponent} from "./diolog_components/error-diolog/error-diolog.component";
import {DialogEventsComponent} from "./diolog_components/dialog-events/dialog-events.component";
import {DialogUsuarioComponent} from "./diolog_components/dialog-usuario/dialog-usuario.component";

@NgModule({
  declarations: [
   ErrorDiologComponent,
    DialogEventsComponent,
    DialogUsuarioComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    A11yModule,
    FormsModule
  ],
  exports:[]
})
export class SharedModule { }
