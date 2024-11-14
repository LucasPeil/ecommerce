import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cadastrar, reset } from '../features/auth/authSlice';
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

  const { user, isSuccess } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate('/visao-geral');
    }
    dispatch(reset());
  }, [user]);
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
          height: '70vh',
          width: '30vw',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box sx={{ height: '85%' }}>
          <Stack direction={'row'} justifyContent={'center'} sx={{ py: 3 }}>
            <RocketLaunchOutlinedIcon sx={{ fontSize: '3rem' }} />
          </Stack>
          <Divider
            textAlign="center"
            sx={{
              '&::before, &::after': {
                borderColor: '#C10FE9',
              },
            }}
          >
            Dashboard
          </Divider>
          {/* type={showPassword ? "text" : "password"} */}
          <form>
            <FormControl fullWidth sx={{ mt: 3 }} variant="outlined">
              <TextField
                onChange={(e) => setUsernameValue(e.target.value)}
                value={usernameValue}
                id="username"
                type={'text'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                label="Username"
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }} variant="outlined">
              <TextField
                onChange={(e) => setEmailValue(e.target.value)}
                value={emailValue}
                id="email"
                type={'text'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <MailOutlineIcon />
                    </InputAdornment>
                  ),
                }}
                label="E-mail"
              />
            </FormControl>

            <FormControl fullWidth sx={{ mt: 3 }} variant="outlined">
              <TextField
                onChange={(e) => setPasswordValue(e.target.value)}
                value={passwordValue}
                id="password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                label="Senha"
              />
            </FormControl>

            <FormControl fullWidth sx={{ mt: 3 }} variant="outlined">
              <TextField
                onChange={(e) => setConfirmPasswordValue(e.target.value)}
                value={confirmPasswordValue}
                id="confirmPassword"
                error={passwordValue != confirmPasswordValue}
                helperText={
                  passwordValue != confirmPasswordValue &&
                  'Por favor, repita a mesma senha.'
                }
                type={showConfirmPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                label="Confirmar Senha"
              />
            </FormControl>
            <Button
              type="button"
              disabled={
                !passwordValue ||
                !emailValue ||
                !usernameValue ||
                !confirmPasswordValue
              }
              onClick={() => {
                dispatch(
                  cadastrar({
                    password: passwordValue,
                    email: emailValue,
                    username: usernameValue,
                  })
                );
                /*  if (!passwordValue) setPasswordError(true);
                if (!emailValue) setEmailError(true);
                if (!usernameValue) setUsernameError(true);
                if (!confirmPasswordValue) setConfirmPasswordError(true);

                if (
                  passwordValue &&
                  emailValue &&
                  usernameValue &&
                  confirmPasswordValue
                ) {
                 
                } */
              }}
              variant="contained"
              sx={{
                backgroundColor: '#C10FE9',
                mt: 3,
                width: '100%',
                fontWeight: 'bold',
                letterSpacing: '0.2rem',
              }}
            >
              Cadastrar-se
            </Button>
          </form>
          <Stack
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Button
              onClick={() => navigate('/login')}
              variant="text"
              sx={{
                mt: '2rem',
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
              Já tem um conta? Faça seu login aqui!
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
