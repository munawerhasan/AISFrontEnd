export class SubjectMappingModel {
    //subjectId: number;
    schoolId: number;
    masterSubjectId: number;
    masterClassId: number;
    // displayOrder: number;
    activeStatus: number;
    createdByUserId: number;
    combination: string;
    // updatedByUserId: number;
    // createdDate: Date;
    // updatedDate: Date;
}

export class SubjectModel{
    subjectId: number;
    schoolId: number;
    masterSubjectId: number;
    masterClassId: number;
    displayOrder: number;
    activeStatus: number;
    createdByUserId: number;
    updatedByUserId: number;
    createdDate: Date;
    updatedDate: Date;
    masterSubjectName:string;
    masterClassName:string;
}