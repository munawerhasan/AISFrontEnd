import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SchoolService } from "../../../school/services/school.service";
import { first } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  providers: [MessageService]
})
export class ChangePasswordComponent implements OnInit {
  submitted: boolean;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private schoolService: SchoolService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }
  userName: string;
  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('userName');
    let userId = this.route.snapshot.paramMap.get('userId');
    this.form = this.formBuilder.group({
      userId: [userId, Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.resetSetPasswordByAdmin();
  }
  public resetSetPasswordByAdmin() {
    this.schoolService.resetPasswordByAdmin(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.isError === false) {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: data.message, life: 3000 });
            //this.router.navigate(["/school/userAdmin"])
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User Details Not Save ' + data.message, life: 3000 });
          }
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User Details Not Save' + error.message, life: 3000 });
        });
  }


}
