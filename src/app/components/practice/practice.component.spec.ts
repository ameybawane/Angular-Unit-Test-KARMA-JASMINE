import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, NgModel } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { delay, of } from 'rxjs';
import { IPractice } from 'src/app/interface/ipractice';
import { PracticeService } from 'src/app/services/practice.service';
import { PracticeComponent } from './practice.component';

fdescribe('PracticeComponent', () => {
  let component: PracticeComponent;
  let fixture: ComponentFixture<PracticeComponent>;
  let service: PracticeService;
  let mockResponse: IPractice;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PracticeComponent],
      imports: [HttpClientTestingModule, CheckboxModule],
      providers: [NgModel, PrimeNGConfig, FormBuilder]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PracticeComponent);
    component = fixture.componentInstance;
    service = TestBed.get(PracticeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all practice', fakeAsync(() => {
    spyOn(service, 'getAllPractices').and.returnValue(of([mockResponse]).pipe(delay(1)));

    // Trigger ngOnInit()
    fixture.detectChanges();

    expect(component.posts).toBeUndefined();
    expect(service.getAllPractices).toHaveBeenCalledWith();

    // Simulates the asynchronous passage of time
    tick(1);
    expect(component.posts[0]).toEqual(mockResponse);
  }));

  it('should get practice by Id', fakeAsync(() => {
    spyOn(service, 'getPracticebyId').and.returnValue(of(mockResponse).pipe(delay(1)));

    // Trigger ngOnInit()
    fixture.detectChanges();

    expect(component.posts).toBeUndefined();
    service.getPracticebyId(1).subscribe(res => {
      expect(res).toBe(mockResponse);
    })
    tick(1);
  }));

  it('should add practice ', fakeAsync(() => {

    spyOn(service, 'postPractice').and.returnValue(of(mockResponse).pipe(delay(1)));
    fixture.detectChanges();

    expect(component.posts).toBeUndefined();
    service.postPractice(mockResponse).subscribe(res => {
      expect(res).toBe(mockResponse);
    })
    tick(1);
  }
  ));

  it('should update practice', fakeAsync(() => {
    spyOn(service, 'putPractice').and.returnValue(of(mockResponse).pipe(delay(1)));

    fixture.detectChanges();

    expect(component.posts).toBeUndefined();
    service.putPractice(1, mockResponse).subscribe(res => {
      expect(res).toBe(mockResponse);
    })
    tick(1);
  }
  ));

  it('should delete practice by Id', fakeAsync(() => {
    spyOn(service, 'deletePractice').and.returnValue(of(mockResponse).pipe(delay(1)));

    fixture.detectChanges();

    expect(component.posts).toBeUndefined();
    service.deletePractice(1).subscribe(res => {
      expect(res).toBe(mockResponse);
    })
    tick(1);
  }
  ));

  it('should soft delete practice by Id', fakeAsync(() => {
    spyOn(service, 'softdeletePractice').and.returnValue(of(mockResponse).pipe(delay(1)));

    fixture.detectChanges();

    expect(component.posts).toBeUndefined();
    service.softdeletePractice(1).subscribe(res => {
      expect(res).toBe(mockResponse);
    })
    tick(1);
  }
  ));
});
