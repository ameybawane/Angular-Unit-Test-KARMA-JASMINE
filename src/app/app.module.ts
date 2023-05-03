import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PracticeComponent } from './components/practice/practice.component';
import { PracticeGroupComponent } from './components/practice-group/practice-group.component';
import { PracticeCategoryComponent } from './components/practice-category/practice-category.component';
import { PracticeTemplateComponent } from './components/practice-template/practice-template.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BlockUIModule } from 'primeng/blockui';
import { ChipModule } from 'primeng/chip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScrollTopModule } from 'primeng/scrolltop';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { RippleModule } from 'primeng/ripple';
import { TechnologyStackComponent } from './components/technology-stack/technology-stack.component';
import { BasicInfoComponent } from './components/basic-info/basic-info.component';
import { ReportTemplateComponent } from './components/report-template/report-template.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SharedModule } from './shared/shared.module';
import { ErrorPageComponent } from './components/error-page/error-page.component';


@NgModule({
  declarations: [
    AppComponent,
    PracticeComponent,
    PracticeGroupComponent,
    PracticeCategoryComponent,
    PracticeTemplateComponent,
    SideBarComponent,
    TechnologyStackComponent,
    BasicInfoComponent,
    ReportTemplateComponent,
    LoginPageComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    PanelMenuModule,
    DropdownModule,
    InputSwitchModule,
    CalendarModule,
    AutoCompleteModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    KeyFilterModule,
    MultiSelectModule,
    PasswordModule,
    RadioButtonModule,
    ToggleButtonModule,
    TriStateCheckboxModule,
    ButtonModule,
    SplitButtonModule,
    TableModule,
    AccordionModule,
    CardModule,
    DividerModule,
    TabViewModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    DialogModule,
    SidebarModule,
    TooltipModule,
    MenuModule,
    MenubarModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    AvatarModule,
    AvatarGroupModule,
    BlockUIModule,
    ChipModule,
    ProgressSpinnerModule,
    ScrollTopModule,
    TagModule,
    SkeletonModule,
    RippleModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
