

export const environment = {
  production: true,
  baseUrl: 'http://111.223.2.137:1002',
};

export const masterStatus = {
  Active: 1,
  InActive: 2,
  Suspended: 3,
  Promoted: 4,
  Deleted: 5
};
export const masterUserAssignmentStatus = {
  NotSeen: 1,
  Seen: 2,
  Submitted: 3,
  ReSubmitted: 4,
  Completed:5,
  NotCompleted:6,
  Rejected: 7,
  StudentNeedToDiscuss: 8,
  TeacherNeedToDiscuss: 9,
  AssessedAndClosed:10
};

export const identityServices={
  addAccountAPI: '/register',
  getUsersAPI: '/Users',
};

export const dashboardServices={
  getStudentDashboardAPI: '/api/Dashboard/StudentDashboard',
};

export const managementService={
  getUserSessionDetailBySchoolId: '/api/User/UserSessionDetail',
};


export const resetPasswordByAdminServices={ 
  updatePasswordAPI: '/ResetPasswordByAdmin',  
};


export const schoolServices={
  getSchoolListAPI: '/api/School/SchoolList',
  getSchoolByIdAPI: '/api/School/SchoolById',
  getSchoolByCodeAPI: '/api/School/SchoolByCode',
  addSchoolAPI: '/api/School/Add',
  updateSchoolAPI: '/api/School/Update',
  deleteSchoolAPI: '/api/School/Delete',
};

export const configurationService={
  getConfigurationListAPI: '/api/Configuration/ConfigurationList',
  getConfigurationBySchoolIdAPI: '/api/Configuration/ConfigurationBySchoolId',
  getConfigurationByIdAPI: '/api/Configuration/ConfigurationById',
  addConfigurationAPI: '/api/Configuration/Add',
  updateConfigurationAPI: '/api/Configuration/Update',
  deleteConfigurationAPI: '/api/Configuration/Delete',
};

export const classServices={
  getClassListAPI: '/api/Class/ClassList',
  getClassListBySchoolIdAndStatusAPI: '/api/Class/ClassListBySchoolIdAndStatus',
  getClassByIdAPI: '/api/Class/ClassById',
  getClassByCodeAPI: '/api/Class/ClassByCode',
  addClassAPI: '/api/Class/Add',
  updateClassAPI: '/api/Class/Update',
  deleteClassAPI: '/api/Class/Delete',
  mapClassWithSection: '/api/Class/MapClassWithSection',
};

export const subjectServices={
  getSubjectListAPI: '/api/Subject/SubjectList',
  getSubjectListBySchoolIdAndStatusAPI: '/api/Subject/SubjectListBySchoolIdAndStatus',
  getSubjectByIdAPI: '/api/Subject/SubjectById',
  getSubjectByCodeAPI: '/api/Subject/SubjectByCode',
  addSubjectAPI: '/api/Subject/Add',
  addSubjectMappingAPI: '/api/Subject/AddSubjectMapping',
  updateSubjectAPI: '/api/Subject/Update',
  deleteSubjectAPI: '/api/Subject/Delete',

  getSubjectTeacherMappingListAPI: '/api/SubjectTeacherMapping/SubjectTeacherMappingList',
  getSubjectTeacherMappingListGenericAPI: '/api/SubjectTeacherMapping/SubjectTeacherMappingListGeneric',
  getSubjectTeacherMappingByIdAPI: '/api/SubjectTeacherMapping/SubjectTeacherMappingById',
  getSubjectTeacherMappingByCodeAPI: '/api/SubjectTeacherMapping/SubjectTeacherMappingByCode',
  addSubjectTeacherMappingAPI: '/api/SubjectTeacherMapping/Add',
  updateSubjectTeacherMappingAPI: '/api/SubjectTeacherMapping/Update',
  deleteSubjectTeacherMappingAPI: '/api/SubjectTeacherMapping/Delete',
  addSubjectWithTopicAPI:'/api/SubjectTopic/Add'
};

export const studentServices={
  getStudentListAPI: '/api/Student/StudentList',
  getStudentListBySchoolIdAndStatusAPI: '/api/Student/StudentListBySchoolIdAndStatus',
  getStudentListByMasterClassAndMasterSectionAPI: '/api/Student/StudentListByMasterClassAndMasterSection',
  getStudentByIdAPI: '/api/Student/StudentById',
  getStudentByUserIdAPI: '/api/Student/StudentByUserId',
  getStudentByCodeAPI: '/api/Student/StudentByCode',
  addStudentAPI: '/api/Student/Add',
  updateStudentAPI: '/api/Student/Update',
  deleteStudentAPI: '/api/Student/Delete',
};

