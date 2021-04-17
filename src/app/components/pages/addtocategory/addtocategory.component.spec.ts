import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtocategoryComponent } from './addtocategory.component';

describe('AddtocategoryComponent', () => {
  let component: AddtocategoryComponent;
  let fixture: ComponentFixture<AddtocategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtocategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtocategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
