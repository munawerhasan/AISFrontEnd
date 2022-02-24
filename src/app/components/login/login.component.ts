import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../../core/auth/auth.service';
import { Role } from '../../models/role';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    invalidUsernamePassword:boolean

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthService,
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        //document.querySelector('body').setAttribute('themebg-pattern', 'theme1');

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }


    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                res => {
                    if (res && res.authToken) {
                        let redirectUrl = "main-dashboard/dashboard";
                        console.log(res)
                        this.router.navigate([redirectUrl]);
                    }
                    else {
                        this.invalidUsernamePassword = true;
                    }
                    // console.log(res)
                    // let redirectUrl = "main-dashboard/dashboard";
                    // this.router.navigate([redirectUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
    // onSubmit() {
    //     this.submitted = true;
    //     // stop here if form is invalid
    //     if (this.loginForm.invalid) {
    //         return;
    //     }

    //     this.loading = true;
    //     this.authenticationService.login(this.f.username.value, this.f.password.value)
    //         .pipe(first())
    //         .subscribe(
    //             data => {
    //                 let redirectUrl = "main-dashboard/dashboard";
    //             //      if (data.role == Role.Owner) {
    //             //         redirectUrl = "owner";
    //             //     }
    //             //     else if (data.role == Role.Admin) {
    //             //         redirectUrl = "admin";
    //             //     }
    //             //     else if (data.role == Role.Operator) {
    //             //         redirectUrl = "operator";
    //             //     }
    //             //     else if (data.role == Role.Teacher) {
    //             //         redirectUrl = "teacher";
    //             //     }
    //             //     else if (data.role == Role.Employee ||data.role == Role.Principal||data.role == Role.Management) {
    //             //         redirectUrl = "employee";
    //             //     }
    //             //     else if (data.role == Role.Student) {
    //             //         redirectUrl = "student";
    //             //     }
    //                 this.router.navigate([redirectUrl]);
    //             },
    //             error => {
    //                 this.error = error;
    //                 this.loading = false;
    //             });
    // }

}
