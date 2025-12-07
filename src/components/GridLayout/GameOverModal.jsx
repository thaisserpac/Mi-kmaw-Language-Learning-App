/**
 * GameOverModal.jsx
 * 
 * Purpose: Display of total stars at end of game and Asks to start a new game
 * 
 * Author(s): Michael Allain, Preksha Joon
 * 
 * 
 * COTS Used:
 * - React: JavaScript library for building user interfaces. (https://reactjs.org/)
 * - Tailwind CSS: Utility-first CSS framework for styling. (https://tailwindcss.com/)
 * - Local assets for images (Michael's efforts and Microsoft Designer) and audio files.
 */

import StarsDisplay from "./StarsDisplay";
import DictionaryButton from "../DictionaryButton";
import { createPortal } from "react-dom";
/**
 * 
 * @param 
 * isGameEnd: tells if game has ended
 * successCount: no of correct answers
 * onNewGame: resets parameters for new game
 * shouldSkipLastStar: whether the last star was skipped during gameplay
 * @returns A pop up congratulating the user and asking to try again.
 */
function GameOverModal({ isGameEnd, successCount, onNewGame}) {
  if (!isGameEnd) return null;

  const modalContent = (
    <div className="fixed animate-fadeIn inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl min-h-[40vh] flex flex-col overflow-hidden">

        <div className="p-4 text-center">
          <h2 className="text-4xl text-center font-bold font-comic mb-4">
            kelulktelatekn
          </h2>
        </div>

        <div className="flex-1 flex justify-center items-center p-4 overflow-y-auto max-h-[50vh]">
          <div className="w-full">
            <StarsDisplay
              successCount={successCount}
              isGameEnd={true}
            />
          </div>
        </div>
        <div className="p-4 flex justify-center">
          <DictionaryButton language="english" />
        </div>

        <div className="p-4 flex justify-center border-t border-gray-200">
          <button
            onClick={onNewGame}
            className="bg-green-500 hover:bg-green-600 text-white font-comic py-3 px-6 rounded-lg text-xl transition-colors"
          >
            si'owa'si?
          </button>


        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default GameOverModal;
