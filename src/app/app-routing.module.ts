import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticeGroupComponent } from './components/practice-group/practice-group.component';
import { PracticeComponent } from './components/practice/practice.component';
import { PracticeCategoryComponent } from './components/practice-category/practice-category.component';
import { PracticeTemplateComponent } from './components/practice-template/practice-template.component';
import { TechnologyStackComponent } from './components/technology-stack/technology-stack.component';
import { BasicInfoComponent } from './components/basic-info/basic-info.component';
import { ReportTemplateComponent } from './components/report-template/report-template.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '**', component: ErrorPageComponent },
  { path: 'practice', component: PracticeGroupComponent },
  { path: 'subPractice', component: PracticeComponent },
  { path: 'practiceCategory', component: PracticeCategoryComponent },
  { path: 'practiceCategory/:id/expectations', component: PracticeTemplateComponent },
  { path: 'basicInfo', component: BasicInfoComponent },
  { path: 'technologyStack', component: TechnologyStackComponent },
  { path: 'practiceTemplate', component: ReportTemplateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
