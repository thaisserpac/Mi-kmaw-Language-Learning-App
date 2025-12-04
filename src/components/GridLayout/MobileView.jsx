/**
 * MobileView.jsx
 * 
 * Purpose: Focuses on mobile version features of user interface of grid, word, stars, final score display 
 * and other elements arrangements.
 * 
 * Author(s): Michael Allain, Preksha Joon
 * 
 * COTS Used:
 * - React: JavaScript library for building user interfaces. (https://reactjs.org/)
 * - Tailwind CSS: Utility-first CSS framework for styling. (https://tailwindcss.com/)
 * - Local assets for images (Michael's efforts and Microsoft Designer) and audio files.
 */
import PlayAudioImg from "../images/PlayAudio.png";
import inactivePanel from "../images/colour.jpg";
import GameOverModal from "./GameOverModal";
import StarsDisplay from "./StarsDisplay";

/**
 * MobileView.jsx
 * 
 * Purpose: Focuses on mobile version features of user interface of grid, word, stars, final score display 
 * and other elements arrangements.
 * 
 * Author(s): Michael Allain, Preksha Joon
 * 
 * 
 * COTS Used:
 * - React: JavaScript library for building user interfaces. (https://reactjs.org/)
 * - Tailwind CSS: Utility-first CSS framework for styling. (https://tailwindcss.com/)
 * - Local assets for images (Michael's efforts and Microsoft Designer) and audio files.
 */
function MobileView({
  gameEnd,
  successCount,
  onNewGame,
  onPlayAudio,
  displayText,
  roundDisplay,
  boxes,
  onHandleSelection,
  showFeedback = false,
  shouldSkipLastStar = false
}) {
  return (
    <section className="Mobile-View flex lg:hidden">
      <div className="absolute items-center bottom-[2.7vh] w-[90vw]">
        <GameOverModal 
          isGameEnd={gameEnd}
          successCount={successCount}
          onNewGame={onNewGame}
        />
        
        <div className="mt-5">
          <div className="flex flex-wrap gap-1">
            <StarsDisplay 
              successCount={successCount} 
              shouldSkipLastStar={shouldSkipLastStar}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between font-comic mb-[3vh]">
          <button onClick={onPlayAudio} id="audioBnMobile">
            <img
              src={PlayAudioImg}
              alt="Play Audio"
              className="hover:scale-110 w-[10vw] transition-all"
            />
          </button>
          <h1 className="text-2xl ml-[5vw]"><strong>{displayText}</strong></h1>
          <h1 className="text-2xl ml-auto">{roundDisplay}</h1>
        </div>
        {/* Original 3x3 grid layout */}
        <div className="grid grid-cols-3 gap-0">
          {boxes.map((box, index) => (
            <div key={index} className="grid-box w-[30vw]">
              <img
                src={box.image}
                alt={box.text}
                {...(!(box.image === inactivePanel) && !showFeedback && {
                  onClick: () => onHandleSelection(box.image),
                })}
                className={`rounded-xl ${
                  box.image === inactivePanel
                    ? "opacity-80"
                    : showFeedback 
                      ? "opacity-50 cursor-not-allowed" 
                      : "hover:cursor-pointer hover:scale-105 transition-transform"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MobileView;