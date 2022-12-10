import Head from 'next/head'
//import Image from 'next/image'
//import styles from '../styles/Home.module.css'
import { Results } from '../components/results';
import { Location } from '../components/location';
import { Settings } from '../components/settings';
import { Filters } from '../components/filters';
import { useState, useEffect, createContext } from 'react';

export const CoordsContext = createContext({});
const ThemeContext = createContext('light');

export default function Home() {
  const [coords, setCoords] = useState([]);
  const [theme, setTheme] = useState('light')

  function userPreferences() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    };
  }
  useEffect(() => {
    userPreferences();
  }, []);

  useEffect(() => {
    const bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.className = `theme-${theme}`;
  }, [theme]);

  function changeTheme() {
    setTheme(theme == 'dark' ? 'light' : 'dark');
  }

  return (
    <div className="outerWrapper">
      <div className="wrapper">
        <Head>
          <title>Effie&apos;s Weather App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="author" content="Effie Pitaouli" />
          <meta name="keywords" content="weather, google autocomplete, geolocation api" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ThemeContext.Provider value={theme}>
          <Settings theme={changeTheme} dark={theme}></Settings>
        </ThemeContext.Provider>
        <CoordsContext.Provider value={{ coords, setCoords }}>
          <Location></Location>
          <Results></Results>{/*coordinates={coords} */}
        </CoordsContext.Provider>
      </div>
      <Filters classes="u-hidden" position="left"></Filters>
    </div >

  )
}
