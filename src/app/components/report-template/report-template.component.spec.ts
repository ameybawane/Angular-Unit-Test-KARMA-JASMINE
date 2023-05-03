
import {HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { inject } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Table } from 'primeng/table';
import { of } from 'rxjs';
import { PracticeCategoryService } from 'src/app/services/practice-category.service';
import { PracticeTemplateService } from 'src/app/services/practice-template.service';
import { PracticeService } from 'src/app/services/practice.service';


import { ReportTemplateComponent } from './report-template.component';

describe('ReportTemplateComponentMethod', () => {
  let component: ReportTemplateComponent;
  let fixture: ComponentFixture<ReportTemplateComponent>;

  let practiceCategories=[
    { practiceCategoryId: 1, name: 'Category 1' },
    { practiceCategoryId: 2, name: 'Category 2' },
    { practiceCategoryId: 3, name: 'Category 3' },
  ];
  let practiceTemplates= [
    { practiceTemplateId: 1, name: 'Template 1', practiceCategoryId: 1 },
    { practiceTemplateId: 2, name: 'Template 2', practiceCategoryId: 1 },
    { practiceTemplateId: 3, name: 'Template 3', practiceCategoryId: 2 },
    { practiceTemplateId: 4, name: 'Template 4', practiceCategoryId: 3 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportTemplateComponent ],
      imports:[HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should merge the data',()=>{
    const expected = [
      {practiceCategoryId: 1, name: 'Category 1',
      practiceTemplates: [
        { practiceTemplateId: 1, name: 'Template 1', practiceCategoryId: 1 },
        { practiceTemplateId: 2, name: 'Template 2', practiceCategoryId: 1 },
      ],
    },

    {
      practiceCategoryId: 2,
      name: 'Category 2',
      practiceTemplates: [{ practiceTemplateId: 3, name: 'Template 3', practiceCategoryId: 2 }],
    },
    { practiceCategoryId: 3, name: 'Category 3', practiceTemplates: [{ practiceTemplateId: 4, name: 'Template 4', practiceCategoryId: 3 }] },
    ]
    const result = component.mergePracticeCategoriesAndTemplates(practiceCategories, practiceTemplates);
    expect(result).toEqual(expected);
  })

  it('should toggle fontColorChanger after calling expandAllChangeFont method',()=>{
      let fontBolder = false
      component.expandAllChangeFont();
      fontBolder=component.fontColorChanger
      expect(fontBolder).toBe(true)
  });

  it('should set selectedRow after calling getExpandedRow if different value',()=>{
     component.selectedRow=1
    component.getExpandedRow(2)
    expect(component.selectedRow).toBe(2)
  });

  it('should set selectedRow after calling getExpandedRow if same value',()=>{
    component.selectedRow=3
   component.getExpandedRow(3)
   expect(component.selectedRow).toBe(-1)
 });
  
 it('should expand all rows when expanded is false', () => {
  spyOn(component, 'expandAll');
  spyOn(component, 'getExpandedRow');
  component.toggleExpandCollapseAll(123);
  expect(component.expanded).toBeTrue();
  expect(component.expandAll).toHaveBeenCalled();
  expect(component.getExpandedRow).toHaveBeenCalledWith(123);
});

it('should collapse all rows when expanded is true', () => {
  spyOn(component, 'collapseAll');
  component.expanded = true;
  component.toggleExpandCollapseAll(123);
  expect(component.expanded).toBeFalse();
  expect(component.collapseAll).toHaveBeenCalled();
});

it('should filter data after calling filterAllPRacticeMethod',()=>{
  let nestedData = [
    { practiceId: 1, data: 'Data 1' },
    { practiceId: 2, data: 'Data 2' },
    { practiceId: 1, data: 'Data 3' },
    { practiceId: 3, data: 'Data 4' },
  ];
  component.nestedData = nestedData;

  component.filterAllPractice(1);

  expect(component.allDataCombined.length).toBe(2);
  expect(component.allDataCombined[0].data).toBe('Data 1');
  expect(component.allDataCombined[1].data).toBe('Data 3');
});

it('should set allDataCombined to an empty array if there are no matches', () => {
  let nestedData = [
    { practiceId: 1, data: 'Data 1' },
    { practiceId: 2, data: 'Data 2' },
    { practiceId: 1, data: 'Data 3' },
    { practiceId: 3, data: 'Data 4' },
  ];
  component.nestedData = nestedData;

  component.filterAllPractice(4);

  expect(component.allDataCombined.length).toBe(0);
});

});

