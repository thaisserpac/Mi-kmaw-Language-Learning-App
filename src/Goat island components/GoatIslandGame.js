/**
 * GoatIslandGame.js
 * Purpose:
 *   This component implements the full gameplay logic for the "Eskasoni Goat Island"
 *   Mi'kmaq Language Learning Game. It combines vocabulary questions, cultural landmarks,
 *   hint mechanics, scoring, modals, and child-friendly animal fact rewards.
 *
 * Major Responsibilities:
 *   - Display the interactive Goat Island map with clickable landmarks.
 *   - Manage question selection, progression, attempt tracking, and scoring.
 *   - Control modal visibility (Correct, Incorrect, Hints, No Hints, Game Over, Dictionary).
 *   - Handle streak-based reward modals (Animal Fact Library).
 *   - Shuffle question order each game session.
 *   - Reset all game state when the player chooses to restart.
 *
 * Author: Kimone Barrett A00454699
 *         Thais
 */


import Background from "./Islandgame-images/Island.png";
import CheckMark from './Islandgame-images/checkmark.png';
import {Landmarks} from "./landmarks";
import {Questions} from "./questions";
import {useCallback, useState} from "react";
import {GiPawPrint } from "react-icons/gi";
import {GiTiedScroll} from "react-icons/gi";
import { ImFlag } from "react-icons/im";
import AnsweredCorrectly from "./Modals/AnsweredCorrectly";
import IncorrectAnswer from "./Modals/IncorrectAnswer";
import HintsComponent from "./Modals/HintsComponent";
import GameOver from "./Modals/GameOver";
import {NoMoreHintsComponents} from "./Modals/NoHintsModalComponent";
import {ActiveQuestionComponent} from "./components/ActiveQuestionComponent";
import Dictionary from "./Modals/dictionary";
import {QuestionHeader} from "./components/QuestionHeader";
import {RandomAnimalFact} from "./Modals/RandomAnimalFact";

function shuffleQuestions(array) {
    const shuffled = [...array];
    let currentIndex = shuffled.length;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
    }
    return shuffled;
}

