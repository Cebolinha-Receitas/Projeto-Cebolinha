import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarDadosConta } from './editar-dados-conta';

describe('EditarDadosConta', () => {
  let component: EditarDadosConta;
  let fixture: ComponentFixture<EditarDadosConta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarDadosConta],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarDadosConta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