export const employeeServices={
  getEmployeeListAPI: '/api/Employee/EmployeeList',
  getEmployeeListGenericAPI: '/api/Employee/EmployeeListGeneric',
  getEmployeeListBySchoolIdAndStatusAPI: '/api/Employee/EmployeeListBySchoolIdAndStatus',
  getEmployeeByIdAPI: '/api/Employee/EmployeeById',
  getEmployeeByCodeAPI: '/api/Employee/EmployeeByCode',
  addEmployeeAPI: '/api/Employee/Add',
  updateEmployeeAPI: '/api/Employee/Update',
  deleteEmployeeAPI: '/api/Employee/Delete',
};

export const personalDetailServices={
  getPersonalDetailListAPI: '/api/PersonalDetail/PersonalDetailList',
  getPersonalDetailByIdAPI: '/api/PersonalDetail/PersonalDetailById',
  getPersonalDetailByCodeAPI: '/api/PersonalDetail/PersonalDetailByCode',
  addPersonalDetailAPI: '/api/PersonalDetail/Add',
  updatePersonalDetailAPI: '/api/PersonalDetail/Update',
  deletePersonalDetailAPI: '/api/PersonalDetail/Delete',
};

export const parentDetailServices={
  getParentDetailListAPI: '/api/ParentDetail/ParentDetailList',
  getParentDetailByIdAPI: '/api/ParentDetail/ParentDetailById',
  getParentDetailByCodeAPI: '/api/ParentDetail/ParentDetailByCode',
  addParentDetailAPI: '/api/ParentDetail/Add',
  updateParentDetailAPI: '/api/ParentDetail/Update',
  deleteParentDetailAPI: '/api/ParentDetail/Delete',
};

export const feeServices={
  getPaymentListGenericAPI: '/api/Payment/PaymentListGeneric',
  getPendingFeeListGenericAPI: '/api/PendingFee/PendingFeeListGeneric',
  getPendingFeeByUserIdAPI: '/api/PendingFee/PendingFeeByUserId',
  getPendingFeeDropDownAPI: '/api/PendingFee/PendingFeeDropDown',
  getPendingFeeByGroupAPI: '/api/PendingFee/PendingFeeByGroup',
  getPaymentByGroupAPI: '/api/Payment/PaymentByGroup',
  getPendingFeeListExportAPI: '/api/PendingFee/PendingFeeListExport',
  getPaymentListExportAPI: '/api/Payment/PaymentListExport',
};

export const assignmentServices={
  getAssignmentListAPI: '/api/Assignment/AssignmentList',
  getAssignmentByIdAPI: '/api/Assignment/AssignmentById',
  getAssignmentListBySchoolIdAndStatusAPI: '/api/Assignment/AssignmentListBySchoolIdAndStatus',
  getAssignmentListByClassSectionSubjectStatusAPI: '/api/Assignment/AssignmentListByClassSectionSubjectStatus',
  getAssignmentByStudentAPI: '/api/Assignment/AssignmentListByStudentUserId',
  getAssignmentByPublisherAPI: '/api/Assignment/AssignmentListByPublisherUserId',
  addAssignmentAPI: '/api/Assignment/Add',
  updateAssignmentAPI: '/api/Assignment/Update',
  deleteAssignmentAPI: '/api/Assignment/Delete',

  getUserAssignmentListAPI: '/api/UserAssignment/UserAssignmentList',
  getUserAssignmentByIdAPI: '/api/UserAssignment/UserAssignmentById',
  getUserAssignmentListGenericAPI: '/api/UserAssignment/UserAssignmentListGeneric',
  getUserAssignmentListBySchoolIdAndStatusAPI: '/api/UserAssignment/UserAssignmentListBySchoolIdAndStatus',
  addUserAssignmentAPI: '/api/UserAssignment/Add',
  updateUserAssignmentAPI: '/api/UserAssignment/Update',
  deleteUserAssignmentAPI: '/api/UserAssignment/Delete',

  getAssignmentAssessmentListAPI: '/api/AssignmentAssessment/AssignmentAssessmentList',
  getAssignmentAssessmentByIdAPI: '/api/AssignmentAssessment/AssignmentAssessmentById',
  getAssignmentAssessmentListGenericAPI: '/api/AssignmentAssessment/AssignmentAssessmentListGeneric',
  getAssignmentAssessmentListBySchoolIdAndStatusAPI: '/api/AssignmentAssessment/AssignmentAssessmentListBySchoolIdAndStatus',
  getAssignmentAssessmentByStudentAPI: '/api/AssignmentAssessment/AssignmentAssessmentListByStudentUserId',
  addAssignmentAssessmentAPI: '/api/AssignmentAssessment/Add',
  updateAssignmentAssessmentAPI: '/api/AssignmentAssessment/Update',
  deleteAssignmentAssessmentAPI: '/api/AssignmentAssessment/Delete',
};

