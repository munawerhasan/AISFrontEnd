export class AssignmentModel {
    assignmentId: number;
    schoolId: number;
    assignmentType: number;
    name: string;
    description: string;
    classId: number;
    sectionId: number;
    subjectId: number;
    publishByUserId: number;
    publishDate: Date;
    toBeSubmittedDate: Date;
    remark: string;
    assignmentStatus: number;
    createdByUserId: number;
    updatedByUserId: number;
    createdDate: Date;
    updatedDate: Date;
    className:string;
    sectionName:string;
    subjectName:string;
    publisherName:string;
    attachments:any;
  }
  
  export class UserAssignmentModel
  {
    userAssignmentId: number;
    schoolId: number;
    assignmentId: number;
    userId: number;
    assignmentStatus: number;
    feedback: string;
    createdDate: Date;
    updatedDate: Date;
  }
  
  export class AssignmentModelFormData {
    SchoolId: number;
    AssignmentType: number;
    Name: string;
    Description: string;
    ClassId: number;
    SectionId: number;
    SubjectId: number;
    PublishByUserId: number;
    PublishDate: Date;
    ToBeSubmittedDate: Date;
    Remark: string;
    AssignmentStatus: number;
    CreatedByUserId: number;
    UpdatedByUserId: number;
    CreatedDate: Date;
    UpdatedDate: Date;
    Files:any;
  }