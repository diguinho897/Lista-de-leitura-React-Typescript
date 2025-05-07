import { useState } from 'react';
import { 
  Paper, 
  TextField, 
  Button, 
  Box, 
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import axios from 'axios';
import type { Book } from '../types/Book';

interface AddBookFormProps {
  onAddBook: (book: Book) => void;
}

const AddBookForm = ({ onAddBook }: AddBookFormProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchBook = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=1`
      );

      if (response.data.items && response.data.items.length > 0) {
        const bookData = response.data.items[0].volumeInfo;
        const newBook: Book = {
          id: response.data.items[0].id,
          title: bookData.title,
          authors: bookData.authors || ['Autor Desconhecido'],
          description: bookData.description || 'Sem descrição disponível',
          thumbnail: bookData.imageLinks?.thumbnail || '',
          isRead: false,
          rating: 0,
          addedAt: new Date()
        };
        onAddBook(newBook);
        setSearchQuery('');
      } else {
        setError('Nenhum livro encontrado');
      }
    } catch (err) {
      setError('Erro ao buscar livro');
      console.error('Erro ao buscar livro:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Adicionar Novo Livro
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        <TextField
          fullWidth
          label="Buscar livro"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          onKeyPress={(e: React.KeyboardEvent) => e.key === 'Enter' && searchBook()}
          disabled={loading}
        />
        <Button
          variant="contained"
          onClick={searchBook}
          disabled={loading || !searchQuery.trim()}
          sx={{ minWidth: 120 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Buscar'}
        </Button>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Paper>
  );
};

export default AddBookForm; 