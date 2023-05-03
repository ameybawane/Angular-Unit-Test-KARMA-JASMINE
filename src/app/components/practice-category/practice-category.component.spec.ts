import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeCategoryComponent } from './practice-category.component';

describe('PracticeCategoryComponent', () => {
  let component: PracticeCategoryComponent;
  let fixture: ComponentFixture<PracticeCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticeCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
