import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MasterService } from "../../../../shared/master-service/master.service";
import { DepartmentmasterService } from "../../../masterdataconfiguration/services/department-master/departmentmaster.service";
import { AuthService } from "../../../../core/auth/auth.service";
import { EmployeeService } from '../../services/employee/employee.service';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['../../../../../assets/scss/_tableStyle.scss'],
  styles: [`
        @media screen and (max-width: 960px) {
            :host ::ng-deep .p-datatable.p-datatable-customers.rowexpand-table .p-datatable-tbody > tr > td:nth-child(6) {
                display: flex;
            }
        }

    `],
  providers: [MessageService]
})


export class EmployeeAddComponent implements OnInit {
  form: FormGroup;
  religions: any;
  title: any;
  genders: any;
  castCategories: any;
  maritalStatuss: any;
  uidTypes: any;
  bloodGroups: any;
  handicapStatuss: any;
  country: any;
  states: any;
  masterEmployee: any;
  masterDepartment: any;
  isAddEmployee: boolean;
  submitted: boolean;
  status: any;
  constructor(
    private departmentmasterService: DepartmentmasterService,
    private employeeService: EmployeeService,
    private masterService: MasterService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {
  }
  ngOnInit(): void {
    const PAT_NAME = "^[a-zA-Z ]{2,20}$";
    const PAT_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$";
    let employeeId = this.route.snapshot.paramMap.get('id');
    this.isAddEmployee = !employeeId;
    this.form = this.formBuilder.group({
      employeeId: [0],
      masterEmployeeId: [null, Validators.required],
      masterDepartmentId: [null, Validators.required],
      employeeCode: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(PAT_EMAIL)]],
      bioMatricId: [''],
      title: [''],
      firstName: ['', [Validators.required, Validators.pattern(PAT_NAME)]],
      middleName: [''],
      lastName: [''],
      joiningDate: [null, Validators.required],
      appointmentDate: [null, Validators.required],
      board: ['', [Validators.required, Validators.pattern(PAT_NAME)]],
      jobTitle: ['', [Validators.required, Validators.pattern(PAT_NAME)]],
      employeeReferral: [''],
      qualification: ['', [Validators.required, Validators.pattern(PAT_NAME)]],
      experience: [0],
      dob: [null, Validators.required],
      gender: [null, Validators.required],
      maritalStatus: [null, Validators.required],
      anniversaryDate: [null],
      religion: [null, Validators.required],
      castCategory: [null, Validators.required],
      bloodGroup: [null, Validators.required],
      handicapStatus: [0],
      medicalCondition: [''],
      uidType: [0],
      uidNumber: [''],
      countryId: [0],
      stateId: [null, Validators.required],
      city: ['', [Validators.required, Validators.pattern(PAT_NAME)]],
      pinCode: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      phoneNumber: ['', Validators.required],
      name: [''],
      account: [''],
      ifsc: [''],
      pan: [''],
      activeStatus: [0, Validators.required],

    });


    this.religions = [
      { name: 'Muslim', code: '1' },
      { name: 'Hindu', code: '2' },
      { name: 'Sikh', code: '3' },
      { name: 'Other', code: '4' },
    ];

    this.title = [
      { name: 'Mr', ngValue: '1', inactive: true },
      { name: 'Mrs', ngValue: '2', inactive: true },
      { name: 'Dr', ngValue: '3', inactive: true },
    ];

    this.genders = [
      { name: 'Male', code: '1' },
      { name: 'Female', code: '2' },
      { name: 'Others', code: '3' },
    ];

