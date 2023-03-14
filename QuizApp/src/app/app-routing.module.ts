import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FooterComponent } from "./footer/footer.component";


const routes: Routes = [
  {path:"", redirectTo:"welcome", pathMatch:"full"},
{ path:"", component : WelcomeComponent},
{path:"question", component:QuestionComponent},
{path:"footer", component:FooterComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
