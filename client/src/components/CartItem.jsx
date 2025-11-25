/* eslint-disable react/prop-types */
import { Add, Remove, Delete } from '@mui/icons-material';
import { Box, IconButton, Paper, Typography, Button } from '@mui/material';
import { formatCurrency } from '../utils/formatCurrency';

const CartItem = ({ product, onUpdateQuantity, onRemove }) => {
  return (
    <Box display="flex" py={2} borderBottom="1px solid #e0e0e0">
      {/* Imagem Otimizada */}
      <Box
        component="img"
        src={product?.images[0]}
        alt={product?.name}
        sx={{
          width: 120,
          height: 90,
          objectFit: 'cover',
          borderRadius: 2, // Use unidades do tema (8px)
          mr: 2,
        }}
      />

      <Box flexGrow={1}>
        <Typography variant="h6" fontWeight="bold">
          {product?.name}
        </Typography>

        <Typography
          color={product?.available ? 'green' : 'error'}
          variant="body2"
        >
          {product?.available ? 'Em estoque' : 'Esgotado'}
        </Typography>

        <Box mt={1} display="flex" alignItems="center" gap={2}>
          <Paper
            elevation={0} // Design mais limpo, borda sutil
            variant="outlined"
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: 5, // Arredondado moderno
            }}
          >
            <IconButton
              size="small"
              onClick={() => onUpdateQuantity(product, -1)}
              disabled={product.qtySelected <= 1}
            >
              <Remove fontSize="small" />
            </IconButton>

            <Typography sx={{ mx: 2, fontWeight: 'bold' }}>
              {product.qtySelected}
            </Typography>

            <IconButton
              size="small"
              onClick={() => onUpdateQuantity(product, 1)}
            >
              <Add fontSize="small" />
            </IconButton>
          </Paper>

          <Button
            startIcon={<Delete fontSize="small" />}
            onClick={() => onRemove(product._id)}
            color="error"
            size="small"
            sx={{ textTransform: 'none' }}
          >
            Remover
          </Button>
        </Box>
      </Box>

      <Typography fontWeight={600} alignSelf="flex-start">
        {formatCurrency(product?.price)}
      </Typography>
    </Box>
  );
};

export default CartItem;
