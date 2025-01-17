import React, { useState } from 'react';
import { Box, Button, Typography, Link, Container, TextField, InputAdornment, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthService from '../../services/authService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginBottom: '100px',
  marginTop: '100px',
  backgroundColor: '#1E1F29',
  width: '90%',
  maxWidth: 610,
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  padding: '24px',
  border: '1px solid silver',
  [theme.breakpoints.up('md')]: {
    width: 610,
    height: 'auto',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: '#15161D',
  borderRadius: '8px',
  '& .MuiInputBase-root': {
    color: 'white',
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.7)',
    },
  },
  [theme.breakpoints.up('md')]: {
    width: '100%',
    height: 'auto',
  },
}));

const StyledButton = styled(Button)(({ theme, loading }) => ({
  backgroundColor: loading ? '#D10024' : 'darkred',
  color: 'white',
  marginBottom: '16px',
  width: '90%',
  '&:hover': {
    backgroundColor: loading ? 'darkred' : '#D10024',
  },
}));

const SideBySideBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '90%',
  marginBottom: '40px',
}));

// Hata mesajı stili
const ErrorText = styled(Typography)(() => ({
  color: '#D10024',
  fontSize: '0.8rem',
  marginTop: '4px',
  textAlign: 'left',
}));

// Yup doğrulama şeması
const validationSchema = Yup.object({
  firstName: Yup.string().required('Ad zorunludur*'),
  lastName: Yup.string().required('Soyad zorunludur*'),
  email: Yup.string().email('Geçersiz email formatı*').required('Email zorunludur*'),
  password: Yup.string().min(6, 'Şifre en az 6 karakter olmalıdır*').required('Şifre zorunludur*'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Şifreler eşleşmiyor*')
    .required('Şifre onayı zorunludur*'),
});

// RegisterPage componenti
const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false); // Şifre görünürlüğü için state

  const handleRegister = async (values, { setSubmitting }) => {
    try {
      await AuthService.register(values.firstName, values.lastName, values.email, values.password, values.confirmPassword);
      toast.success('Kayıt başarılı!');
      setTimeout(() => {
        window.location.href = '/login'; // 2 saniye sonra yönlendirme
      }, 2000);
    } catch (error) {
      toast.error('Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Kaydol | ELECTROFILM</title>
      </Helmet>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#15161D' }}>

        <StyledContainer>
          <Typography variant="h4"
            sx={{ mt: 7, mb: 7, color: '#D10024', fontSize: { xs: '1.5rem', sm: '1.8rem' } }}
          >
            Hesabını Oluştur
          </Typography>

          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {({ isSubmitting }) => (
              <Form style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ width: '90%', marginBottom: '40px' }}>
                  <Field
                    name="email"
                    as={StyledTextField}
                    label="Email"
                    fullWidth
                    variant="outlined"

                  />
                  <ErrorMessage name="email" component={ErrorText} />
                </Box>

                <SideBySideBox>
                  <Box sx={{ width: '48%' }}>
                    <Field
                      name="firstName"
                      as={StyledTextField}
                      label="Ad"
                      fullWidth
                      variant="outlined"

                    />
                    <ErrorMessage name="firstName" component={ErrorText} />
                  </Box>

                  <Box sx={{ width: '48%' }}>
                    <Field
                      name="lastName"
                      as={StyledTextField}
                      label="Soyad"
                      fullWidth
                      variant="outlined"

                    />
                    <ErrorMessage name="lastName" component={ErrorText} />
                  </Box>
                </SideBySideBox>

                <SideBySideBox>
                  <Box sx={{ width: '48%' }}>
                    <Field
                      name="password"
                      as={StyledTextField}
                      label="Şifre"
                      type={showPassword ? 'text' : 'password'}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              sx={{ color: 'white' }}
                            >
                              {showPassword ? (
                                <Visibility fontSize="small" /> 
                              ) : (
                                <VisibilityOff fontSize="small" /> 
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                    />
                    <ErrorMessage name="password" component={ErrorText} />
                  </Box>

                  <Box sx={{ width: '48%' }}>
                    <Field
                      name="confirmPassword"
                      as={StyledTextField}
                      label="Şifreyi Onayla"
                      type={showPassword ? 'text' : 'password'}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              sx={{ color: 'white' }}
                            >
                              {showPassword ? (
                                <Visibility fontSize="small" /> 
                              ) : (
                                <VisibilityOff fontSize="small" /> 
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"

                    />
                    <ErrorMessage name="confirmPassword" component={ErrorText} />
                  </Box>
                </SideBySideBox>
                <StyledButton
                  type="submit"
                  variant="contained"
                  startIcon={<PersonAddIcon />}
                  disabled={isSubmitting}
                >
                  Kayıt Ol
                </StyledButton>
              </Form>
            )}
          </Formik>

          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 3, mb: 3 }}>
            Hesabınız var mı? <Link href="/login" sx={{ color: '#D10024' }}>Giriş Yap</Link>
          </Typography>
        </StyledContainer>
      </Box>
    </>
  );
};

export default RegisterPage;
