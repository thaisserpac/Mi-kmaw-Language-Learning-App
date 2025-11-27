/**
 * Layout.js
 * Purpose: Integrates components into a single structure.
 * Update: Unified top-right buttons (Green/Amber style) for both games.
 */

import { useState } from "react";
import BackgroundImage from './app-images/Background.png';
import GridImage from './app-images/Grid.png';
import DictionaryButton from './components/DictionaryButton';
import DropDownMenu from './components/Dropdown';
import GameSelector from './components/GameSelector';
import WordDistribution from './components/GridLayout/WordDistribution';
import { LANGUAGE_CONTENT } from './components/LanguageContent';
import StartGameScreen from "./Goat island components/startGameScreen";

function Layout() {
  const [selectedMonth, setSelectedMonth] = useState(3);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [transitionStage, setTransitionStage] = useState('gameSelect');
  const content = selectedLanguage ? LANGUAGE_CONTENT[selectedLanguage] : LANGUAGE_CONTENT.english;

  // Select Month
  const handleMonthSelect = (value) => {
    setSelectedMonth(value);
  };

  // Select Game at Start Screen
  const handleGameSelect = (game, language) => {
    setTransitionStage('fadingOut');
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
      <div className={`transition-opacity duration-150 ${transitionStage === 'fadingOut' ? 'opacity-0' : 'opacity-100'}`}>
        <GameSelector onGameSelect={handleGameSelect} />
      </div>
    );
  }

  // --- REUSABLE BUTTON CLASSES ---
  // Green Button (Switch Game)
  const switchGameBtnClass = "bg-gradient-to-b from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold uppercase text-xs sm:text-sm py-2 px-4 rounded-xl shadow-[0_4px_0_rgb(21,128,61)] border-2 border-green-800 active:shadow-none active:translate-y-[4px] transition-all";

  // Amber Button (Language)
  const langBtnClass = "bg-gradient-to-b from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white font-bold uppercase text-xs sm:text-sm py-2 px-4 rounded-xl shadow-[0_4px_0_rgb(180,83,9)] border-2 border-amber-800 active:shadow-none active:translate-y-[4px] transition-all";

  // Show main game 
  return (
    <div className="animate-fadeIn">

      {/* ================= GOAT ISLAND GAME ================= */}
      {selectedGame === 'goatIsland' && (
        <div>
          <div className="fixed top-4 right-4 z-50 flex gap-2">
            <button onClick={handleSwitchGame} className={switchGameBtnClass}>
              {content.switchGame}
            </button>
            <button
              onClick={() => setSelectedLanguage(selectedLanguage === 'english' ? 'french' : 'english')}
              className={langBtnClass}
            >
              {selectedLanguage === 'english' ? 'French' : 'English'}
            </button>
          </div>
          <StartGameScreen />
        </div>
      )}

      {/* ================= TRANSLATION GAME ================= */}
      {selectedGame === 'translation' && (
        <div>
          <div className="fixed top-4 right-4 z-50 flex gap-2">
            {/* Updated to match the nice Green/Amber style */}
            <button onClick={handleSwitchGame} className={switchGameBtnClass}>
              {content.switchGame}
            </button>
            <button
              onClick={() => setSelectedLanguage(selectedLanguage === 'english' ? 'french' : 'english')}
              className={langBtnClass}
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
              {/* ▼▼▼ CHANGE THIS LINE BELOW ▼▼▼ */}
              <div className="flex flex-col h-[20vh] mt-24">
                <h1 className="text-center text-red-700 font-bold text-4xl font-sans mt-[1vh] capitalize">
                  {content.appTitle}
                </h1>
                <p className="text-center text-red-400 font-bold text-3xl font-sans mt-[1vh]" id="angie-header-mobile">
                  Mikwite'tmk+t Angie
                </p>
              </div>

              <div className="z-20 flex items-center justify-between mx-[1vw] h-[10vh]">
                <DropDownMenu selectedMonth={selectedMonth} onMonthChange={handleMonthSelect} />
                <DictionaryButton />
              </div>

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
              <div className="flex flex-col left-[0vw] w-[60vw] h-[30vh]">
                <h1 className="text-center text-red-700 font-bold text-7xl font-sans mt-[1vh] capitalize">
                  {content.appTitle}
                </h1>
                <p className="text-center text-red-400 font-bold text-6xl font-sans mt-[1vh]" id="angie-header-desktop">
                  Mikwite'tmk+t Angie
                </p>
              </div>

              <div className="z-20 flex flex-col items-center justify-between text-xl w-[60vw] mt-[5vh] h-[25vh]">
                <DictionaryButton />
                <DropDownMenu selectedMonth={selectedMonth} onMonthChange={handleMonthSelect} />
              </div>

              <div className="flex flex-col h-[100vh] w-[100vw]">
                <img
                  src={GridImage}
                  alt="Grid Overlay"
                  className="absolute bottom-[5vh] right-[5vw] z-10 object-cover w-[40vw] pointer-events-none"
                />
                <div>
                  <WordDistribution month={selectedMonth} />
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default Layout;