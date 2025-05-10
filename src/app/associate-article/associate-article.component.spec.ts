import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateArticleComponent } from './associate-article.component';

describe('AssociateArticleComponent', () => {
  let component: AssociateArticleComponent;
  let fixture: ComponentFixture<AssociateArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociateArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
