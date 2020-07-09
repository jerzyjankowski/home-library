import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeOptionComponent } from './attribute-option.component';

describe('AttributeOptionComponent', () => {
  let component: AttributeOptionComponent;
  let fixture: ComponentFixture<AttributeOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
