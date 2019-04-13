import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAnimalComponent } from './select-animal.component';

describe('SelectAnimalComponent', () => {
  let component: SelectAnimalComponent;
  let fixture: ComponentFixture<SelectAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
