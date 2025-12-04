/**
 * DesktopView.jsx
 * 
 * Purpose: Focuses on desktop version features of user interface of grid, word, stars, final score display 
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
 * @param {*} 
 * gameEnd: boolean tells if game has ended
 * successCount: no of correct answers
 * onNewGame: resets paramaters for new game
 * onPlayAudio: Word audio
 * displayText: question word
 * roundDisplay: present round no
 * boxes: images inside grid
 * onHandleSelection: handles the result of selecting a image at each round
 * showFeedback: boolean to disable clicks during feedback
 * @returns  Desktop display of user Interface
 */
function DesktopView({
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
    <section className="Desktop-View hidden lg:flex">
      <div className="w-[80vw] h-[40vh]">
        <GameOverModal 
          isGameEnd={gameEnd}
          successCount={successCount}
          onNewGame={onNewGame}
        />
        
        <div className="absolute flex-row justify-start left-[7.5vw] right-[45vw] top-[40vh] pointer-events-none">
          <div className="flex flex-wrap gap-1">
            <StarsDisplay 
              successCount={successCount} 
              shouldSkipLastStar={shouldSkipLastStar}
            />
          </div>
        </div>
        
        <div className="absolute bottom-[8.6vh] right-[7.1vw] w-[36vw]">
          <div className="flex items-center justify-between font-comic mb-[3vh]">
            <button onClick={onPlayAudio} id="audioBnDesktop">
              <img
                src={PlayAudioImg}
                alt="Play Audio"
                className="hover:scale-110 w-[7vw] transition-all"
              />
            </button>
            <h1 className="text-5xl ml-[2vw]"><strong>{displayText}</strong></h1>
            <h1 className="text-5xl mr-[3vw] ml-auto">{roundDisplay}</h1>
          </div>
          {/* Original 3x3 grid layout */}
          <div className="grid grid-cols-3 gap-0">
            {boxes.map((box, index) => (
              <div key={index} className="grid-box w-[12vw]">
                <img
                  src={box.image}
                  alt={box.text}
                  {...(!(box.image === inactivePanel) && !showFeedback && {
                    onClick: () => onHandleSelection(box.image),
                  })}
                  className={`rounded-lg ${
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
      </div>
    </section>
  );
}

export default DesktopView;