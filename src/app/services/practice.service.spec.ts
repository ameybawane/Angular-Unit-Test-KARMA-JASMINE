import { TestBed } from '@angular/core/testing';
import { PracticeService } from './practice.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { IPractice } from '../interface/ipractice';

fdescribe('PracticeService', () => {
  let service: PracticeService;
  let mockHttpClient: HttpClient;
  let response: IPractice[];

  beforeEach(() => {
    service = new PracticeService(mockHttpClient);
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule]
    });
    service = TestBed.inject(PracticeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all practices', () => {
    let mockResponse = [
      {
        practiceId: 1, practiceName: "BA", practiceGroupId: 1, isActive: true, lastModifiedBy: "Nidhi", lastModifiedDate: new Date(), groupId: 0
      }
    ]

    spyOn(service, 'getAllPractices').and.returnValue(of(mockResponse));
    service.getAllPractices().subscribe(res => { response = res });
    expect(response).toEqual(mockResponse);
  });

  it('should get practice by id', () => {
    let mockResponse = [
      {
        practiceId: 1, practiceName: "BA", practiceGroupId: 1, isActive: true, lastModifiedBy: "Nidhi", lastModifiedDate: new Date(), groupId: 0
      }
    ]

    spyOn(service, 'getPracticebyId').and.returnValue(of(mockResponse));
    service.getPracticebyId(1).subscribe(res => { response = res });
    expect(response).toEqual(mockResponse);
  });

  it('should insert practice', () => {
    let mockResponse: any = [
      {
        practiceId: 1, practiceName: "BA", practiceGroupId: 1, isActive: true, lastModifiedBy: "Nidhi", lastModifiedDate: new Date(), groupId: 0
      }
    ]
    spyOn(service, 'postPractice').and.returnValue(of(mockResponse));
    service.postPractice(mockResponse).subscribe(res => { response = res });
    expect(response).toEqual(mockResponse);
  });

  it('should update practice', () => {
    let mockResponse = [
      {
        practiceId: 1, practiceName: "BA", practiceGroupId: 1, isActive: true, lastModifiedBy: "Nidhi", lastModifiedDate: new Date(), groupId: 0
      }
    ]

    spyOn(service, 'putPractice').and.returnValue(of(mockResponse));
    service.putPractice(1, response).subscribe(res => { response = res });
    expect(response).toEqual(mockResponse);
  });

  it('should delete practice', () => {
    let mockResponse: any = [
      {
        practiceId: 1, practiceName: "BA", practiceGroupId: 1, isActive: true, lastModifiedBy: "Nidhi", lastModifiedDate: new Date(), groupId: 0
      }
    ]

    spyOn(service, 'deletePractice').and.returnValue(of(mockResponse));
    service.deletePractice(1).subscribe(res => { response = res });
    expect(response).toEqual(mockResponse);
  });

  it('should soft-delete practice', () => {
    let mockResponse: any = [
      {
        practiceId: 1, practiceName: "BA", practiceGroupId: 1, isActive: true, lastModifiedBy: "Nidhi", lastModifiedDate: new Date(), groupId: 0
      }
    ]

    spyOn(service, 'softdeletePractice').and.returnValue(of(mockResponse));
    service.softdeletePractice(1).subscribe(res => { response = res });
    expect(response).toEqual(mockResponse);
  });

  it('should get all practice groups', () => {
    let mockResponse = [
      {
        practiceGroupId: 1, practiceGroupName: "BA", isActive: true, lastModifiedBy: "Nidhi", lastModifiedDate: new Date(), groupId: 0
      }
    ]

    spyOn(service, 'getAllPracticeGroups').and.returnValue(of(mockResponse));
    service.getAllPracticeGroups().subscribe(res => { response = res });
    expect(response).toEqual(mockResponse);
  });
});
