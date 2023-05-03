import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PracticeGroupComponent } from './practice-group.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, NgModel } from '@angular/forms';
import { delay, of } from 'rxjs';
import { PracticeGroupService } from 'src/app/services/practice-group.service';
import { IPracticeGroup } from 'src/app/interface/ipractice-group';
import { PrimeNGConfig } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';

fdescribe('PracticeGroupComponent', () => {
  let component: PracticeGroupComponent;
  let fixture: ComponentFixture<PracticeGroupComponent>;
  let service: PracticeGroupService;
  let mockResponse: IPracticeGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PracticeGroupComponent],
      imports: [HttpClientTestingModule, CheckboxModule],
      providers: [NgModel, PrimeNGConfig, FormBuilder]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PracticeGroupComponent);
    component = fixture.componentInstance;
    service = TestBed.get(PracticeGroupService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all practice-groups', fakeAsync(() => {
    spyOn(service, 'getAllPracticeGroups').and.returnValue(of([mockResponse]).pipe(delay(1)));

    // Trigger ngOnInit()
    fixture.detectChanges();

    expect(component.posts).toBeUndefined();
    expect(service.getAllPracticeGroups).toHaveBeenCalledWith();

    // Simulates the asynchronous passage of time
    tick(1);
    expect(component.posts[0]).toEqual(mockResponse);
  }));

  it('should get practice-groups by Id', fakeAsync(() => {
    spyOn(service, 'getPRbyId').and.returnValue(of(mockResponse).pipe(delay(1)));

    // Trigger ngOnInit()
    fixture.detectChanges();

    expect(component.posts).toBeUndefined();
    service.getPRbyId(1).subscribe(res => {
      expect(res).toBe(mockResponse);
    })
    tick(1);
  }));

  it('should add practice-group ', fakeAsync(() => {

    spyOn(service, 'postPracticeGroup').and.returnValue(of(mockResponse).pipe(delay(1)));
    fixture.detectChanges();

    expect(component.posts).toBeUndefined();
    service.postPracticeGroup(mockResponse).subscribe(res => {
      expect(res).toBe(mockResponse);
    })
    tick(1);
  }
  ));

  it('should update practice group', fakeAsync(() => {
    spyOn(service, 'putPracticeGroup').and.returnValue(of(mockResponse).pipe(delay(1)));

    fixture.detectChanges();

    expect(component.posts).toBeUndefined();
    service.putPracticeGroup(1, mockResponse).subscribe(res => {
      expect(res).toBe(mockResponse);
    })
    tick(1);
  }
  ));

  it('should delete practice group by Id', fakeAsync(() => {
    spyOn(service, 'deletePracticeGroup').and.returnValue(of(mockResponse).pipe(delay(1)));

    fixture.detectChanges();

    expect(component.posts).toBeUndefined();
    service.deletePracticeGroup(1).subscribe(res => {
      expect(res).toBe(mockResponse);
    })
    tick(1);
  }
  ));

  it('should soft delete practice group by Id', fakeAsync(() => {
    spyOn(service, 'softdeletePracticeGroup').and.returnValue(of(mockResponse).pipe(delay(1)));

    fixture.detectChanges();

    expect(component.posts).toBeUndefined();
    service.softdeletePracticeGroup(1).subscribe(res => {
      expect(res).toBe(mockResponse);
    })
    tick(1);
  }
  ));
});
