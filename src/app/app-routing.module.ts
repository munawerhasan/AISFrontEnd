import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardDemoComponent } from './demo/view/dashboarddemo.component';
import { FormLayoutDemoComponent } from './demo/view/formlayoutdemo.component';
import { DashboardBankingComponent } from './demo/view/dashboardbanking.component';
import { AppInvoiceComponent } from './pages/app.invoice.component';
import { AppHelpComponent } from './pages/app.help.component';
import { AppWizardComponent } from './pages/app.wizard.component';
import { InputDemoComponent } from './demo/view/inputdemo.component';
import { FloatLabelDemoComponent } from './demo/view/floatlabeldemo.component';
import { TableDemoComponent } from './demo/view/tabledemo.component';
import { ListDemoComponent } from './demo/view/listdemo.component';
import { TreeDemoComponent } from './demo/view/treedemo.component';
import { ButtonDemoComponent } from './demo/view/buttondemo.component';
import { PanelsDemoComponent } from './demo/view/panelsdemo.component';
import { OverlaysDemoComponent } from './demo/view/overlaysdemo.component';
import { MediaDemoComponent } from './demo/view/mediademo.component';
import { MenusDemoComponent } from './demo/view/menusdemo.component';
import { MessagesDemoComponent } from './demo/view/messagesdemo.component';
import { MiscDemoComponent } from './demo/view/miscdemo.component';
import { EmptyDemoComponent } from './demo/view/emptydemo.component';
import { ChartsDemoComponent } from './demo/view/chartsdemo.component';
import { FileDemoComponent } from './demo/view/filedemo.component';
import { DocumentationComponent } from './demo/view/documentation.component';
import { DisplayComponent } from './utilities/display.component';
import { ElevationComponent } from './utilities/elevation.component';
import { FlexboxComponent } from './utilities/flexbox.component';
import { GridComponent } from './utilities/grid.component';
import { IconsComponent } from './utilities/icons.component';
import { WidgetsComponent } from './utilities/widgets.component';
import { SpacingComponent } from './utilities/spacing.component';
import { TypographyComponent } from './utilities/typography.component';
import { TextComponent } from './utilities/text.component';
import { AppMainComponent } from './app.main.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppErrorComponent } from './pages/app.error.component';
import { AppAccessdeniedComponent } from './pages/app.accessdenied.component';
import { AppLoginComponent } from './pages/app.login.component';
import { AppCrudComponent } from './pages/app.crud.component';
import { AppCalendarComponent } from './pages/app.calendar.component';
import { LoginComponent } from "./components/login/login.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      // {
      //   path: 'management',
      //   component: AppMainComponent,
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: './modules/management/management.module#ManagementModule'
      //     }
      //   ]
      // },
      {
        path: 'main-dashboard',
        component: AppMainComponent,
        children: [
          {
            path: '',
            loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
          }
        ]
      },
      
      {
        path: 'school',
        component: AppMainComponent,
        children: [
          {
            path: '',
            loadChildren: './modules/school/school.module#SchoolModule'
          }
        ]
      },
      {
        path: 'student',
        component: AppMainComponent,
        children: [
          {
            path: '',
            loadChildren: './modules/student/student.module#StudentModule'
          }
        ]
      },

      {
        path: 'fee',
        component: AppMainComponent,
        children: [
          {
            path: '',
            loadChildren: './modules/fee/fee.module#FeeModule'
          }
        ]
      },

      {
        path: 'masterDataConfiguration',
        component: AppMainComponent,
        children: [
          {
            path: '',
            loadChildren: './modules/masterdataconfiguration/masterdataconfiguration.module#MasterdataconfigurationModule'
          }
        ]
      },
      
      {
        path: 'employee',
        component: AppMainComponent,
        children: [
          {
            path: '',
            loadChildren: './modules/employee/employee.module#EmployeeModule'
          }
        ]
      },

      {
        path: 'syllabus',
        component: AppMainComponent,
        children: [
          {
            path: '',
            loadChildren: './modules/syllabus/syllabus.module#SyllabusModule'
          }
        ]
      },

      {
        path: 'assignment',
        component: AppMainComponent,
        children: [
          {
            path: '',
            loadChildren: './modules/assignment/assignment.module#AssignmentModule'
          }
        ]
      },

      {
        path: 'rnd',
        component: AppMainComponent,
        children: [
          {
            path: '',
            loadChildren: './modules/rnd/rnd.module#RndModule'
          }
        ]
      },

      {
        path: 'photo-gallery',
        component: AppMainComponent,
        children: [
          {
            path: '',
            loadChildren: './modules/photo-gallery/photo-gallery.module#PhotoGalleryModule'
          }
        ]
      },

      {
        path: 'qr',
        component: AppMainComponent,
        children: [
          {
            path: '',
            loadChildren: './modules/attendance/attendance.module#AttendanceModule'
          }
        ]
      },

      {
        path: '', component: AppMainComponent,
        children: [
          // { path: '', component: DashboardDemoComponent },
          { path: 'dashboard', component: DashboardDemoComponent },
          { path: 'dashboard_banking', component: DashboardBankingComponent },
          { path: 'uikit/formlayout', component: FormLayoutDemoComponent },
          { path: 'uikit/floatlabel', component: FloatLabelDemoComponent },
          { path: 'uikit/input', component: InputDemoComponent },
          { path: 'uikit/button', component: ButtonDemoComponent },
          { path: 'uikit/table', component: TableDemoComponent },
          { path: 'uikit/list', component: ListDemoComponent },
          { path: 'uikit/tree', component: TreeDemoComponent },
          { path: 'uikit/panel', component: PanelsDemoComponent },
          { path: 'uikit/overlay', component: OverlaysDemoComponent },
          { path: 'uikit/media', component: MediaDemoComponent },
          { path: 'uikit/menu', component: MenusDemoComponent },
          { path: 'uikit/message', component: MessagesDemoComponent },
          { path: 'uikit/misc', component: MiscDemoComponent },
          { path: 'uikit/charts', component: ChartsDemoComponent },
          { path: 'uikit/file', component: FileDemoComponent },
          { path: 'utilities/display', component: DisplayComponent },
          { path: 'utilities/elevation', component: ElevationComponent },
          { path: 'utilities/flexbox', component: FlexboxComponent },
          { path: 'utilities/grid', component: GridComponent },
          { path: 'utilities/icons', component: IconsComponent },
          { path: 'utilities/widgets', component: WidgetsComponent },
          { path: 'utilities/spacing', component: SpacingComponent },
          { path: 'utilities/typography', component: TypographyComponent },
          { path: 'utilities/text', component: TextComponent },
          { path: 'pages/empty', component: EmptyDemoComponent },
          { path: 'documentation', component: DocumentationComponent },
          { path: 'pages/invoice', component: AppInvoiceComponent },
          { path: 'pages/crud', component: AppCrudComponent },
          { path: 'pages/calendar', component: AppCalendarComponent },
          { path: 'pages/help', component: AppHelpComponent }
        ]
      },
      { path: 'error', component: AppErrorComponent },
      { path: 'accessdenied', component: AppAccessdeniedComponent },
      { path: 'notfound', component: AppNotfoundComponent },
      { path: 'login', component: AppLoginComponent },
      { path: 'wizard', component: AppWizardComponent },
      { path: '**', redirectTo: '/notfound' },
    ], { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
