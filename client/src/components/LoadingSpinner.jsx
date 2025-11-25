import { CircularProgress, Stack } from '@mui/material';
const LoadingSpinner = () => {
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
      }}
    >
      <CircularProgress />;
    </Stack>
  );
};

export default LoadingSpinner;
