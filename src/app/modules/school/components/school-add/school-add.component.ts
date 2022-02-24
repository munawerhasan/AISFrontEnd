import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { StateModel } from "../../../../models/state";
import { MasterService } from "../../../../shared/master-service/master.service";
import { AuthService } from "../../../../core/auth/auth.service";
import { SchoolService } from "../../../school/services/school.service";
import { first } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-school-add',
  templateUrl: './school-add.component.html',
  styleUrls: ['./school-add.component.scss'],
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
export class SchoolAddComponent implements OnInit {
  uid:any;
  submitted: boolean;
  organizationType = [];
  affilatedTo = [];
  form: FormGroup;
  uploadedFiles: any[] = [];
  selectedMulti: string[] = [];
  copyData: any[];
  countries: any[];
  states: StateModel[];
  isAddSchool: boolean;
  Gender:any;
  selectedList: SelectItem;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private masterService: MasterService,
    private authService: AuthService,
    private schoolService: SchoolService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService
  ) { }
  ngOnInit(): void {
    let schoolId = this.route.snapshot.paramMap.get('schoolId');
    this.isAddSchool = !schoolId;
    console.log("AddMode",  this.isAddSchool);
    const PAT_NAME = "^[a-zA-Z ]{2,40}$";
    const PAT_ALPHANUM = "^[a-zA-Z0-9 ]{2,40}$";
    const PAT_NUM = "^[0-9 ]{2,40}$";
    const PAT_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$";
    this.form = this.formBuilder.group({
      schoolId: [0],
      schoolName: ['', [Validators.required,Validators.pattern(PAT_NAME)]],
      schoolCode:['', [Validators.required,Validators.pattern(PAT_ALPHANUM)]],
      schoolEmail: ['', [Validators.required,Validators.pattern(PAT_EMAIL)]],
      registrationNumber: ['', [Validators.required,Validators.pattern(PAT_ALPHANUM)]],
      tagline: [''],
      description: [''],
      address1: ['', [Validators.required,Validators.pattern(PAT_ALPHANUM)]],
      address2: [''],
      city: ['', [Validators.required,Validators.pattern(PAT_NAME)]],
      stateId: [null, Validators.required],
      pinCode: ['', [Validators.required,Validators.pattern(PAT_NUM),Validators.maxLength(6)]],
      ownerName: ['', [Validators.required,Validators.pattern(PAT_NAME)]],
      ownerContactNo: ['', Validators.required],
      ownerEmail: ['', [Validators.required,Validators.pattern(PAT_EMAIL)]],
      gender: [null, Validators.required],
      dob: [null, Validators.required],
      uidType: [null, Validators.required],
      uidNumber: ['', [Validators.pattern(PAT_ALPHANUM)]],
      bankName:  ['', [Validators.required,Validators.pattern(PAT_NAME)]],
      ifscCode: ['', [Validators.required]],
      accountNo: ['', [Validators.required]],
      bankAddress: [''],
      paymentLink: [''],
      additionalInfo: [''],
    });
    console.log("AddSchool1",this.form.value)
    if (!this.isAddSchool) {
      this.schoolService.getSchoolById(schoolId).subscribe((res: any) => {
        this.form.setValue({
          schoolId: res.data['schoolId'],
          schoolName: res.data['schoolName'],
          schoolCode: res.data['schoolCode'],
          schoolEmail: res.data['schoolEmail'],
          registrationNumber: res.data['registrationNumber'],
          tagline: res.data['tagline'],
          description: res.data['description'],
          address1: res.data['address1'],
          address2: res.data['address2'],
          city: res.data['city'],
          stateId: res.data['stateId'],
          pinCode: res.data['pinCode'],
          ownerName: res.data['ownerName'],
          ownerContactNo: res.data['ownerContactNo'],
          ownerEmail: res.data['ownerEmail'],
          gender: res.data['gender'],
          dob: res.data['dob'],
          uidType: res.data['uidType'],
          uidNumber: res.data['uidNumber'],
          bankName: res.data['bankName'],
          ifscCode: res.data['ifscCode'],
          accountNo: res.data['accountNo'],
          bankAddress: res.data['bankAddress'],
          paymentLink: res.data['paymentLink'],
          additionalInfo: res.data['additionalInfo'],
        });
      });
    }
    this.masterService.States().subscribe((data: any) => {
      this.states = data.data;
      console.log("states", this.states);
    });
    this.Gender=[{name:'Male',code:'1'}, {name:'Female',code:'2'}]
    this.uid = [
      { name: 'Aadhar', code: '1' },
      { name: 'PAN', code: '2' },
      { name: 'VoterID', code: '3' },
      { name: 'Other', code: '4' },

    ];
    this.primengConfig.ripple = true;
  }


  onSubmit() {
    this.submitted = true;
    this.form.patchValue({
      stateId: parseInt(this.form.value.stateId.stateId),
      gender: parseInt(this.form.value.gender.code),
      uidType: parseInt(this.form.value.uidType.code),
    }) 
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

    if (this.isAddSchool) {
      console.log("AddSchool2",this.form.value)
      this.createSchool();
      
    } else {
      this.updateSchool();
    }
  }

  private createSchool() {
    this.form.addControl('createdByUserId', new FormControl(parseInt(this.authService.currentUserValue.id.toString())))
    console.log(JSON.stringify(this.form.value))
    this.schoolService.addSchool(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(JSON.stringify(data))
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'School Details Save Successfully', life: 3000 });
          this.submitted = false;
          this.form.reset({
            'schoolId': 0
          });
        },
        error => {
          console.log(JSON.stringify(error))
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Not Saved', life: 3000 });
        });
  }
  private updateSchool() {
    this.form.addControl('updatedByUserId', new FormControl(parseInt(this.authService.currentUserValue.id.toString())));
    console.log(JSON.stringify(this.form.value));
    this.schoolService.updateSchool(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'School Details Updated', life: 3000 });
        },
        error => {
        });
  } 
  onUpload(event) {    
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
}
