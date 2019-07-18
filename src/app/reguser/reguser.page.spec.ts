import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReguserPage } from './reguser.page';

describe('ReguserPage', () => {
  let component: ReguserPage;
  let fixture: ComponentFixture<ReguserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReguserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReguserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