describe('Report Template subscribe method', () => {
  let component: ReportTemplateComponent;
  let practiceService: jasmine.SpyObj<PracticeService>;
  let practiceCategoryServiceSpy: jasmine.SpyObj<PracticeCategoryService>;
  let practiceTemplateServiceSpy: jasmine.SpyObj<PracticeTemplateService>;
  practiceCategoryServiceSpy = jasmine.createSpyObj('PracticeCategoryService', ['getAllPracticeCategories']);
  practiceTemplateServiceSpy = jasmine.createSpyObj('PracticeTemplateService', ['getAllPracticeTemplate']);

  beforeEach(() => {
    practiceCategoryServiceSpy = jasmine.createSpyObj('PracticeCategoryService', ['getAllPracticeCategories']);
    practiceTemplateServiceSpy = jasmine.createSpyObj('PracticeTemplateService', ['getAllPracticeTemplate']);
  

    const PracticeServiceSpy = jasmine.createSpyObj('PracticeService', ['getAllPractices']);

    TestBed.configureTestingModule({
      declarations: [ReportTemplateComponent],
      imports:[HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: PracticeService, useValue: PracticeServiceSpy },
        {provide:PracticeCategoryService , useValue:practiceCategoryServiceSpy},
        {provide:PracticeTemplateService , useValue:practiceTemplateServiceSpy}
      ]
    });
    component = TestBed.createComponent(ReportTemplateComponent).componentInstance;
    practiceService = TestBed.inject(PracticeService) as jasmine.SpyObj<PracticeService>;
  });

  it('should call getAllPractice Method', () => {
    practiceService.getAllPractices.and.returnValue(of([] ));
    component.getAllPractice();
    expect(practiceService.getAllPractices).toHaveBeenCalled();
  });

  it('should set allPractice when getAllPractice is called', () => {
    const practiceData =[
      {isActive: true,lastModifiedBy:"Jitendra",lastModifiedDate:"2022-08-15T00:00:00",practiceGroupId:1,practiceId:1,practiceName:"BA"},
      {isActive: true,lastModifiedBy:"Jitendra",lastModifiedDate:"2022-08-15T00:00:00",practiceGroupId:2,practiceId:2,practiceName:"QA"}
    ]
    practiceService.getAllPractices.and.returnValue(of({ data: practiceData }));
    component.getAllPractice();
    expect(component.allPractice).toEqual(practiceData);
  });

  it('should set allPracticeCategory, allPracticeTemplate, nestedData and allDataCombined correctly', () => {
    const practiceCategories = [{ id: 1, name: 'Category 1' }];
    const practiceTemplates = [{ id: 1, name: 'Template 1', categoryId: 1 }];
    const nestedData = [{ category: { id: 1, name: 'Category 1' }, templates: [{ id: 1, name: 'Template 1', categoryId: 1 }] }];
    
    practiceCategoryServiceSpy.getAllPracticeCategories.and.returnValue(of({ data: practiceCategories }));
    practiceTemplateServiceSpy.getAllPracticeTemplate.and.returnValue(of({ data: practiceTemplates }));

    component.getAllPracticeCategory();

     expect(practiceCategoryServiceSpy.getAllPracticeCategories).toHaveBeenCalled();
     expect(practiceTemplateServiceSpy.getAllPracticeTemplate).toHaveBeenCalled();
     expect(component.allPracticeCategory).toEqual(practiceCategories);
     expect(component.allPracticeTemplate).toEqual(practiceTemplates);
  });

  it('should call filterAllPractice with the correct parameter if record is true', () => {
    component.record = true;
    component.selectedPracticeId = 1;
    spyOn(component, 'filterAllPractice');

    practiceCategoryServiceSpy.getAllPracticeCategories.and.returnValue(of({ data: [] }));
    practiceTemplateServiceSpy.getAllPracticeTemplate.and.returnValue(of({ data: [] }));

    component.getAllPracticeCategory();

    expect(component.filterAllPractice).toHaveBeenCalledWith(component.selectedPracticeId);
  });


});
