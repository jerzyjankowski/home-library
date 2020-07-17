import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookElementValueModalComponent } from './add-book-element-value-modal.component';

describe('AddBookElementValueModalComponent', () => {
  let component: AddBookElementValueModalComponent;
  let fixture: ComponentFixture<AddBookElementValueModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBookElementValueModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookElementValueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
