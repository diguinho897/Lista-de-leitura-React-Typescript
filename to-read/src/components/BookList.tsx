import { Card, CardContent, CardMedia, Typography, Grid, IconButton, Rating, Box } from '@mui/material';
import { Book as BookIcon, CheckCircle, CheckCircleOutline } from '@mui/icons-material';
import type { Book } from '../types/Book';

interface BookListProps {
  books: Book[];
  onToggleRead: (id: string) => void;
  onUpdateRating: (id: string, rating: number) => void;
}

const BookList = ({ books, onToggleRead, onUpdateRating }: BookListProps) => {
  return (
    <Grid container spacing={3}>
      {books.map((book) => (
        <Grid item xs={12} sm={6} md={4} key={book.id}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              height="200"
              image={book.thumbnail || 'https://via.placeholder.com/200x300?text=No+Image'}
              alt={book.title}
              sx={{ objectFit: 'contain', bgcolor: '#f5f5f5' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h6" component="h2">
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {book.authors.join(', ')}
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Rating
                  value={book.rating}
                  onChange={(_: React.SyntheticEvent, value: number | null) => value && onUpdateRating(book.id, value)}
                />
                <IconButton
                  onClick={() => onToggleRead(book.id)}
                  color={book.isRead ? 'primary' : 'default'}
                >
                  {book.isRead ? <CheckCircle /> : <CheckCircleOutline />}
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BookList; 