    this.castCategories = [
      { name: 'General', code: '1' },
      { name: 'OBC', code: '2' },
      { name: 'SC', code: '3' },
      { name: 'ST', code: '4' },
      { name: 'Other', code: '5' },
    ];
    this.maritalStatuss = [
      { name: 'Unmarried', code: '1' },
      { name: 'Married', code: '2' },
      { name: 'Divorced', code: '3' },
      { name: 'Other', code: '4' },

    ];
    this.uidTypes = [
      { name: 'Aadhar', code: '1' },
      { name: 'PAN', code: '2' },
      { name: 'VoterID', code: '3' },
      { name: 'Other', code: '4' },

    ];
    this.bloodGroups = [
      { name: 'A+', code: '1' },
      { name: 'A-', code: '2' },
      { name: 'B+', code: '3' },
      { name: 'B-', code: '4' },
      { name: 'O+', code: '5' },
      { name: 'O-', code: '6' },
      { name: 'AB+', code: '7' },
      { name: 'AB-', code: '8' },

    ];
    this.handicapStatuss = [
      { name: 'Partial', code: '1' },
      { name: 'Full', code: '2' },
      { name: 'Other', code: '3' },
    ];
    this.country = [
      { name: 'India', code: '1' },
    ];
    this.masterService.States().subscribe((data: any) => {
      this.states = data.data;
      console.log("states", this.states);
    });
    this.masterEmployee = [
      { name: 'Teacher', code: '1' },
    ];
    this.status = [
      { statusName: 'Active', code: '1' },
      { statusName: 'InActive', code: '2' },
      { statusName: 'Suspended', code: '3' },
      { statusName: 'Deleted', code: '4' }
    ];
    console.log("Form Value1", this.form.value);
    if (!this.isAddEmployee) {
      this.employeeService.getEmployeeById(employeeId).subscribe((res: any) => {
        console.log("For Update", res)
        this.form.patchValue({
          employeeId: res.data['employeeId'],
          masterEmployeeId: res.data['masterEmployeeId'],
          masterDepartmentId: res.data['masterDepartmentId'],
          employeeCode: res.data['employeeCode'],
          email: res.data['email'],
          bioMatricId: res.data['bioMatricId'],
          title: res.data['title'],
          firstName: res.data['firstName'],
          middleName: res.data['middleName'],
          lastName: res.data['lastName'],
          joiningDate: res.data['joiningDate'],
          appointmentDate: res.data['appointmentDate'],
          board: res.data['board'],
          jobTitle: res.data['jobTitle'],
          employeeReferral: res.data['employeeReferral'],
          qualification: res.data['qualification'],
          experience: res.data['experience'],
          dob: res.data['dob'],
          gender: res.data['gender'],
          maritalStatus: res.data['maritalStatus'],
          anniversaryDate: res.data['anniversaryDate'],
          religion: res.data['religion'],
          castCategory: res.data['castCategory'],
          bloodGroup: res.data['bloodGroup'],
          handicapStatus: res.data['handicapStatus'],
          medicalCondition: res.data['medicalCondition'],
          uidType: res.data['uidType'],
          uidNumber: res.data['uidNumber'],
          countryId: res.data['countryId'],
          stateId: res.data['stateId'],
          city: res.data['city'],
          pinCode: res.data['pinCode'],
          address1: res.data['address1'],
          address2: res.data['address2'],
          phoneNumber: res.data['phoneNumber'],
          name: res.data['name'],
          account: res.data['account'],
          ifsc: res.data['ifsc'],
          pan: res.data['pan'],
          activeStatus: res.data['activeStatus'],
        });
      });
    }
    this.loadMasterDepartment();
  }
  employeeList() {
    this.router.navigate(['/employee/list'])
  }

  public loadMasterDepartment() {
    this.departmentmasterService.MasterDepartment().subscribe((data: any) => {
      this.masterDepartment = data.data
    })
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.form.patchValue({
      masterEmployeeId: parseInt(this.form.value.masterEmployeeId.code),
      masterDepartmentId: parseInt(this.form.value.masterDepartmentId.masterDepartmentId),
      gender: parseInt(this.form.value.gender.code),
      maritalStatus: parseInt(this.form.value.maritalStatus.code),
      religion: parseInt(this.form.value.religion.code),
      castCategory: parseInt(this.form.value.castCategory.code),
      bloodGroup: parseInt(this.form.value.bloodGroup.code),
      uidType: parseInt(this.form.value.uidType.code),
      countryId: parseInt(this.form.value.countryId.code),
      stateId: parseInt(this.form.value.stateId.stateId),
      activeStatus: parseInt(this.form.value.activeStatus.code),
      handicapStatus: parseInt(this.form.value.handicapStatus.code),
    })
    if (this.isAddEmployee) {
      console.log("Form Value1", this.form.value);
      
      console.log("FormValue2", this.form.value)
      this.addEmployeeData()
      //this.form.reset();
    }
    else {
      this.submitted = true;
      this.updateEmployee();
    }
  }
  public addEmployeeData() {
    this.form.addControl('createdByUserId', new FormControl(parseInt(this.authService.currentUserValue.id.toString())));
    this.form.addControl('schoolId', new FormControl(parseInt(this.authService.currentUserValue.schoolId.toString())));
    this.employeeService.addEmployee(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            console.log("AddEmployeeDetails", data)
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: data.message, life: 3000 })
            this.submitted = false;
            this.form.reset({
              'createdByUserId': parseInt(this.authService.currentUserValue.id.toString()),
              'schoolId': parseInt(this.authService.currentUserValue.schoolId.toString()),
              'employeeId': 0,
              'handicapStatus':0,
              'uidType':0,
              'countryId':0,
              'activeStatus':0
            });
            //this.router.navigate(['/employee/list']);
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Employee Details Not Save' + data.message, life: 3000 });
          }
        },
        error => {
          console.log(JSON.stringify(error))
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Employee Details Not Save' + error.message, life: 4000 });
        });
  }
  public updateEmployee() {
    this.form.addControl('updatedByUserId', new FormControl(parseInt(this.authService.currentUserValue.id.toString())));
    this.form.addControl('schoolId', new FormControl(parseInt(this.authService.currentUserValue.schoolId.toString())));
    console.log(JSON.stringify(this.form.value))
    this.employeeService.addEmployee(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Updated Successfully', life: 3000 });
            //this.router.navigate(['/employee/list'])
            this.form.reset();
            this.submitted = false;
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
          }
        },
        error => {
          this.messageService.add({ severity: 'Employee', summary: 'Error', detail: 'Employee Details Not Save' + error.message, life: 3000 });
        });
  }

}

