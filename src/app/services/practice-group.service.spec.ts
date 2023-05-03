import { TestBed } from '@angular/core/testing';
import { PracticeGroupService } from './practice-group.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { IPracticeGroup } from '../interface/ipractice-group';

fdescribe('PracticeGroupService', () => {
  let service: PracticeGroupService;
  let mockHttpClient: HttpClient;
  let response: IPracticeGroup[];
  let response1: IPracticeGroup;

  beforeEach(() => {
    service = new PracticeGroupService(mockHttpClient);
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule]
    });
    service = TestBed.inject(PracticeGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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

  it('should get practice group by id', () => {
    let mockResponse = [
      {
        practiceGroupId: 1, practiceGroupName: "BA", isActive: true, lastModifiedBy: "Nidhi", lastModifiedDate: new Date(), groupId: 0
      }
    ]

    spyOn(service, 'getPRbyId').and.returnValue(of(mockResponse));
    service.getPRbyId(1).subscribe(res => { response = res });
    expect(response).toEqual(mockResponse);
  });

  it('should insert practice-group', () => {
    let mockResponse: any =
      [{
        practiceGroupId: 1, practiceGroupName: "BA", isActive: true, lastModifiedBy: "Nidhi", lastModifiedDate: new Date(), groupId: 0
      }]

    spyOn(service, 'postPracticeGroup').and.returnValue(of(mockResponse));
    service.postPracticeGroup(response1).subscribe(res => { response1 = res });
    expect(response1).toEqual(mockResponse);
  });

  it('should update practice-group', () => {

    let mockResponse: any = [
      {
        practiceGroupId: 1, practiceGroupName: "BA", isActive: true, lastModifiedBy: "Nidhi", lastModifiedDate: new Date(), groupId: 0
      }
    ]

    let response;
    spyOn(service, 'putPracticeGroup').and.returnValue(of(mockResponse));
    service.putPracticeGroup(1, response).subscribe(res => { response = res });
    expect(response).toEqual(mockResponse);
  });

  it('should delete practice-group', () => {
    let mockResponse: any = [
      {
        practiceGroupId: 1, practiceGroupName: "BA", isActive: true, lastModifiedBy: "Nidhi", lastModifiedDate: new Date(), groupId: 0
      }
    ]

    let response;
    spyOn(service, 'deletePracticeGroup').and.returnValue(of(mockResponse));
    service.deletePracticeGroup(1).subscribe(res => { response = res });
    expect(response).toEqual(mockResponse);
  });

  it('should soft-delete practice-group', () => {
    let mockResponse: any = [
      {
        practiceGroupId: 1, practiceGroupName: "BA", isActive: true, lastModifiedBy: "Nidhi", lastModifiedDate: new Date(), groupId: 0
      }
    ]

    let response;
    spyOn(service, 'softdeletePracticeGroup').and.returnValue(of(mockResponse));
    service.softdeletePracticeGroup(1).subscribe(res => { response = res });
    expect(response).toEqual(mockResponse);
  });
});
