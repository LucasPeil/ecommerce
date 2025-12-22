import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { Field } from 'formik';
import 'react-multi-carousel/lib/styles.css';

const InsertProductInfos = ({
  visible,
  formik,
  productcategory,
  onBack,
  onNext,
  setProductcategory, 
}) => {
  return (
    <Box
      sx={{
        height: visible ? 'auto' : '0rem', // Use 0rem or 0px
        opacity: visible ? 1 : 0,
        transition: '0.5s ease',
        overflow: 'hidden',
        // display: 'flex', // Always keep it in layout flow but hidden by height
        // contentVisibility: visible ? 'auto' : 'hidden', // Optional optim
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        visibility: visible ? 'visible' : 'hidden',
      }}
    >
      <Stack direction="row" spacing={2}>
        <Field
          {...formik.getFieldProps('name')}
          label="Nome do produto"
          variant="outlined"
          as={TextField}
          error={Boolean(formik.touched.name && formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          fullWidth
          sx={{ width: { xs: '100%' } }}
        />
      </Stack>
      <Stack direction="row" spacing={1}>
        <Field
          {...formik.getFieldProps('description')}
          label="Fale mais sobre o produto"
          variant="outlined"
          multiline
          minRows={4}
          maxRows={14}
          as={TextField}
          error={Boolean(
            formik.touched.description && formik.errors.description
          )}
          helperText={formik.touched.description && formik.errors.description}
          fullWidth
          sx={{ width: { xs: '100%' } }}
        />
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Field
          {...formik.getFieldProps('quantity')}
          label="Quantidade disponível"
          type="number"
          variant="outlined"
          as={TextField}
          error={Boolean(formik.touched.quantity && formik.errors.quantity)}
          helperText={formik.touched.quantity && formik.errors.quantity}
          fullWidth
          sx={{ width: { xs: '100%', md: '33%' } }}
        />
        <Field
          {...formik.getFieldProps('price')}
          label="Preço"
          variant="outlined"
          type="number"
          min="0"
          max="1000"
          step="0.50"
          as={TextField}
          error={Boolean(formik.touched.price && formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
          fullWidth
          sx={{ width: { xs: '100%', md: '33%' } }}
        />
        <FormControl sx={{ width: { xs: '100%', md: '33%' } }} error={Boolean(formik.touched.category && formik.errors.category)}>
          <InputLabel id="category">Categoria do produto</InputLabel>
          <Select
            labelId="category"
            id="category"
            value={
              formik.values.category ? formik.values.category : productcategory
            }
            label="Categoria do produto"
            onChange={(e) => {
              setProductcategory(e.target.value);
              formik.setFieldValue('category', e.target.value);
            }}
          >
            <MenuItem value={'Banheiro'}>Banheiro</MenuItem>
            <MenuItem value={'Cozinha'}>Cozinha</MenuItem>
            <MenuItem value={'Quarto'}>Quarto</MenuItem>
            <MenuItem value={'Sala'}>Sala</MenuItem>
          </Select>
          <FormHelperText>
             {formik.touched.category && formik.errors.category}
          </FormHelperText>
        </FormControl>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button
          onClick={onBack}
          fullWidth
          sx={{
            backgroundColor: 'black',
            color: 'white',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#333' }
          }}
        >
          Voltar
        </Button>
        <Button
          disabled={!formik.isValid || !formik.dirty} 
          onClick={onNext}
          fullWidth
          sx={{
            backgroundColor:
              !formik.isValid || !formik.dirty ? '#aaaaaa' : 'black',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1rem',
            '&:hover': {
                 backgroundColor: !formik.isValid || !formik.dirty ? '#aaaaaa' : '#333'
            }
          }}
        >
          Revisar dados
        </Button>
      </Stack>
    </Box>
  );
};

export default InsertProductInfos;
