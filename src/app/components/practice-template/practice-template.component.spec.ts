import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeTemplateComponent } from './practice-template.component';

describe('PracticeTemplateComponent', () => {
  let component: PracticeTemplateComponent;
  let fixture: ComponentFixture<PracticeTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticeTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
