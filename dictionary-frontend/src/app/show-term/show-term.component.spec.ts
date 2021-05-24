import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTermComponent } from './show-term.component';

describe('ShowTermComponent', () => {
  let component: ShowTermComponent;
  let fixture: ComponentFixture<ShowTermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTermComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
