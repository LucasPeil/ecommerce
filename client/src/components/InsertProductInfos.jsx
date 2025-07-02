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
  showProductInfo,
  formik,
  setProductcategory,
  setShowProductInfo,
  setShowCarousel,
  setShowReviewArea,
  photosToDisplay,
  productcategory,
}) => {
  return (
    <Box
      sx={{
        height: showProductInfo ? '60vh' : '0vh',
        opacity: showProductInfo ? 1 : 0,
        transition: '0.5s ease',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}
    >
      <Stack direction="row" spacing={2}>
        <Field
          {...formik.getFieldProps('name')}
          label="Nome do produto"
          variant="outlined"
          as={TextField}
          error={Boolean(formik.touched.name && formik.errors.name)}
          helperText={formik.errors.name && formik.errors.name}
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
          minRows={13}
          maxRows={14}
          as={TextField}
          error={Boolean(
            formik.touched.description && formik.errors.description
          )}
          helperText={formik.errors.description && formik.errors.description}
          fullWidth
          sx={{ width: { xs: '100%' } }}
        />
      </Stack>

      <Stack direction="row" spacing={2}>
        <Field
          {...formik.getFieldProps('quantity')}
          label="Quantidade disponível"
          type="number"
          variant="outlined"
          as={TextField}
          error={Boolean(formik.touched.quantity && formik.errors.quantity)}
          helperText={formik.errors.quantity && formik.errors.quantity}
          fullWidth
          sx={{ width: { xs: '33%' } }}
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
          helperText={formik.errors.price && formik.errors.price}
          fullWidth
          sx={{ width: { xs: '33%' } }}
        />
        <FormControl sx={{ width: { xs: '33%' } }}>
          <InputLabel id="category">Categoria do produto</InputLabel>
          <Select
            labelId="category"
            id="category"
            value={
              formik.values.category ? formik.values.category : productcategory
            }
            label="Condição do produto"
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
          <FormHelperText sx={{ color: 'red' }}>
            {Boolean(formik.touched.category && formik.errors.category) &&
              formik.errors.category}
          </FormHelperText>
        </FormControl>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button
          onClick={() => {
            setShowProductInfo(false);
            setShowCarousel(true);
          }}
          fullWidth
          sx={{
            backgroundColor: 'black',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          Voltar
        </Button>
        <Button
          disabled={Object.keys(formik.errors).length > 0}
          onClick={() => {
            setShowProductInfo(false);
            setShowReviewArea(true);
            formik.setFieldValue('images', photosToDisplay);
          }}
          fullWidth
          sx={{
            backgroundColor:
              Object.keys(formik.errors).length > 0 ? '#aaaaaa' : 'black',
            color: Object.keys(formik.errors).length > 0 ? 'white' : 'white',
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        >
          Revisar dados
        </Button>
      </Stack>
    </Box>
  );
};

export default InsertProductInfos;
