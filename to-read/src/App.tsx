import { useState } from 'react'
import { Container, Typography, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import BookList from './components/BookList'
import AddBookForm from './components/AddBookForm'
import type { Book } from './types/Book'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

function App() {
  const [books, setBooks] = useState<Book[]>([])

  const handleAddBook = (book: Book) => {
    setBooks([...books, book])
  }

  const handleToggleRead = (id: string) => {
    setBooks(books.map(book => 
      book.id === id ? { ...book, isRead: !book.isRead } : book
    ))
  }

  const handleUpdateRating = (id: string, rating: number) => {
    setBooks(books.map(book => 
      book.id === id ? { ...book, rating } : book
    ))
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Minha Lista de Leitura
          </Typography>
          <AddBookForm onAddBook={handleAddBook} />
          <BookList 
            books={books} 
            onToggleRead={handleToggleRead}
            onUpdateRating={handleUpdateRating}
          />
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
