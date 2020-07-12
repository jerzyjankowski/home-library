import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingRegisterModalComponent } from './reading-register-modal.component';

describe('ReadingRegisterModalComponent', () => {
  let component: ReadingRegisterModalComponent;
  let fixture: ComponentFixture<ReadingRegisterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingRegisterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingRegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
