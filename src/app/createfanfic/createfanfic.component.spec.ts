import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatefanficComponent } from './createfanfic.component';

describe('CreatefanficComponent', () => {
  let component: CreatefanficComponent;
  let fixture: ComponentFixture<CreatefanficComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatefanficComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatefanficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
