import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInventoryComponent } from './personal-inventory.component';

describe('PersonalInventoryComponent', () => {
  let component: PersonalInventoryComponent;
  let fixture: ComponentFixture<PersonalInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
