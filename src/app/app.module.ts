import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseCardComponent } from './shared/components/base-card/base-card.component';
import { BaseInputComponent } from './shared/components/base-input/base-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from './shared/components/form-field/form-field.component';
import { BaseButtonComponent } from './shared/components/base-button/base-button.component';
import { EventFormComponent } from 'src/app/events/views/event-form/event-form.component';
import { SuccessComponent } from 'src/app/events/views/success/success.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { BaseContainerComponent } from 'src/app/shared/components/base-container/base-container.component';
import { HttpClientModule } from '@angular/common/http';
import { IsFieldInvalidPipe } from 'src/app/shared/pipes/is-field-invalid.pipe';
import { GetFormControlPipe } from 'src/app/shared/pipes/get-form-control.pipe';
import { BaseSelectGroupComponent } from './shared/components/base-select-group/base-select-group.component';
import { BaseSelectOptionComponent } from './shared/components/base-select-group/base-select-option/base-select-option.component';

@NgModule({
  declarations: [
    AppComponent,
    EventFormComponent,
    SuccessComponent,
    HeaderComponent,
    BaseContainerComponent,
    BaseCardComponent,
    BaseInputComponent,
    FormFieldComponent,
    BaseButtonComponent,
    IsFieldInvalidPipe,
    GetFormControlPipe,
    BaseSelectGroupComponent,
    BaseSelectOptionComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