const GoatIslandGame = () => {
    const [shuffledArray, setShuffledArray] = useState(() => shuffleQuestions(Questions));
    const [completedLandmarks, setCompletedLandmarks] = useState(new Array(Landmarks.length).fill(false));
    const nextIndex = completedLandmarks.findIndex(isCompleted => isCompleted === false);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
    const [showRemainingAttempts, setShowRemainingAttempts] = useState(null);
    const isCompleted = nextIndex === -1 && shuffledArray.length > 0;
    const isGameOver = isCompleted || currentQuestion?.isGameOverDueToFailure;
    const [gameStarted, setGameStarted] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [score, setScore] = useState(0);
    const [numHints, setAvailableHints] = useState(0);
    const [showHints, setShowHint] = useState(null);
    const [noHints, setNoHints] = useState(null);
    const MAX_HINTS = 3;
    const MAX_ATTEMPTS = 2;
    const [showImage, setShowImage] = useState([]);
    const [openDictionaryModal, setOpenDictionaryModal] = useState(false);
    const activeQuestion = currentQuestion !== null ? currentQuestion.question : null
    const activeIndex = currentQuestion?.activeIndex
    const responseY = currentQuestion?.y || 0;
    const responseX = currentQuestion?.x || 0;
    const [openFactModal, setOpenFactModal] = useState(false);
    // const [earnedBadges, setEarnedBadges] = useState([]);
    // Variables for pausing game
    const [correctStreak, setCorrectStreak] = useState(0);
    //
    // const earnBadge = useCallback((animalName) => {
    //     setEarnedBadges(prevBadges => {
    //         if(!prevBadges.includes(animalName)){
    //             return [...prevBadges, animalName];
    //         }
    //         return prevBadges;
    //     });
    // }, [])

    const startGame = useCallback(() => {
        setGameStarted(true);
        setAvailableHints(MAX_HINTS);
    }, []);

    function handleImageClick(index) {
        const questionData = shuffledArray[nextIndex];
        const landmark = Landmarks[index];

        setCurrentQuestion({
            question: questionData,
            x: landmark.x,
            y: landmark.y,
            activeIndex: nextIndex
        });
        setAnsweredCorrectly(false);
    }

    const checkAnswers = useCallback(
        (response, isCorrect) => {
            if (isCorrect) {
                const index = currentQuestion.activeIndex

                setCompletedLandmarks(prevState => {
                    const completed = [...prevState];
                    completed[index] = true;
                    return completed;
                });

                setAnsweredCorrectly(true);
                setCurrentQuestion(null);
                setAttempts(0);
                setScore(prevScore => prevScore + 1);

                // console.log("response in checkAnswers:", response);
                setShowImage(prev => [...prev, response]);
                // console.log('From Show Image', showImage)

                setCorrectStreak( prev => {
                    const newCount = prev + 1;

                    if(newCount >= 3){
                        setOpenFactModal(true);
                        return 0;
                    }
                    return newCount;
                })
            } else {
                const newAttempts = attempts + 1;
                setAttempts(newAttempts);

                if (attempts >= MAX_ATTEMPTS) {
                    setCurrentQuestion({isGameOverDueToFailure: true})
                    setShowRemainingAttempts(null)
                } else {
                    setShowRemainingAttempts(MAX_ATTEMPTS - newAttempts);
                }
            }
        },
        [attempts, currentQuestion]
    );

    function handleCorrectAnswerContinue() {
        setAnsweredCorrectly(null);
        if (nextIndex === -1) {
            setAnsweredCorrectly(true);
        }
    }

    const resetGame = useCallback(() => {
        setCompletedLandmarks(new Array(Landmarks.length).fill(false));
        setShuffledArray(() => shuffleQuestions(Questions));
        setAnsweredCorrectly(false);
        setCurrentQuestion(null);
        setScore(0);
        setAttempts(0);
        setAvailableHints(0);
        setShowRemainingAttempts(false);
        setGameStarted(false);
        setShowImage([]);
    }, []);


    const getHint = useCallback(() => {
        setShowRemainingAttempts(false);
        setAvailableHints(numHints - 1);

        if (numHints <= 0) {
            setShowHint(false);
            setNoHints(true);
        } else {
            setShowHint(true);
        }
    }, [numHints]);

    return (
        <div data-cy={"gameover-modal"} className={'h-screen w-full flex absolute inset-0 justify-center bg-cover bg-center bg-no-repeat object-fill'}
             style={{backgroundImage: `url(${Background})`}}>

            {/*DICTIONARY AND HINTS*/}
            <div className={'inset-0 absolute'}>
                <GiPawPrint
                    data-cy={"dictionary-button"}
                    className={'cursor-pointer size-24 text-yellow-600'}
                    onClick={() => setOpenDictionaryModal(true)}/>

                <div className={'flex flex-row gap-3'}>
                    {Array.from({length: Math.min(numHints, MAX_HINTS)}, (_, index) => (
                        <GiTiedScroll className={'size-12 '} key={index}/>
                    ))}
                </div>
            </div>

            {openFactModal &&(
                <RandomAnimalFact
                    Close={() => setOpenFactModal(false)}
                    unlockedAnimals={showImage}
                />
            )}

            {/*OPEN DICTIONARY MODAL*/}
            {openDictionaryModal &&(
                <Dictionary response={showImage} CloseModal={() => setOpenDictionaryModal(false)}/>
            )}

            {/*DISPLAY LANDMARKS OR GAME OVER PAGE*/}
            {isGameOver || attempts >= MAX_ATTEMPTS ? (
                <div className={'animate-fadeIn'}>
                    <GameOver isCompleted={isCompleted}
                              resetGame={resetGame}
                              score={score}
                              responses={showImage}
                              length={Landmarks.length}/>
                </div>
            ) : !gameStarted ? (
                <>
                    <div className={'text-center fixed text-3xl font-bold font-comic'}>
                        <p>Eskasoni Goat Island <br/>Game</p>
                    </div>
                    <div>
                        <ImFlag data-cy={"start-flag"}
                            onClick={startGame}
                            className={'text-amber-300 size-36 absolute top-48 left-80 hover:scale-105 hover:animate-none cursor-pointer animate-pulse'}/>
                    </div>
                </>
            ) : (
                <div>
                    {/*CONTAINER FOR QUESTIONS*/}
                    <div className="w-full flex justify-center items-center mt-4 absolute top-0 left-0">
                        <QuestionHeader currentQuestion={activeQuestion} />
                    </div>
                    {Landmarks.map((landmark, index) => (
                        <div key={index}>
                            <div
                                className={`size-24 absolute bg-center bg-cover bg-no-repeat hover:scale-105
                                 ${
                                    activeIndex === index
                                        ? ''
                                        : (currentQuestion || index !== nextIndex
                                                ? 'cursor-not-allowed'
                                                : 'hover:cursor-pointer'
                                        )
                                }`}
                                style={{
                                    backgroundImage: `url(${completedLandmarks[index]
                                        ? CheckMark
                                        : landmark.Img})`,
                                    top: landmark.y,
                                    left: landmark.x,
                                    visibility: (currentQuestion)
                                        ? 'hidden'
                                        : (index === nextIndex || completedLandmarks[index])
                                            ? 'visible'
                                            : 'hidden'
                                }}
                                onClick={currentQuestion || index !== nextIndex ? null : () => handleImageClick(index)}
                                data-cy={`landmark-${index}`}>
                            </div>
                        </div>
                    ))}

                    {/*CONTAINER FOR RESPONSES*/}
                    {activeQuestion && (
                        <ActiveQuestionComponent
                            activeQuestion={activeQuestion}
                            checkAnswers={checkAnswers}
                            responseX={responseX}
                            responseY={responseY}
                        />
                    )}
                    {/*CORRECT ANSWER MODAL*/}
                    {answeredCorrectly && (
                        <AnsweredCorrectly
                            dictModal={openDictionaryModal}
                            response={showImage}
                            nextQuestion={handleCorrectAnswerContinue}/>
                    )}
                    {/*INCORRECT ANSWER MODAL*/}
                    {showRemainingAttempts && (
                        <IncorrectAnswer
                            getHintFunction={getHint}
                            attempts={showRemainingAttempts}
                            close={() => setShowRemainingAttempts(null)}/>
                    )}
                    {/*HINTS MODAL*/}
                    {showHints && (
                        <HintsComponent
                            close={() => setShowHint(null)}
                            question={activeQuestion}
                            numHints={numHints}/>
                    )}
                    {/*NO HINTS REMAINING MODAL*/}
                    {noHints && (
                        <NoMoreHintsComponents
                            Close={() => setNoHints(false)}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default GoatIslandGame;
