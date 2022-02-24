import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { AuthService } from "./core/auth/auth.service";
import { Role } from "./models/role";

@Component({
    selector: 'app-menu',
    template: `
    <ul class="layout-menu layout-main-menu clearfix">
        <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
    </ul>
    `
})
export class AppMenuComponent implements OnInit {

    model = [];
    constructor(public app: AppMainComponent, private authService: AuthService) { }
    ngOnInit() {

        if (Role.Management.indexOf(this.authService.currentUserValue.role) !== -1) {
            return this.model = [
                {
                    label: 'Management Dashboard', icon: 'pi pi-home',
                },
            ]
        }

        if (Role.Owner.indexOf(this.authService.currentUserValue.role) !== -1) {
            return this.model = [
                {
                    label: 'Super Admin', icon: 'pi pi-home',
                    items: [
                        {
                            label: 'New School Setup', icon: 'pi pi-fw pi-home', routerLink: ['/school'],
                            items: [
                                //{ label: 'Dashboard', icon: 'pi pi-fw pi-user-plus', routerLink: ['/management/dashboard'] },
                                { label: 'New School', icon: 'pi pi-fw pi-user-plus', routerLink: ['/school/addSchool'] },
                                { label: 'All School List', icon: 'pi pi-fw pi-home', routerLink: ['/school/allSchool'] },
                                { label: 'All Admin User', icon: 'pi pi-fw pi-users', routerLink: ['/school/userAdmin'] },
                                //{ label: 'Change Password', icon: 'pi pi-fw pi-user-edit', routerLink: ['/school/changePassword'] },
                                { label: 'Banking', icon: 'pi pi-fw pi-money-bill', routerLink: ['/dashboards/dashboard_banking'] },
                            ]
                        }
                    ],
                },
            ]
        }

        else if (Role.Admin.indexOf(this.authService.currentUserValue.role) !== -1) {
            return this.model = [
                {
                    label: 'Main Dashboard', icon: 'pi pi-home',
                    items: [
                        {
                            label: 'Dashboard', icon: 'pi pi-fw pi-home',  routerLink: ['/main-dashboard/dashboard']
                            // items: [
                            //     { label: 'Dashboard', icon: 'pi pi-fw pi-user-plus', routerLink: ['/main-dashboard/dashboard'] },
                            // ]
                        }
                    ],

                },
                {
                    label: 'CORE AREAS', icon: 'pi pi-fw pi-align-left',
                    items: [
                        {
                            label: 'Academics', icon: 'pi pi-fw pi-home',
                            items: [
                                {
                                    label: 'Classes', icon: 'pi pi-fw pi-list',
                                    items: [
                                        { label: 'Batch', icon: 'pi pi-fw pi-folder', routerLink: ['/masterDataConfiguration/batchMaster'] },
                                        { label: 'Class', icon: 'pi pi-fw pi-folder', routerLink: ['/masterDataConfiguration/classMaster'] },
                                        { label: 'Section', icon: 'pi pi-fw pi-folder', routerLink: ['/masterDataConfiguration/sectionMaster'] },
                                        { label: 'Map Class & Section', icon: 'pi pi-fw pi-folder', routerLink: ['/masterDataConfiguration/classSectionMapping'] },
                                    ]
                                },
                                {
                                    label: 'Subject', icon: 'pi pi-fw pi-list', routerLink: ['/masterDataConfiguration'],
                                    items: [
                                        { label: 'Subjects', icon: 'pi pi-fw pi-folder', routerLink: ['/masterDataConfiguration/subjectMaster'] },
                                        { label: 'Map Class & Subject', icon: 'pi pi-fw pi-folder', routerLink: ['/masterDataConfiguration/classWithsubjectMapping'] },
                                        { label: 'Subject And Topic', icon: 'pi pi-fw pi-folder', routerLink: ['/masterDataConfiguration/subject-topic'] },
                                    ]
                                },

                                {
                                    label: 'Syllabus', icon: 'pi pi-fw pi-list', routerLink: ['/masterDataConfiguration'],
                                    items: [
                                        { label: 'Unit', icon: 'pi pi-fw pi-folder', routerLink: ['/masterDataConfiguration/unit'] },
                                        { label: 'Chapter', icon: 'pi pi-fw pi-folder', routerLink: ['/masterDataConfiguration/chapter']},
                                        { label: 'Topic', icon: 'pi pi-fw pi-folder', routerLink: ['/masterDataConfiguration/topic'] },
                                        { label: 'Class Syllabus', icon: 'pi pi-fw pi-folder', routerLink: ['/masterDataConfiguration/sylebus'] },
                                    ]
                                },

                            ]
                        },
                      
                    ]
                },

                {
                    label: 'Syllabus Status', icon: 'pi pi-home',
                    items: [
                        {
                            label: 'Syllabus', icon: 'pi pi-fw pi-home', routerLink: ['/syllabus/syllabusStatus'],
                                // items: [
                                //     { label: 'Syllabus Status', icon: 'pi pi-fw pi-user-plus', routerLink: ['/syllabus/syllabusStatus'] },
                                // ]
                        },
                        // {
                        //     label: 'Syllabus', icon: 'pi pi-fw pi-home',
                        //     items: [
                        //         { label: 'Syllabus Status', icon: 'pi pi-fw pi-user-plus', routerLink: ['/syllabus/syllabusStatus'] },
                        //     ]
                        // }
                    ],
                    
                },
                // {
                //     label: 'Master Data', icon: 'pi pi-home',
                //     items: [
                //         {
                //             label: 'Master Configuration', icon: 'pi pi-fw pi-home', routerLink: ['/masterDataConfiguration'],
                //             items: [
                //                 // { label: 'Batch', icon: 'pi pi-fw pi-user-plus', routerLink: ['/masterDataConfiguration/batchMaster'] },
                //                 // { label: 'Class', icon: 'pi pi-fw pi-user-plus', routerLink: ['/masterDataConfiguration/classMaster'] },
                //                 // { label: 'Section', icon: 'pi pi-fw pi-home', routerLink: ['/masterDataConfiguration/sectionMaster'] },
                //                 // { label: 'Map Class With Section', icon: 'pi pi-fw pi-home', routerLink: ['/masterDataConfiguration/classSectionMapping'] },
                //                 // { label: 'Subject', icon: 'pi pi-fw pi-user-plus', routerLink: ['/masterDataConfiguration/subjectMaster'] },
                //                 // { label: 'Map Class With Subject', icon: 'pi pi-fw pi-user-plus', routerLink: ['/masterDataConfiguration/classWithsubjectMapping'] },
                //                 // { label: 'Subject With Topic', icon: 'pi pi-fw pi-user-plus', routerLink: ['/masterDataConfiguration/subject-topic'] },
                //                 { label: 'Department', icon: 'pi pi-fw pi-user-plus', routerLink: ['/masterDataConfiguration/departmentMaster'] },
                //                 { label: 'Occupation', icon: 'pi pi-fw pi-user-plus', routerLink: ['/masterDataConfiguration/occupationMaster'] },
                //                 { label: 'Document', icon: 'pi pi-fw pi-user-plus', routerLink: ['/masterDataConfiguration/documentMaster'] },
                //             ]
                //         }
                //     ],
                // },
                {
                    label: 'Student Data', icon: 'pi pi-home',
                    items: [
                        {
                            label: 'Student', icon: 'pi pi-fw pi-home', routerLink: ['/student'],
                            items: [
                                { label: 'All Student', icon: 'pi pi-fw pi-user-plus', routerLink: ['/student/list'] },
                            ]
                        }
                    ],
                },

                {
                    label: 'Employee Data', icon: 'pi pi-home',
                    items: [
                        {
                            label: 'Employee', icon: 'pi pi-fw pi-home', routerLink: ['/employee'],
                            items: [
                                { label: 'Employee List', icon: 'pi pi-fw pi-user-plus', routerLink: ['/employee/list'] },
                                { label: 'Add Employee', icon: 'pi pi-fw pi-user-plus', routerLink: ['/employee/add'] },
                                { label: 'Map Employee & Subject', icon: 'pi pi-fw pi-user-plus', routerLink: ['/employee/mapClass'] },
                            ]
                        }
                    ],
                },

                {
                    label: 'Transaction Data', icon: 'pi pi-home',
                    items: [
                        {
                            label: 'Fee', icon: 'pi pi-fw pi-home', routerLink: ['/fee'],
                            items: [
                                { label: 'All Payment', icon: 'pi pi-fw pi-user-plus', routerLink: ['/fee/allPayment'] },
                                { label: 'Pending Fee', icon: 'pi pi-fw pi-home', routerLink: ['/fee/pending-fee'] },

                            ]
                        }
                    ],
                },

                {
                    label: 'Photo Gallery', icon: 'pi pi-home',
                    items: [
                        {
                            label: 'Photos', icon: 'pi pi-fw pi-home', routerLink: ['/photo-gallery'],
                            items: [
                                { label: 'Add Student Photo', icon: 'pi pi-fw pi-user-plus', routerLink: ['/photo-gallery/student-photo'] },
                                { label: 'Add Employee Photo', icon: 'pi pi-fw pi-user-plus', routerLink: ['/photo-gallery/employee-photo'] },
                                { label: 'Photo Gallery', icon: 'pi pi-fw pi-user-plus', routerLink: ['/photo-gallery/gallery'] },
                            ]
                        }
                    ],
                },


                {
                    label: 'Attendance Handle', icon: 'pi pi-home',
                    items: [
                        {
                            label: 'QR-Code', icon: 'pi pi-fw pi-home', routerLink: ['/qr'],
                            items: [
                                { label: 'Qr-Code', icon: 'pi pi-fw pi-user-plus', routerLink: ['/qr/qr-code'] },
                                { label: 'Attendance', icon: 'pi pi-fw pi-user-plus', routerLink: ['/qr/attendance'] },
                            ]
                        }
                    ],
                },

               

            ]
        }

        else if (Role.Teacher.indexOf(this.authService.currentUserValue.role) !== -1) {
            return this.model = [
                {
                    label: 'Main Dashboard', icon: 'pi pi-home',
                    items: [
                        {
                            label: 'Dashboard', icon: 'pi pi-fw pi-home',  routerLink: ['/main-dashboard/dashboard']
                        }
                    ],
                },

                {
                    label: 'Assignment', icon: 'pi pi-home',
                    items: [
                        {
                            label: 'Student-Assignment', icon: 'pi pi-fw pi-home', routerLink: ['/assignment'],
                            items: [
                                { label: 'Assignment-List', icon: 'pi pi-fw pi-user-plus', routerLink: ['/assignment/list'] },
                                { label: 'Add-Assignment', icon: 'pi pi-fw pi-user-plus', routerLink: ['/assignment/add'] },
                               // { label: 'Assignment-Activity', icon: 'pi pi-fw pi-user-plus', routerLink: ['/assignment/activity'] },
                            ]
                        }
                    ],
                },

                {
                    label: 'Syllabus Data', icon: 'pi pi-home',
                    items: [
                        {
                            label: 'Syllabus', icon: 'pi pi-fw pi-home',
                            items: [
                                { label: 'Syllabus Status', icon: 'pi pi-fw pi-user-plus', routerLink: ['/syllabus/syllabusStatus'] },
                                { label: 'Syllabus Update', icon: 'pi pi-fw pi-user-plus', routerLink: ['/syllabus/syllabusUpdate'] },
                            ]
                        },
                    ],
                    
                },

            ]
        }

        else if (Role.Student.indexOf(this.authService.currentUserValue.role) !== -1) {
            return this.model =
                [
                    {
                        label: 'Main Dashboard', icon: 'pi pi-home',
                        items: [
                            {
                                label: 'Dashboard', icon: 'pi pi-fw pi-home',  routerLink: ['/main-dashboard/dashboard']
                            }
                        ],
                    },

                    {
                        label: 'Assignment Data', icon: 'pi pi-home',
                        items: [
                            {
                                label: 'Assignment', icon: 'pi pi-fw pi-home', routerLink: ['/student'],
                                items: [
                                    { label: 'My Assignment', icon: 'pi pi-fw pi-user-plus', routerLink: ['/student/my-assignment'] },
                                    { label: 'Assignment Result', icon: 'pi pi-fw pi-user-plus', routerLink: ['/student/assignment-result'] },
                                ]
                            },
                        ],
                        
                    },

                    {
                        label: 'Syllabus Data', icon: 'pi pi-home',
                        items: [
                            {
                                label: 'Syllabus', icon: 'pi pi-fw pi-home',
                                items: [
                                    { label: 'Syllabus Status', icon: 'pi pi-fw pi-user-plus', routerLink: ['/syllabus/syllabusStatus'] },
                                ]
                            },
                        ],
                        
                    },
                ]
        }

        // this.model = [
        //     {
        //         label: 'Super Admin', icon: 'pi pi-home',
        //         items: [
        //             {
        //                 label: 'New School Setup', icon: 'pi pi-fw pi-home', routerLink: ['/school'],
        //                 items: [
        //                     { label: 'New School', icon: 'pi pi-fw pi-user-plus', routerLink: ['/school/addSchool'] },
        //                     { label: 'All School List', icon: 'pi pi-fw pi-home', routerLink: ['/school/allSchool'] },
        //                     { label: 'All Admin User', icon: 'pi pi-fw pi-users', routerLink: ['/school/userAdmin'] },
        //                     { label: 'Change Password', icon: 'pi pi-fw pi-user-edit', routerLink: ['/school/changePassword'] },
        //                     { label: 'Banking', icon: 'pi pi-fw pi-money-bill', routerLink: ['/dashboards/dashboard_banking'] },
        //                 ]
        //             }
        //         ],


        //     },

        //     {
        //         label: 'Fee', icon: 'pi pi-home',
        //         items: [
        //             {
        //                 label: 'FEE', icon: 'pi pi-fw pi-home', routerLink: ['/fee'],
        //                 items: [
        //                     { label: 'All Payment', icon: 'pi pi-fw pi-user-plus', routerLink: ['/fee/allPayment'] },
        //                     { label: 'Pending Fee', icon: 'pi pi-fw pi-home', routerLink: ['/fee/pending-fee'] },

        //                 ]
        //             }
        //         ],


        //     },

        //     {
        //         label: 'Master Data', icon: 'pi pi-home',
        //         items: [
        //             {
        //                 label: 'Master Configuration', icon: 'pi pi-fw pi-home', routerLink: ['/masterDataConfiguration'],
        //                 items: [
        //                     { label: 'Batch', icon: 'pi pi-fw pi-user-plus', routerLink: ['/masterDataConfiguration/batchMaster'] },
        //                     { label: 'Class', icon: 'pi pi-fw pi-user-plus', routerLink: ['/masterDataConfiguration/classMaster'] },
        //                     { label: 'Section', icon: 'pi pi-fw pi-home', routerLink: ['/masterDataConfiguration/sectionMaster'] },
        //                     { label: 'Map Class With Section', icon: 'pi pi-fw pi-home', routerLink: ['/masterDataConfiguration/classSectionMapping'] },
        //                     { label: 'Subject', icon: 'pi pi-fw pi-user-plus', routerLink: ['/masterDataConfiguration/subjectMaster'] },
        //                     { label: 'Subject With Topic', icon: 'pi pi-fw pi-user-plus', routerLink: ['/masterDataConfiguration/subject-topic'] },
        //                     { label: 'Map Class With Subject', icon: 'pi pi-fw pi-user-plus', routerLink: ['/masterDataConfiguration/classWithsubjectMapping'] },
        //                     { label: 'Department', icon: 'pi pi-fw pi-user-plus', routerLink: ['/masterDataConfiguration/departmentMaster'] },
        //                     { label: 'Occupation', icon: 'pi pi-fw pi-user-plus', routerLink: ['/masterDataConfiguration/occupationMaster'] },
        //                     { label: 'Document', icon: 'pi pi-fw pi-user-plus', routerLink: ['/masterDataConfiguration/documentMaster'] },

        //                 ]
        //             }
        //         ],


        //     },

        //     {
        //         label: 'Employee', icon: 'pi pi-home',
        //         items: [
        //             {
        //                 label: 'Employee', icon: 'pi pi-fw pi-home', routerLink: ['/employee'],
        //                 items: [
        //                     { label: 'All Employee List', icon: 'pi pi-fw pi-user-plus', routerLink: ['/employee/list'] },
        //                     { label: 'Add Employee', icon: 'pi pi-fw pi-user-plus', routerLink: ['/employee/add'] },
        //                     { label: 'Map-Employee', icon: 'pi pi-fw pi-user-plus', routerLink: ['/employee/mapClass'] },
        //                     { label: 'Teacher-Mapping-With-Subject', icon: 'pi pi-fw pi-user-plus', routerLink: ['/employee/teacher-mapping-subject'] },
        //                 ]
        //             }
        //         ],
        //     },

        //     {
        //         label: 'Assignment', icon: 'pi pi-home',
        //         items: [
        //             {
        //                 label: 'Student-Assignment', icon: 'pi pi-fw pi-home', routerLink: ['/assignment'],
        //                 items: [
        //                     { label: 'Assignment-List', icon: 'pi pi-fw pi-user-plus', routerLink: ['/assignment/list'] },
        //                     { label: 'Add-Assignment', icon: 'pi pi-fw pi-user-plus', routerLink: ['/assignment/add'] },
        //                     { label: 'Assignment-Activity', icon: 'pi pi-fw pi-user-plus', routerLink: ['/assignment/activity'] },

        //                 ]
        //             }
        //         ],
        //     },

        //     {
        //         items: [
        //             {
        //                 label: 'RND', icon: 'pi pi-fw pi-home', routerLink: ['/rnd'],
        //                 items: [
        //                     { label: 'PrimeNg Component', icon: 'pi pi-fw pi-user-plus', routerLink: ['/rnd/prime'] },
        //                 ]
        //             }
        //         ],
        //     },
        // ]




        // this.model = [
        //     {
        //         label: 'Favorites', icon: 'pi pi-home',
        //         items: [
        //             {label: 'Dashboards', icon: 'pi pi-fw pi-home', routerLink: ['/dashboards'],
        //                 items: [
        //                     {label: 'Generic', icon: 'pi pi-fw pi-home', routerLink: ['/dashboards/generic']},
        //                     {label: 'Banking', icon: 'pi pi-fw pi-money-bill', routerLink: ['/dashboards/dashboard_banking']},
        //                 ]
        //             }
        //         ]
        //     },

        //     {
        //         label: 'Favorites', icon: 'pi pi-home',
        //         items: [
        //             {label: 'Super Admin', icon: 'pi pi-fw pi-home', routerLink: ['/dashboards'],
        //                 items: [
        //                     {label: 'Generic', icon: 'pi pi-fw pi-home', routerLink: ['/dashboards/generic']},
        //                     {label: 'Banking', icon: 'pi pi-fw pi-money-bill', routerLink: ['/dashboards/dashboard_banking']},
        //                 ]
        //             }
        //         ]
        //     },
        //     {
        //         label: 'UI Kit', icon: 'pi pi-fw pi-star', routerLink: ['/uikit'],
        //         items: [
        //             {label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout']},
        //             {label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input']},
        //             {label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel']},
        //             {label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'], class: 'rotated-icon'},
        //             {label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table']},
        //             {label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list']},
        //             {label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree']},
        //             {label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel']},
        //             {label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay']},
        //             {label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media']},
        //             {label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu']},
        //             {label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message']},
        //             {label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file']},
        //             {label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts']},
        //             {label: 'Misc', icon: 'pi pi-fw pi-circle-off', routerLink: ['/uikit/misc']}
        //         ]
        //     },
        //     {
        //         label: 'Utilities', icon: 'pi pi-fw pi-compass', routerLink: ['utilities'],
        //         items: [
        //             {label: 'Display', icon: 'pi pi-fw pi-desktop', routerLink: ['utilities/display']},
        //             {label: 'Elevation', icon: 'pi pi-fw pi-external-link', routerLink: ['utilities/elevation']},
        //             {label: 'FlexBox', icon: 'pi pi-fw pi-directions', routerLink: ['utilities/flexbox']},
        //             {label: 'Icons', icon: 'pi pi-fw pi-search', routerLink: ['utilities/icons']},
        //             {label: 'Text', icon: 'pi pi-fw pi-pencil', routerLink: ['utilities/text']},
        //             {label: 'Widgets', icon: 'pi pi-fw pi-star-o', routerLink: ['utilities/widgets']},
        //             {label: 'Grid System', icon: 'pi pi-fw pi-th-large', routerLink: ['utilities/grid']},
        //             {label: 'Spacing', icon: 'pi pi-fw pi-arrow-right', routerLink: ['utilities/spacing']},
        //             {label: 'Typography', icon: 'pi pi-fw pi-align-center', routerLink: ['utilities/typography']}
        //         ]
        //     },
        //     {
        //         label: 'Pages', icon: 'pi pi-fw pi-briefcase', routerLink: ['/pages'],
        //         items: [
        //             {label: 'Crud', icon: 'pi pi-fw pi-pencil', routerLink: ['/pages/crud']},
        //             {label: 'Calendar', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/pages/calendar']},
        //             {label: 'Landing', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank'},
        //             {label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['/login']},
        //             {label: 'Invoice', icon: 'pi pi-fw pi-dollar', routerLink: ['/pages/invoice']},
        //             {label: 'Wizard', icon: 'pi pi-fw pi-star', routerLink: ['/wizard']},
        //             {label: 'Help', icon: 'pi pi-fw pi-question-circle', routerLink: ['/pages/help']},
        //             {label: 'Error', icon: 'pi pi-fw pi-times-circle', routerLink: ['/error']},
        //             {label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/notfound']},
        //             {label: 'Access Denied', icon: 'pi pi-fw pi-lock', routerLink: ['/access']},
        //             {label: 'Empty', icon: 'pi pi-fw pi-circle-off', routerLink: ['/pages/empty']}
        //         ]
        //     },
        //     {
        //         label: 'Hierarchy', icon: 'pi pi-fw pi-align-left',
        //         items: [
        //             {
        //                 label: 'Submenu 1', icon: 'pi pi-fw pi-align-left',
        //                 items: [
        //                     {
        //                         label: 'Submenu 1.1', icon: 'pi pi-fw pi-align-left',
        //                         items: [
        //                             {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-align-left'},
        //                             {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-align-left'},
        //                             {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-align-left'},
        //                         ]
        //                     },
        //                     {
        //                         label: 'Submenu 1.2', icon: 'pi pi-fw pi-align-left',
        //                         items: [
        //                             {label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-align-left'}
        //                         ]
        //                     },
        //                 ]
        //             },
        //             {
        //                 label: 'Submenu 2', icon: 'pi pi-fw pi-align-left',
        //                 items: [
        //                     {
        //                         label: 'Submenu 2.1', icon: 'pi pi-fw pi-align-left',
        //                         items: [
        //                             {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-align-left'},
        //                             {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-align-left'},
        //                         ]
        //                     },
        //                     {
        //                         label: 'Submenu 2.2', icon: 'pi pi-fw pi-align-left',
        //                         items: [
        //                             {label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-align-left'},
        //                         ]
        //                     },
        //                 ]
        //             }
        //         ]
        //     },
        //     {
        //         label: 'Start', icon: 'pi pi-download',
        //         items: [
        //             {
        //                 label: 'Buy Now', icon: 'pi pi-fw pi-shopping-cart', url: ['https://www.primefaces.org/store']
        //             },
        //             {
        //                 label: 'Documentation', icon: 'pi pi-fw pi-info-circle', routerLink: ['/documentation']
        //             }
        //         ]
        //     }
        // ];
    }
}
