import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysePdfComponent } from './analyse-pdf.component';

describe('AnalysePdfComponent', () => {
  let component: AnalysePdfComponent;
  let fixture: ComponentFixture<AnalysePdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysePdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
