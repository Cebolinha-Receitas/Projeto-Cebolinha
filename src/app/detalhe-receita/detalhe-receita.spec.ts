import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalheReceita } from './detalhe-receita';

describe('DetalheReceita', () => {
  let component: DetalheReceita;
  let fixture: ComponentFixture<DetalheReceita>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheReceita],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalheReceita);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
