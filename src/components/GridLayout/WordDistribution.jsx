/**
 * WordDistribution.jsx
 * 
 * Purpose: Implementation of grid and question word
 *          The game dynamically updates based on the selected month, providing audio feedback
 *          and visual rewards. Users earn stars for correct matches and can reset the game.
 * 
 * Author(s): Preksha Joon, Aaron Gonsalves, Mark Louis Tabudlong
 * Assisted by: ChatGPT (Documentation assistance + Fixing Roadblocks)
 * 
 * COTS Used:
 * - React: JavaScript library for building user interfaces. (https://reactjs.org/)
 * - Tailwind CSS: Utility-first CSS framework for styling. (https://tailwindcss.com/)
 * - Local assets for images (Michael's efforts and Microsoft Designer) and audio files.
 */

import { useCallback, useEffect, useState } from "react";
import congratulationsAudio from "../audio/congratulatory.mp3";
import tryAgainAudio from "../audio/tryagain.mp3";
import FeedbackScreen from "../FeedbackScreen";
import inactivePanel from "../images/colour.jpg";
import { WORD_INFO } from "../WordBank";
import DesktopView from "./DesktopView";
import MobileView from "./MobileView";

/**
 * WordDistribution Component
 * 
 * Purpose: Renders the game interface where users match words to images based on the selected month.
 * 
 * Parameters:
 * - month: (number) The selected number corresponding to the month based on the words of the month, 
 * which determines the set of words and game logic.
 */
