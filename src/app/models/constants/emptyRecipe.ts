import { Receita } from "../receita";

export const RECIPE_EMPTY: Receita = {
  id: '',
  title: '',
  category: '', // Ex: 'ALMOCO', 'SOBREMESA'
  description: '',
  ingredients: '',
  steps: '', // Equivale ao modo de preparo
  photoUrl: '',
  createdDate: '',
  updatedDate: ''
}