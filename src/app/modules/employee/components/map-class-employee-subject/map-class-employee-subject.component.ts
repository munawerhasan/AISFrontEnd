import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { EmployeeService } from '../../services/employee/employee.service';
import { AuthService } from "../../../../core/auth/auth.service";
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { SubjectmasterService } from "../../../masterdataconfiguration/services/subject-master/subjectmaster.service";
import { MessageService } from 'primeng/api';
@Component({
	selector: 'app-map-class-employee-subject',
	templateUrl: './map-class-employee-subject.component.html',
	styleUrls: ['../../../../../assets/scss/_tableStyle.scss', '../../../../../assets/sass/layout/_loader.scss'],
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
  :host ::ng-deep .p-multiselect {
		min-width: 15rem;
	}

	:host ::ng-deep .multiselect-custom-virtual-scroll .p-multiselect {
		min-width: 20rem;
	}

	:host ::ng-deep .multiselect-custom .p-multiselect-label {
		padding-top: .25rem;
		padding-bottom: .25rem;

	}


	:host ::ng-deep .multiselect-custom .country-item.country-item-value {
		padding: .25rem .5rem;
		border-radius: 3px;
		display: inline-flex;
		margin-right: .5rem;
		background-color: var(--primary-color);
		color: var(--primary-color-text);
	}

	:host ::ng-deep .multiselect-custom .country-item.country-item-value img.flag {
		width: 17px;
	}

	:host ::ng-deep .multiselect-custom .country-item {
		display: flex;
		align-items: center;
	}

	:host ::ng-deep .multiselect-custom .country-item img.flag {
		width: 18px;
		margin-right: .5rem;
	}

	:host ::ng-deep .multiselect-custom .country-placeholder {
		padding: 0.25rem;
	}

	:host ::ng-deep .p-colorpicker {
		width: 2.5em
	}
    `],
	providers: [MessageService]
})
export class MapClassEmployeeSubjectComponent implements OnInit {
	loader = true;
	selectedUserId: any;
	first = 0;
	rows = 10;
	submitted: boolean;
	mapDialog: boolean;
	@ViewChild('dt') table: Table;
	constructor(
		private employeeService: EmployeeService, 
		private authService: AuthService, 
		private messageService: MessageService,
		private router: Router,
		private subjectService:SubjectmasterService
		) { }
	employeeData: SelectItem[];
	selectedList: SelectItem;
	data: any;
	ngOnInit(): void {
		this.employeeService.getEmployeeListGeneric(this.authService.currentUserValue.schoolId, 1, 0, 0).subscribe((res: any) => {
			this.employeeData = res.data;
			console.log("employeeList", this.employeeData)
			this.loader=false;
		});
		this.loader=true;
		this.subjectService.getSubjectTeacherMappingListGeneric(this.authService.currentUserValue.schoolId, 0, 0, 0, 0, 0).subscribe(res => {
			this.data = res.data;
			console.log("Mapping Teacher", this.data)
			this.loader=false;
		})
	}
 
	deleteRecord(id: number) {
		console.log("Id",id)
        this.subjectService.deleteSubjectTeacherMappingAPI(id)
          .subscribe(res => {
			console.log(res);
			this.messageService.add({ severity: 'error', summary: 'Deleted', detail: 'Subject Deleted ', life: 3000 });
          }, (err) => {
			this.messageService.add({ severity: 'error', summary: 'Deleted', detail: 'err ', life: 3000 });
            console.log(err);
          }
          );
      }
	openNew() {
		this.router.navigate(['/employee/teacher-mapping-subject'])
	}


}