function WordDistribution({ month, language = "english" }) {
  const [boxes, setBoxes] = useState([]);
  const [allWords, setAllWords] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [displayAudio, setDisplayAudio] = useState("");
  const [displayImage, setDisplayImage] = useState("");
  const [roundDisplay, setRoundDisplay] = useState("1/1");
  const [successCount, setSuccessCount] = useState(0);
  const [gameEnd, setGameEnd] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState("");
  const [selectedWrongImage, setSelectedWrongImage] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

 /**
   * gameOver
   * 
   * Purpose: Determines if the game has ended based on the number of rounds played.
   */
  const GameOver = useCallback(() => {
    if (currentWordIndex >= allWords.length) {
      setGameEnd(true);
    }
  }, [currentWordIndex, allWords.length]);

  /**
   * GenerateGridForCurrentWord
   * 
   * Purpose: Create 3x3 grid with only 3 images in first column
   */
  const GenerateGridForCurrentWord = useCallback(() => {
    if (!allWords || allWords.length === 0 || currentWordIndex >= allWords.length) {
      setGameEnd(true);
      return;
    }
    
    const currentWord = allWords[currentWordIndex];
    const fixedTextValue = currentWord.text;
    const fixedImageValue = currentWord.image;
    const fixedAudioValue = currentWord.audio;

    // Get other words from the current month's selection
    const otherWords = allWords.filter((_, index) => index !== currentWordIndex);
    
    // Since there are 20 words and 7 months, the last month only has 2 images. Use the very first word as the last.
    let remainingWords = [...otherWords];
    if (month === 20) {
      // Use the first word from the first month (September - nin)
      const firstMonthFirstWord = WORD_INFO[0]
      remainingWords.push(firstMonthFirstWord);
    }
    
    // Create randomized active images array 
    const activeImages = [currentWord, ...remainingWords.slice(0, 2)]
    .sort(() => Math.random() - 0.5); 
    
    // Fill remaining spots with inactive panels to make 9 total
    const inactiveCount = 6;
    const inactivePanels = new Array(inactiveCount).fill({
      text: "none",
      image: inactivePanel,
      audio: "",
    });

    // Create grid with active images first, then inactive panels
    const grid = [...activeImages, ...inactivePanels];

    setBoxes(grid);
    setDisplayText(fixedTextValue);
    setDisplayImage(fixedImageValue);
    setDisplayAudio(fixedAudioValue);
    setCurrentCorrectAnswer(fixedTextValue);
    setAttempts(0);
    setSelectedWrongImage("");
    
    // Update round display
    setRoundDisplay((currentWordIndex + 1) + "/" + 3);
  }, [allWords, currentWordIndex, month]);

  const MoveToNextWord = useCallback(() => {
    const nextIndex = currentWordIndex + 1;
    
    if (nextIndex >= allWords.length) {
      setGameEnd(true);
    } else {
      setCurrentWordIndex(nextIndex);
    }
    
    setAttempts(0);
    setShowFeedback(false);
  }, [currentWordIndex, allWords.length]);

  // Update words based on month 
  useEffect(() => {
    let words = [];
    switch (month) {
      case 3:
        words = WORD_INFO.slice(0, 3);
        break;
      case 6:
        words = WORD_INFO.slice(3, 6);
        break;
      case 9:
        words = WORD_INFO.slice(6, 9);
        break;
      case 12:
        words = WORD_INFO.slice(9, 12);
        break;
      case 15:
        words = WORD_INFO.slice(12, 15);
        break;
      case 18:
        words = WORD_INFO.slice(15, 18);
        break;
      case 20:
        words = WORD_INFO.slice(18, 20);
        break;
      default:
        words = WORD_INFO.slice(0, 3);
    }
    
    const randomizeWords = [...words].sort(() => Math.random() - 0.5);
    setAllWords(randomizeWords);
    setCurrentWordIndex(0);
    setSuccessCount(0);
    setIsInitialized(false);
    setShowFeedback(false);
    setAttempts(0);
    setGameEnd(false);
  }, [month]);

  // Generate the initial grid and update display text after `initWords` is updated
  useEffect(() => {
    if (allWords.length > 0 && !isInitialized) {
      setIsInitialized(true);
      setCurrentWordIndex(0);
    }
    
    if (allWords.length > 0 && !gameEnd) {
      GenerateGridForCurrentWord();
    }
  }, [allWords, isInitialized, currentWordIndex, GenerateGridForCurrentWord, gameEnd]);

  /**
   * HandleFeedbackContinue
   *
   * Purpose: Continue to next word after correct answer, updating score
   */
  const HandleFeedbackContinue = () => {
    setShowFeedback(false);
    
    if (isCorrect) {
      setSuccessCount((prevCount) => prevCount + 1);
    }
    
    MoveToNextWord();
  };

  /**
   * HandleFeedbackRetry
   * 
   * Purpose: Hide feedback screen without advancing to next word
   */
  const HandleFeedbackRetry = () => {
    setShowFeedback(false);
  };

  /**
   * HandleSelection
   * 
   * Purpose: PBoolean to determine if the selected image corresponds to word displayed and give response accordingly. 
   * Also automatically moves to next round after display of result. Also manages attempt counts and feedback screen 
   * when answer is correct/incorrect.
   * 
   * paramaters
   * selectedImages: image selected by the user
   */
  const HandleSelection = (selectedImage) => {
    if (showFeedback || gameEnd) return;
    
    const correct = selectedImage === displayImage;
    const newAttempts = attempts + 1;
    
    if (correct) {
      new Audio(congratulationsAudio).play();
      setIsCorrect(true);
      setShowFeedback(true);
    } else {
      new Audio(tryAgainAudio).play();
      setIsCorrect(false);
      setSelectedWrongImage(selectedImage);
      
      if (newAttempts < 2) {
        setAttempts(newAttempts);
        setShowFeedback(true);
      } else {
        setAttempts(newAttempts);
        setShowFeedback(true);
      }
    }
  };

  /**
   * playAudio
   * 
   * Purpose: Plays the audio associated with the currently displayed word.
   */
  const PlayAudio = () => {
    if (displayAudio) {
      new Audio(displayAudio).play();
    }
  };

  /**
   * newGame
   * 
   * Purpose: Resets the game state to start a new game.
   */
  const NewGame = () => {
    const reshuffledWords = [...allWords].sort(() => Math.random() - 0.5);
    setAllWords(reshuffledWords);
    setCurrentWordIndex(0);
    setSuccessCount(0);
    setIsInitialized(false);
    setGameEnd(false);
    setShowFeedback(false);
    setAttempts(0);
    setSelectedWrongImage("");
  };

  /**
   * Purpose: returns the display of the grid along with question word based on mobile or Desktop view. 
   * Also displays final score after end of a game.
   */
  return (
    <div>
      <MobileView
        gameEnd={gameEnd}
        successCount={successCount}
        onNewGame={NewGame}
        onPlayAudio={PlayAudio}
        displayText={displayText}
        roundDisplay={roundDisplay}
        boxes={boxes}
        onHandleSelection={HandleSelection}
        showFeedback={showFeedback}
      />
      <DesktopView
        gameEnd={gameEnd}
        successCount={successCount}
        onNewGame={NewGame}
        onPlayAudio={PlayAudio}
        displayText={displayText}
        roundDisplay={roundDisplay}
        boxes={boxes}
        onHandleSelection={HandleSelection}
        showFeedback={showFeedback}
      />
      
      {/* Feedback Screen */}
      {showFeedback && (
        <FeedbackScreen
          isCorrect={isCorrect}
          correctAnswer={currentCorrectAnswer}
          miqmaqWord={displayText}
          correctImage={displayImage}
          wrongImage={selectedWrongImage}
          attempts={attempts}
          onContinue={HandleFeedbackContinue}
          onRetry={HandleFeedbackRetry}
          language={language}
        />
      )}
    </div>
  );
}

export default WordDistribution;