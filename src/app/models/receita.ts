export interface Receita {
  id?: string; // UUID do Java é tratado como string no TypeScript
  title: string;
  category: string; // Ex: 'ALMOCO', 'SOBREMESA'
  description?: string;
  ingredients: string;
  steps: string; // Equivale ao modo de preparo
  photoUrl?: string;
  createdDate?: string;
  updatedDate?: string;
}