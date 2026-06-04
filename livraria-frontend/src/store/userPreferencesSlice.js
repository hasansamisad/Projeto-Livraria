import { createSlice } from '@reduxjs/toolkit';

// Inicializa o estado buscando com segurança do localStorage
const initialState = {
  favorites: JSON.parse(localStorage.getItem("sami_books_favorites") || "[]"),
  readBooks: JSON.parse(localStorage.getItem("sami_books_read") || "[]"),
};

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    // Ação para adicionar/remover favoritos (Toggle)
    toggleFavorite: (state, action) => {
      const bookId = Number(action.payload);
      const index = state.favorites.indexOf(bookId);
      
      if (index >= 0) {
        state.favorites.splice(index, 1); // Remove se já existir
      } else {
        state.favorites.push(bookId); // Adiciona se não existir
      }
      // Sincroniza o localStorage automaticamente
      localStorage.setItem("sami_books_favorites", JSON.stringify(state.favorites));
    },
    
    // Ação para adicionar/remover livros lidos (Toggle)
    toggleRead: (state, action) => {
      const bookId = Number(action.payload);
      const index = state.readBooks.indexOf(bookId);
      
      if (index >= 0) {
        state.readBooks.splice(index, 1);
      } else {
        state.readBooks.push(bookId);
      }
      localStorage.setItem("sami_books_read", JSON.stringify(state.readBooks));
    }
  }
});

export const { toggleFavorite, toggleRead } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;