export const masterServices={
  
  getCountryListAPI: '/api/Country/CountryList',
  getStateListAPI: '/api/State/StateList',

  getMasterBatchListAPI: '/api/MasterBatch/MasterBatchList',
  getMasterBatchListBySchoolIdAndStatusAPI: '/api/MasterBatch/MasterBatchListBySchoolIdAndStatus',
  getMasterBatchByIdAPI: '/api/MasterBatch/MasterBatchById',
  addMasterBatchAPI: '/api/MasterBatch/Add',
  updateMasterBatchAPI: '/api/MasterBatch/Update',
  deleteMasterBatchAPI: '/api/MasterBatch/Delete',

  getMasterClassListAPI: '/api/MasterClass/MasterClassList',
  getMasterClassListByTeacherAPI: '/api/MasterClass/MasterClassListByTeacher',
  getMasterClassListBySchoolIdAndStatusAPI: '/api/MasterClass/MasterClassListBySchoolIdAndStatus',
  getMasterClassByIdAPI: '/api/MasterClass/MasterClassById',
  addMasterClassAPI: '/api/MasterClass/Add',
  updateMasterClassAPI: '/api/MasterClass/Update',
  deleteMasterClassAPI: '/api/MasterClass/Delete',

  getMasterUnitListAPI:'/api/SubjectUnit/SubjectUnitList',
  getUnitListBySchoolIdAndStatusAPI:'/api/SubjectUnit/SubjectUnitListBySchoolIdAndStatus',
  getSubjectUnitBymasterClassIdAndMasterSubjectId:'/api/SubjectUnit/SubjectUnitListGeneric',
  addMasterUnitAPI:'/api/SubjectUnit/Add',
  getMasterUnitByIdAPI: '/api/SubjectUnit/SubjectUnitById',
  updateMasterUnitAPI:'/api/SubjectUnit/Update',

  
  getMasterChapterListAPI:'/api/SubjectChapter/SubjectChapterList',
  getChapterListBySchoolIdAndStatusAPI:'/api/SubjectChapter/SubjectChapterListBySchoolIdAndStatus',
  getSubjectUnitByschoolIdAndsubjectUnitId:'/api/SubjectChapter/SubjectChapterListGeneric',
  addMasterChapterAPI:'/api/SubjectChapter/Add',
  getMasterChapterByIdAPI: '/api/SubjectChapter/SubjectChapterById',
  updateMasterChapterAPI:'/api/SubjectChapter/Update',

  getMasterTopicListAPI:'/api/SubjectTopic/SubjectTopicList',
  getTopicListBySchoolIdAndStatusAPI:'/api/SubjectTopic/SubjectTopicListGeneric',
  getSubjectTopicByschoolIdAndsubjectTopicId:'/api/SubjectTopic/SubjectTopicListGeneric',
  addMasterTopicAPI:'/api/SubjectTopic/Add',
  getMasterTopicByIdAPI: '/api/SubjectTopic/SubjectTopicById',
  updateMasterTopicAPI:'/api/SubjectTopic/Update',
  
  getMasterDepartmentListAPI: '/api/MasterDepartment/MasterDepartmentList',
  getMasterDepartmentListBySchoolIdAndStatusAPI: '/api/MasterDepartment/MasterDepartmentListBySchoolIdAndStatus',
  getMasterDepartmentByIdAPI: '/api/MasterDepartment/MasterDepartmentById',
  addMasterDepartmentAPI: '/api/MasterDepartment/Add',
  updateMasterDepartmentAPI: '/api/MasterDepartment/Update',
  deleteMasterDepartmentAPI: '/api/MasterDepartment/Delete',

  getMasterDocumentListAPI: '/api/MasterDocument/MasterDocumentList',
  getMasterDocumentListBySchoolIdAndStatusAPI: '/api/MasterDocument/MasterDocumentListBySchoolIdAndStatus',
  getMasterDocumentByIdAPI: '/api/MasterDocument/MasterDocumentById',
  addMasterDocumentAPI: '/api/MasterDocument/Add',
  updateMasterDocumentAPI: '/api/MasterDocument/Update',
  deleteMasterDocumentAPI: '/api/MasterDocument/Delete',

  getMasterEmployeeListAPI: '/api/MasterEmployee/MasterEmployeeList',
  getMasterEmployeeListBySchoolIdAndStatusAPI: '/api/MasterEmployee/MasterEmployeeListBySchoolIdAndStatus',
  getMasterEmployeeByIdAPI: '/api/MasterEmployee/MasterEmployeeById',
  addMasterEmployeeAPI: '/api/MasterEmployee/Add',
  updateMasterEmployeeAPI: '/api/MasterEmployee/Update',
  deleteMasterEmployeeAPI: '/api/MasterEmployee/Delete',

  getMasterLeaveListAPI: '/api/MasterLeave/MasterLeaveList',
  getMasterLeaveListBySchoolIdAndStatusAPI: '/api/MasterLeave/MasterLeaveListBySchoolIdAndStatus',
  getMasterLeaveByIdAPI: '/api/MasterLeave/MasterLeaveById',
  addMasterLeaveAPI: '/api/MasterLeave/Add',
  updateMasterLeaveAPI: '/api/MasterLeave/Update',
  deleteMasterLeaveAPI: '/api/MasterLeave/Delete',

  getMasterOccupationListAPI: '/api/MasterOccupation/MasterOccupationList',
  getMasterOccupationListBySchoolIdAndStatusAPI: '/api/MasterOccupation/MasterOccupationListBySchoolIdAndStatus',
  getMasterOccupationByIdAPI: '/api/MasterOccupation/MasterOccupationById',
  addMasterOccupationAPI: '/api/MasterOccupation/Add',
  updateMasterOccupationAPI: '/api/MasterOccupation/Update',
  deleteMasterOccupationAPI: '/api/MasterOccupation/Delete',

  getMasterSectionListAPI: '/api/MasterSection/MasterSectionList',
  getMasterSectionListBySchoolIdAndStatusAPI: '/api/MasterSection/MasterSectionListBySchoolIdAndStatus',
  getMasterSectionByIdAPI: '/api/MasterSection/MasterSectionById',
  getMasterSectionListByMasterClassAPI: '/api/MasterSection/MasterSectionListByMasterClass',
  addMasterSectionAPI: '/api/MasterSection/Add',
  updateMasterSectionAPI: '/api/MasterSection/Update',
  deleteMasterSectionAPI: '/api/MasterSection/Delete',

  getMasterSubjectListAPI: '/api/MasterSubject/MasterSubjectList',
  getMasterSubjectListByClassAPI: '/api/Subject/SubjectListGeneric',
  getMasterSubjectListBySchoolIdAndStatusAPI: '/api/MasterSubject/MasterSubjectListBySchoolIdAndStatus',
  getMasterSubjectByIdAPI: '/api/MasterSubject/MasterSubjectById',
  getMasterSubjectListByMasterClassAndSectionAPI:'/api/MasterSubject/MasterSubjectListByMasterClassAndSection',
  addMasterSubjectAPI: '/api/MasterSubject/Add',
  updateMasterSubjectAPI: '/api/MasterSubject/Update',
  deleteMasterSubjectAPI: '/api/MasterSubject/Delete',
  mapClassWithSubject: '/api/Subject/AddSubjectMapping',

  getMasterWingListAPI: '/api/WingGroup/WingGroupList',
  getMasterWingListBySchoolIdAndStatusAPI: '/api/WingGroup/WingGroupListBySchoolIdAndStatus',
  getMasterWingByIdAPI: '/api/WingGroup/WingGroupById',
  addMasterWingAPI: '/api/WingGroup/Add',
  updateMasterWingAPI: '/api/WingGroup/Update',
  deleteMasterWingAPI: '/api/WingGroup/Delete',

};