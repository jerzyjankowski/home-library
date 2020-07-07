import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksSearchboxComponent } from './books-searchbox.component';

describe('BooksSearchboxComponent', () => {
  let component: BooksSearchboxComponent;
  let fixture: ComponentFixture<BooksSearchboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksSearchboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksSearchboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
