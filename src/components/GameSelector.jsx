/**
 * GameSelector.jsx
 * 
 * Purpose: The starting screen where you select game
 * 
 * Author(s): Mark Louis Tabudlong (A00468931)
 * 
 * 
 * COTS Used:
 * - React: JavaScript library for building user interfaces. (https://reactjs.org/)
 * - Tailwind CSS: Utility-first CSS framework for styling. (https://tailwindcss.com/)
 * - Local assets for images 
 */
import { useState } from "react";
import GoatIslandLogo from '../Goat island components/Islandgame-images/goatislandgame.jpeg';
import MenuTitleImage from './images/menutitle.jpeg';
import PictionaryImage from './images/pictionary.jpeg';
import TitleImage from './images/title.jpeg';

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

  // Initial screen with Play button
  if (!showGameSelection) {
    return (
      <div 
        className="fixed inset-0 z-50 bg-cover bg-center min-h-screen flex flex-col items-center justify-center"
        style={{ backgroundImage: `url(${TitleImage})` }}
      >
        {/* Play Button */}
        <button
          onClick={handlePlayClick}
          className="bg-amber-800 hover:bg-amber-700 text-white font-bold text-4xl py-6 px-16 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl border-8 border-amber-950 font-sans mt-[60vh]"
        >
          Play
        </button>
      </div>
    );
  }

  // Game selection screen
  return (
    <div 
      className="fixed inset-0 z-50 bg-cover bg-center min-h-screen flex flex-col"
      style={{ backgroundImage: `url(${MenuTitleImage})` }}
    >
      {/* Selection of Two Games */}
      <div className="flex-1 flex items-center justify-center px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full">
          {/* Mi'kmaq Pictionary Game */}
          <div className="flex flex-col items-center">
            <div 
              className="rounded-3xl shadow-2xl border-4 border-amber-800 hover:border-amber-700 transition-all duration-300 transform hover:scale-105 cursor-pointer w-full max-w-xs overflow-hidden relative"
              style={{ height: '280px' }}
              onClick={() => handleGameSelect('translation')}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${PictionaryImage})` }}
              >
              </div>
            </div>

            {/* Language Selection for Mi'kmaq Pictionary */}
            {selectedGame === 'translation' && (
              <div className="mt-3 bg-gradient-to-br from-green-100 to-amber-100 rounded-3xl p-5 shadow-2xl border-4 border-amber-800 w-full max-w-xs transform transition-all duration-300">
                <h4 className="text-xl font-bold text-amber-700 mb-3 text-center drop-shadow-sm font-sans">
                  Choose Language
                </h4>
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={() => handleLanguageSelect('english', 'translation')}
                    className="bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold text-base py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg border-2 border-amber-200 font-sans"
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageSelect('french', 'translation')}
                    className="bg-gradient-to-br from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-bold text-base py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg border-2 border-amber-200 font-sans"
                  >
                    French
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Goat Island Game */}
          <div className="flex flex-col items-center">
            <div 
              className="rounded-3xl shadow-2xl border-4 border-amber-800 hover:border-amber-700 transition-all duration-300 transform hover:scale-105 cursor-pointer w-full max-w-xs overflow-hidden relative"
              style={{ height: '280px' }}
              onClick={() => handleGameSelect('goatIsland')}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${GoatIslandLogo})` }}
              >
              </div>
            </div>

            {/* Language Selection for Goat Island Game */}
            {selectedGame === 'goatIsland' && (
              <div className="mt-3 bg-gradient-to-br from-green-100 to-amber-100 rounded-3xl p-5 shadow-2xl border-4 border-amber-800 w-full max-w-xs transform transition-all duration-300">
                <h4 className="text-xl font-bold text-amber-700 mb-3 text-center drop-shadow-sm font-sans">
                  Choose Language
                </h4>
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={() => handleLanguageSelect('english', 'goatIsland')}
                    className="bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold text-base py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg border-2 border-amber-200 font-sans"
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageSelect('french', 'goatIsland')}
                    className="bg-gradient-to-br from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-bold text-base py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg border-2 border-amber-200 font-sans"
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