import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GroupsComponent } from './groups/groups.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AddGroupComponent,  } from './add-group/add-group.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { ViewGroupMembersComponent } from './view-group-members/view-group-members.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input'
import { MatNativeDateModule } from '@angular/material/core';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {  NgxUiLoaderModule,  NgxUiLoaderConfig,  SPINNER,  PB_DIRECTION,} from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: 'Loading..',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  pbColor: '#0069d9',
  bgsColor: '#0069d9',
  fgsColor: '#0069d9',
  fgsType: SPINNER.threeStrings,
  fgsSize: 100,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5,
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GroupsComponent,
    RegisterComponent,
    LoginComponent,
    AddGroupComponent,
    GroupDetailsComponent,
    ViewGroupMembersComponent,
    ExpenseDetailsComponent,
    ProfileComponent,
    ForgotPasswordComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
