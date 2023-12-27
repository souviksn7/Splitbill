import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GroupsComponent } from './groups/groups.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { ViewGroupMembersComponent } from './view-group-members/view-group-members.component';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'groups',
    children:[
      {
        path: '',
        component: GroupsComponent
      },
      {
        path: 'group-details/:groupId',
        component: GroupDetailsComponent
      },
      {
        path: 'view-group-members/:groupId',
        component:ViewGroupMembersComponent
      }
    ]
  },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'add-group', component: AddGroupComponent},
  {path: 'expense-details/:expenseId', component: ExpenseDetailsComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
