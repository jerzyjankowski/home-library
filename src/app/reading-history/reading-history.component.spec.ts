import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingHistoryComponent } from './reading-history.component';

describe('ReadingHistoryComponent', () => {
  let component: ReadingHistoryComponent;
  let fixture: ComponentFixture<ReadingHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
