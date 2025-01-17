import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import PopularFilmsList from './PopularFilmsList';
import BestFilmsList from './BestFilmsList';
import MainFilmSlider from './MainFilmSlider';
import SelectedFilmDetails from './SelectedFilmDetails';
import BackgroundImage from './BackgroundImage';
import { useNavigate } from 'react-router-dom';
import { useFilms } from '../../contextApi/HomePageFilmContext';
import { Helmet } from 'react-helmet-async';
import LoadingSpinner from '../../components/LoadingSpinner';

const HomePage = () => {
  const { films, selectedFilm, setSelectedFilm, loading, error } = useFilms();
  const navigate = useNavigate();

  const handleWatchNow = () => {
    if (selectedFilm) {
      navigate(`/film/${selectedFilm.id}`);
    }
  };

  if (loading) { return <LoadingSpinner />;}  
  if (error) return <p>Hata: {error}</p>;
  if (!films || films.length === 0 || !selectedFilm) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p style={{ color: 'white', textAlign: 'center' }}>Veri bulunamadı...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>ELECTROFILM - Film İzle</title>
      </Helmet>
      <Box sx={{ mb: 4, position: 'relative', height: { xs: 'auto', md: '865px' }, overflow: 'hidden' }}>
        {selectedFilm && <BackgroundImage selectedFilm={selectedFilm} />}
        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', height: '100%', ml: { xs: 0, md: 20 }, p: { xs: 2, md: 0 } }}>
          <MainFilmSlider films={films} setSelectedFilm={setSelectedFilm} />
          {selectedFilm && <SelectedFilmDetails selectedFilm={selectedFilm} handleWatchNow={handleWatchNow} />}
        </Container>
      </Box>

      <PopularFilmsList />
      <BestFilmsList />
    </>
  );
};

export default HomePage;
