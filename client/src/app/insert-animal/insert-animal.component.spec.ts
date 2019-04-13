import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertAnimalComponent } from './insert-animal.component';

describe('InsertAnimalComponent', () => {
  let component: InsertAnimalComponent;
  let fixture: ComponentFixture<InsertAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
