import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useLoginMutation } from '../slices/apiSlice';
import { getUser } from '../slices/apiSlice';
// import { login, reset } from '../features/auth/authSlice';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const navigate = useNavigate();
  /* const { user } = useSelector((state) => state.auth); */
  const [login, { isLoading, isFetching }] = useLoginMutation();

  useEffect(() => {
    const user = getUser();
    if (user?._id) {
      navigate('/');
    }
  }, [isFetching, isLoading]);
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 100, transition: { duration: 0.5 } }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        minHeight: '100vh',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          backgroundColor: 'white',
          px: 5,
          boxSizing: 'border-box',
          height: '45vh',
          width: '50vh',
        }}
      >
        <Stack direction={'row'} justifyContent={'center'} sx={{ py: 3 }}>
          <RocketLaunchOutlinedIcon sx={{ fontSize: '3rem' }} />
        </Stack>
        <Divider
          textAlign="center"
          sx={{
            '&::before, &::after': {
              borderColor: '#000000',
            },
          }}
        >
          FORNITURE
        </Divider>
        {/* type={showPassword ? "text" : "password"} */}
        <form>
          <FormControl fullWidth sx={{ mt: 3 }} variant="outlined">
            <InputLabel htmlFor="login">Login </InputLabel>
            <OutlinedInput
              onChange={(e) => setLoginValue(e.target.value)}
              value={loginValue}
              id="login"
              type={'text'}
              endAdornment={
                <InputAdornment position="end">
                  <PersonIcon />
                </InputAdornment>
              }
              label="Login"
            />
          </FormControl>

          <FormControl fullWidth sx={{ mt: 3, mb: 1 }} variant="outlined">
            <InputLabel htmlFor="password">Password </InputLabel>
            <OutlinedInput
              onChange={(e) => setPasswordValue(e.target.value)}
              value={passwordValue}
              id="password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Typography variant="subtitle2" color={'error'} textAlign={'center'}>
            {/* {message} */}
          </Typography>
        </form>
        <Stack
          direction={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Button
            disabled={!loginValue || !passwordValue || isLoading}
            onClick={() => {
              login({ password: passwordValue, email: loginValue });
            }}
            variant="contained"
            sx={{
              backgroundColor: '#000000',
              mt: 2,
              width: '10rem',
              fontWeight: 'bold',
              letterSpacing: '0.2rem',
            }}
          >
            Login
          </Button>
          <Button
            onClick={() => navigate('/cadastrar')}
            variant="text"
            sx={{
              mt: '0.9rem',
              width: '80%',
              fontWeight: 'bold',
              fontSize: '0.7rem',
              color: '#6A79DB',
              borderRadius: 0,
              padding: '0 !important',
              '&:hover': {
                borderBottom: '1px solid #6A79DB',
                backgroundColor: 'transparent',
              },
            }}
          >
            Não tem uma conta ainda? Cadastre-se aqui
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
