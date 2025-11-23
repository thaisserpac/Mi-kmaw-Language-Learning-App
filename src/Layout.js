/**
 * Layout.js
 * 
 * Purpose: This file integrates the various components of the webpage
 *          into a single html structure.
 * 
 * Author: Michael Allain (A00471697) and Mark Louis Tabudlong (A00468931)
 */

import { useState } from "react";
import BackgroundImage from './app-images/Background.png';
import GridImage from './app-images/Grid.png';
import DictionaryButton from './components/DictionaryButton'; // Importing the DictionaryButton component
import DropDownMenu from './components/Dropdown'; // Importing the DropdownMenu component
import GameSelector from './components/GameSelector'; // Importing the Game selector component
import WordDistribution from './components/GridLayout/WordDistribution'; // Importing the Grid component
import { LANGUAGE_CONTENT } from './components/LanguageContent'; // Importing the English and French components

function Layout() {
  const [selectedMonth, setSelectedMonth] = useState(3); // Default to 3
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [transitionStage, setTransitionStage] = useState('gameSelect'); 
  const content = selectedLanguage ? LANGUAGE_CONTENT[selectedLanguage] : LANGUAGE_CONTENT.english;

  // Select Month
  const handleMonthSelect = (value) => {
    setSelectedMonth(value); // Update the selected month
  };

  // Select Game at Start Screen
  const handleGameSelect = (game, language) => {
    // Start fade out
    setTransitionStage('fadingOut');
    
    // After fade out completes, switch to game
    setTimeout(() => {
      setSelectedGame(game);
      setSelectedLanguage(language);
      setTransitionStage('game');
    }, 150);
  };

  // Switch to another game
  const handleSwitchGame = () => {
    setSelectedGame(null);
    setSelectedLanguage(null);
    setTransitionStage('gameSelect');
  };

  // Show game selector
  if (transitionStage === 'gameSelect' || transitionStage === 'fadingOut') {
    return (
      <div className={`transition-opacity duration-150 ${
        transitionStage === 'fadingOut' ? 'opacity-0' : 'opacity-100'
      }`}>
        <GameSelector onGameSelect={handleGameSelect} />
      </div>
    );
  }

  // Show main game 
  return (
    <div className="animate-fadeIn">
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        {/*Game Switcher button in top right corner */}
        <button
          onClick={handleSwitchGame}
          className="bg-white hover:bg-gray-100 text-gray-800 font-comic py-2 px-4 rounded-lg text-sm transition-colors shadow-lg border border-gray-300"
        >
          {content.switchGame}
        </button>
        {/*Language Switcher button in top right corner */}
        <button
          onClick={() => setSelectedLanguage(selectedLanguage === 'english' ? 'french' : 'english')}
          className="bg-white hover:bg-gray-100 text-gray-800 font-comic py-2 px-4 rounded-lg text-sm transition-colors shadow-lg border border-gray-300"
        >
          {selectedLanguage === 'english' ? 'French' : 'English'}
        </button>
      </div>

      {/* Container for mobile view layout */}
      <section className="Mobile-App flex lg:hidden">
        <div 
          className="App-background absolute bg-cover bg-center h-screen bg-no-repeat flex flex-col overflow-hidden"
          style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
          
          {/* Container for the app headers */}
          <div className="flex flex-col vh-[20vh]">
            <h1 className="text-center text-red-700 font-bold text-4xl font-comic mt-[1vh]">
              {content.appTitle}
            </h1>
            <p className="text-center text-red-400 font-bold text-3xl font-comic mt-[1vh]" id="angie-header-mobile">
              mikwite'tmk+t Angie
            </p>
          </div>

          {/* Container for the dropdown menu and dictionary components */}
          <div className="z-20 flex items-center justify-between mx-[1vw] h-[10vh]">
            <DropDownMenu selectedMonth={selectedMonth} onMonthChange={handleMonthSelect} />
            <DictionaryButton />
          </div>

          {/* Container for the grid component */}
          <div className="flex flex-col items-center justify-center h-[70vh] w-[100vw]">
            <img 
              src={GridImage} 
              alt="Grid Overlay" 
              className="absolute bottom-[0vh] z-10 object-cover w-[100vw] pointer-events-none"
            />
            <div className="absolute bottom-[0.5vh] w-[90vw]">
              <WordDistribution month={selectedMonth} language={selectedLanguage} />          
            </div>
          </div>
        </div>
      </section>

      {/* Container for desktop view layout */}
      <section className="Desktop-App hidden lg:flex">
        <div 
          className="App-background absolute bg-cover bg-center h-screen bg-no-repeat flex flex-col overflow-hidden"
          style={{ backgroundImage: `url(${BackgroundImage})` }}
        >

          {/* Container for the app headers */}
          <div className="flex flex-col left-[0vw] w-[60vw] h-[30vh]">
            <h1 className="text-center text-red-700 font-bold text-7xl font-comic mt-[1vh]">
              {content.appTitle}
            </h1>
            <p className="text-center text-red-400 font-bold text-6xl font-comic mt-[1vh]" id="angie-header-desktop">
              mikwite'tmk+t Angie
            </p>
          </div>

          {/* Container for the dropdown menu and dictionary components */}
          <div className="z-20 flex flex-col items-center justify-between text-xl w-[60vw] mt-[5vh] h-[25vh]">
            <DictionaryButton />
            <DropDownMenu selectedMonth={selectedMonth} onMonthChange={handleMonthSelect} />
          </div>

          {/* Container for the grid component */}
          <div className="flex flex-col h-[100vh] w-[100vw]">
            <img 
              src={GridImage} 
              alt="Grid Overlay" 
              className="absolute bottom-[5vh] right-[5vw] z-10 object-cover w-[40vw] pointer-events-none"
            />
            <div>
              <WordDistribution month={selectedMonth} language={selectedLanguage} />          
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Layout;