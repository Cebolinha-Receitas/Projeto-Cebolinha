import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroReceitas } from './cadastro-receitas';

describe('CadastroReceitas', () => {
  let component: CadastroReceitas;
  let fixture: ComponentFixture<CadastroReceitas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroReceitas],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroReceitas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
