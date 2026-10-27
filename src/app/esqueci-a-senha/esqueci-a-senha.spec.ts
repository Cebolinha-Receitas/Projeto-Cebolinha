import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EsqueciASenha } from './esqueci-a-senha';

describe('EsqueciASenha', () => {
  let component: EsqueciASenha;
  let fixture: ComponentFixture<EsqueciASenha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsqueciASenha],
    }).compileComponents();

    fixture = TestBed.createComponent(EsqueciASenha);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
