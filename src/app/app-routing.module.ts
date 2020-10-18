import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: 'header', component: HeaderComponent },
  { path: '', redirectTo: '/header', pathMatch: 'full' },
  { path: 'contact', component: ContactPageComponent },
  { path: 'form', component: FormComponent},
  { path: '**', redirectTo: '/contact' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }