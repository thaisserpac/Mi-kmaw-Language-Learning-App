/**
 * GameSelector.jsx
 * - DESKTOP: Uses 'title.jpeg' (Landscape).
 * - MOBILE: Uses 'title_mobile.png' (Portrait).
 * - GAME MENU: Resized cards to w-48 so they fit on mobile screens.
 */
import { useState } from "react";
import GoatIslandLogo from '../Goat island components/Islandgame-images/goatislandgame.jpeg';
import MenuTitleImage from './images/menutitle.jpeg';
import PictionaryImage from './images/pictionary.jpeg';
import TitleImage from './images/title.jpeg';
// 1. UPDATED IMPORT: Changed extension to .png
import TitleMobileImage from './images/title_mobile.png'; 

function GameSelector({ onGameSelect }) {
  const [selectedGame, setSelectedGame] = useState(null);
  const [showGameSelection, setShowGameSelection] = useState(false);

  const handlePlayClick = () => {
    setShowGameSelection(true);
  };

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  const handleLanguageSelect = (language, game) => {
    onGameSelect(game, language);
  };

  // --- SCREEN 1: START SCREEN ---
  if (!showGameSelection) {
    return (
      <>
        {/* =========================================================
            DESKTOP VIEW (Screen width >= 1024px)
            - Uses the original 'title.jpeg'
           ========================================================= */}
        <div 
          className="hidden lg:flex fixed inset-0 z-50 bg-cover bg-center min-h-screen flex-col items-center justify-center"
          style={{ backgroundImage: `url(${TitleImage})` }}
        >
          <button data-cy={"Play"}
            onClick={handlePlayClick}
            className="bg-amber-800 hover:bg-amber-700 text-white font-bold text-4xl py-6 px-16 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl border-8 border-amber-950 font-sans mt-[60vh]"
          >
            Play
          </button>
        </div>

        {/* =========================================================
            MOBILE VIEW (Screen width < 1024px)
            - Uses 'title_mobile.png'
            - Uses 'bg-cover' so it fills the whole phone screen
           ========================================================= */}
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-cover bg-center min-h-screen flex flex-col items-center justify-center"
          style={{ backgroundImage: `url(${TitleMobileImage})` }} 
        >
          {/* Button for Mobile:
             - Slightly smaller text (text-3xl)
             - Pushed to the bottom section (mt-[50vh])
          */}
          <button
            onClick={handlePlayClick}
            className="mt-[50vh] bg-amber-800 hover:bg-amber-700 text-white font-bold text-3xl py-4 px-16 rounded-full transition-all duration-300 hover:scale-110 shadow-2xl border-4 border-amber-950 font-sans"
          >
            Play
          </button>
        </div>
      </>
    );
  }

  // --- SCREEN 2: GAME SELECTION (Resized for Mobile) ---
  return (
    <div 
      className="fixed inset-0 z-50 bg-cover bg-center min-h-screen flex flex-col overflow-y-auto"
      style={{ backgroundImage: `url(${MenuTitleImage})` }}
    >
      <div className="flex-1 flex items-center justify-center p-4">
        {/* Compact Layout: gap-4 for mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-4xl w-full justify-items-center">
          
          {/* OPTION 1: Mi'kmaq Pictionary */}
          <div className="flex flex-col items-center w-full">
            <div 
              // Card Size: w-48 (mobile) vs w-72 (desktop)
              className="rounded-3xl shadow-2xl border-4 border-amber-800 hover:border-amber-700 transition-all duration-300 transform hover:scale-105 cursor-pointer w-48 h-48 sm:w-72 sm:h-72 relative overflow-hidden bg-white"
              onClick={() => handleGameSelect('translation')}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${PictionaryImage})` }}
              />
            </div>

            {/* Language Selection Popup */}
            {selectedGame === 'translation' && (
              <div className="mt-2 bg-amber-50/95 backdrop-blur rounded-2xl p-3 shadow-xl border-4 border-amber-800 w-48 sm:w-72 animate-fadeIn">
                <h4 className="text-base sm:text-lg font-bold text-amber-900 mb-2 text-center font-sans">
                  Choose Language
                </h4>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => handleLanguageSelect('english', 'translation')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded-xl shadow border-2 border-green-800 text-xs sm:text-sm transition-transform hover:scale-105"
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageSelect('french', 'translation')}
                    className="flex-1 bg-amber-700 hover:bg-amber-800 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded-xl shadow border-2 border-amber-900 text-xs sm:text-sm transition-transform hover:scale-105"
                  >
                    French
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* OPTION 2: Goat Island */}
          <div className="flex flex-col items-center w-full">
            <div data-cy="select-goat-island"
              // Card Size: w-48 (mobile) vs w-72 (desktop)
              className="rounded-3xl shadow-2xl border-4 border-amber-800 hover:border-amber-700 transition-all duration-300 transform hover:scale-105 cursor-pointer w-48 h-48 sm:w-72 sm:h-72 relative overflow-hidden bg-white"
              onClick={() => handleGameSelect('goatIsland')}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${GoatIslandLogo})` }}
              />
            </div>

            {/* Language Selection Popup */}
            {selectedGame === 'goatIsland' && (
              <div className="mt-2 bg-amber-50/95 backdrop-blur rounded-2xl p-3 shadow-xl border-4 border-amber-800 w-48 sm:w-72 animate-fadeIn">
                <h4 className="text-base sm:text-lg font-bold text-amber-900 mb-2 text-center font-sans">
                  Choose Language
                </h4>
                <div className="flex justify-center gap-2">
                  <button data-cy="goat-island"
                    onClick={() => handleLanguageSelect('english', 'goatIsland')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded-xl shadow border-2 border-green-800 text-xs sm:text-sm transition-transform hover:scale-105"
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageSelect('french', 'goatIsland')}
                    className="flex-1 bg-amber-700 hover:bg-amber-800 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded-xl shadow border-2 border-amber-900 text-xs sm:text-sm transition-transform hover:scale-105"
                  >
                    French
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default GameSelector;