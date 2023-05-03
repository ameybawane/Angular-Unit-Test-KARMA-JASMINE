export interface IPracticeTemplate {
    practiceTemplateId?: number,
    practiceCategoryId?: number,
    question?: string,
    weightage?: number,
    additionalInfo?: string,
    orderingIndex?: number,
    isActive?: boolean,
    lastModifiedDate?: Date,
    lastModifiedBy?: string
}
