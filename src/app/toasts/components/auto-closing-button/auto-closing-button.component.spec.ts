import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoClosingButtonComponent } from './auto-closing-button.component';

describe('AutoClosingButtonComponent', () => {
  let component: AutoClosingButtonComponent;
  let fixture: ComponentFixture<AutoClosingButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoClosingButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoClosingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
