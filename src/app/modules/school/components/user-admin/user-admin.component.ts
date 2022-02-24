import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../../core/auth/auth.service';
import { UserAdminModel } from '../../../school/models/user-admin';
import { SchoolService } from "../../services/school.service";
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// import { ExportToCsv } from 'export-to-csv';


@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['../../../../../assets/scss/_tableStyle.scss'],
  styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }

        @media screen and (max-width: 960px) {
            :host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:last-child {
                text-align: center;
            }

            :host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:nth-child(6) {
                display: flex;
            }
        }

    `],
  providers: [MessageService, ConfirmationService]
})
export class UserAdminComponent implements OnInit {
  first = 0;
  rows = 10;
  @ViewChild('dt') table: Table;
  form: FormGroup;
  schools: any;
  roles:any;
  public data: UserAdminModel[];
  selectedSchool: string;
  item: string;
  submitted = false;
  productDialog: boolean;
  changUserPassword: boolean;
  schoolUserList: any;
  items: MenuItem[];
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    // private adminService: AdminService,
    private route: ActivatedRoute,
    private schoolService: SchoolService,
    private router: Router,
    private messageService: MessageService,
    //private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      password: [null, [Validators.required, Validators.min(6)]],
      confirmPassword: [null, [Validators.required, Validators.min(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      schoolId: ['', Validators.required]
    });
    //console.log("AddUserOn", this.form.value);

    this.schoolService.getSchoolList().subscribe((data: any) => {
      this.schools = data.data;
      console.log("School", this.schools)
    });
    this.schoolService.getUserList(2).subscribe((res: any) => {
      this.data = res.data;
      console.log("user", this.data)
    });
    this.roles=[
      {'roleName':'Admin'},
      {'roleName':'Management'},
    ]
    this.items = [
      { label: 'Angular.io', icon: 'pi pi-external-link', url: 'http://angular.io' },
      { label: 'Theming', icon: 'pi pi-bookmark', routerLink: ['/theming'] },
      {
        label: 'Edit', icon: 'pi pi-fw pi-user-edit'
      },
      {
        label: 'Change Password', icon: 'pi pi-fw pi-refresh',
      },
      {
        label: 'Delete', icon: 'pi pi-fw pi-trash'
      },
    ];
  }

  onSubmit() {
    this.submitted = true;
    this.form.patchValue({
      schoolId: parseInt(this.form.value.schoolId.schoolId),
      role:this.form.value.role.roleName,
    }) 
    console.log("formValue", this.form.value)
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
    this.createUser()
  }

  public createUser() {
    this.form.addControl('createdByUserId', new FormControl(parseInt(this.authService.currentUserValue.id.toString())));
    //this.form.addControl('role', new FormControl("Admin"))
    this.schoolService.addAccount(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Details Save Successfully', life: 3000 });
            this.productDialog = false;
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User Details Not Save ' + data.message, life: 3000 });
          }
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User Details Not Save' + error.message, life: 3000 });
        });
  }
 
  openNew() {
    this.productDialog = true;
  }
  changeUserPassword() {
    this.changUserPassword = true;
  }
}
