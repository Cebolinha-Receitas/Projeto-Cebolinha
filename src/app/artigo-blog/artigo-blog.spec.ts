import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtigoBlog } from './artigo-blog';

describe('ArtigoBlog', () => {
  let component: ArtigoBlog;
  let fixture: ComponentFixture<ArtigoBlog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtigoBlog],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtigoBlog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
