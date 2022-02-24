import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {


    public saveAccountDetail(data: string): void {
        localStorage.setItem('Account_Detail', data);
    }

    public removeAccountDetail(): void {
        localStorage.removeItem('Account_Detail');
    }

    public getAccountDetail(): any {
        return localStorage.getItem('Account_Detail');
    }

    public getUserId(): number {
        let data: any = JSON.parse(this.getAccountDetail());
        return data.userId;
    }


    public saveStudentDetail(data: string): void {
        localStorage.setItem('Student_Detail', data);
    }

    public removeStudentDetail(): void {
        localStorage.removeItem('Student_Detail');
    }

    public getStudentDetail(): any {
        return localStorage.getItem('Student_Detail');
    }

    public getStudentId(): number {
        let data: any = JSON.parse(this.getStudentDetail());
        return data.studentId;
    }


    public savePersonalDetail(data: string): void {
        localStorage.setItem('Personal_Detail', data);
    }

    public removePersonalDetail(): void {
        localStorage.removeItem('Personal_Detail');
    }

    public getPersonalDetail(): any {
        return localStorage.getItem('Personal_Detail');
    }

    public getPersonalDetailId(): number {
        let data: any = JSON.parse(this.getPersonalDetail());
        return data.personalDetailId;
    }


    public saveParentDetail(data: string): void {
        localStorage.setItem('Parent_Detail', data);
    }

    public removeParentDetail(): void {
        localStorage.removeItem('Parent_Detail');
    }

    public getParentDetail(): any {
        return localStorage.getItem('Parent_Detail');
    }

    public getParentDetailId(): number {
        let data: any = JSON.parse(this.getParentDetail());
        return data.parentDetailId;
    }



    public saveEmployeeDetail(data: string): void {
        localStorage.setItem('Employee_Detail', data);
    }

    public removeEmployeeDetail(): void {
        localStorage.removeItem('Employee_Detail');
    }

    public getEmployeeDetail(): any {
        return localStorage.getItem('Employee_Detail');
    }

    public getEmployeeId(): number {
        let data: any = JSON.parse(this.getEmployeeDetail());
        return data.employeeId;
    }



    public removeAllLocalStorage(): void {

        this.removeAccountDetail();
        this.removeStudentDetail();
        this.removeEmployeeDetail();
        this.removePersonalDetail();
        this.removeParentDetail();
    }

}
