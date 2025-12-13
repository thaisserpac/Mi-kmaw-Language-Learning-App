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
 * Author: Kimone Barrett A00454699, Mark Louis Tabudlong A00468931, Thais Serpa
 */

import { useCallback, useState } from "react";
import { GiPawPrint, GiTiedScroll } from "react-icons/gi";
import PlayFlag from "./Islandgame-images/playflag.png";
import { GOAT_ISLAND_LANGUAGE } from "./GoatIslandLanguageContent";
import Background from "./Islandgame-images/Island.png";
import CheckMark from './Islandgame-images/checkmark.png';
import AnsweredCorrectly from "./Modals/AnsweredCorrectly";
import GameOver from "./Modals/GameOver";
import HintsComponent from "./Modals/HintsComponent";
import IncorrectAnswer from "./Modals/IncorrectAnswer";
import { NoMoreHintsComponents } from "./Modals/NoHintsModalComponent";
import { RandomAnimalFact } from "./Modals/RandomAnimalFact";
import Dictionary from "./Modals/dictionary";
import { ActiveQuestionComponent } from "./components/ActiveQuestionComponent";
import { QuestionHeader } from "./components/QuestionHeader";
import { Landmarks } from "./landmarks";
import { Questions } from "./questions";

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

const GoatIslandGame = ({ language = "english" }) => {
    const content = GOAT_ISLAND_LANGUAGE[language] || GOAT_ISLAND_LANGUAGE.english;

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

                setShowImage(prev => [...prev, response]);

                setCorrectStreak(prev => {
                    const newCount = prev + 1;

                    if (newCount >= 3) {
                        setOpenFactModal(true);
                        return 0;
                    }
                    return newCount;
                })
            } else {
                const newAttempts = attempts + 1;
                setAttempts(newAttempts);

                if (attempts >= MAX_ATTEMPTS) {
                    setCurrentQuestion({ isGameOverDueToFailure: true })
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
        <div className={'h-screen w-full flex absolute inset-0 justify-center bg-cover bg-center bg-no-repeat object-fill'}
            style={{ backgroundImage: `url(${Background})` }}>

            {/*DICTIONARY AND HINTS*/}
            <div className={'inset-0 absolute'}>
                <GiPawPrint
                    data-cy={"dictionary-button"}
                    className={'cursor-pointer size-24 text-yellow-600 hover:scale-110'}
                    onClick={() => setOpenDictionaryModal(true)} />

                <div className={'flex flex-row gap-3'}>
                    {Array.from({ length: Math.min(numHints, MAX_HINTS) }, (_, index) => (
                        <GiTiedScroll className={'size-12 '} key={index} />
                    ))}
                </div>
            </div>

            {openFactModal && (
                <RandomAnimalFact
                    Close={() => setOpenFactModal(false)}
                    unlockedAnimals={showImage}
                    content={content}
                    language={language}
                />
            )}

            {/*OPEN DICTIONARY MODAL*/}
            {openDictionaryModal && (
                <Dictionary
                    response={showImage}
                    CloseModal={() => setOpenDictionaryModal(false)}
                    content={content}
                    language={language}
                />
            )}

            {/*DISPLAY LANDMARKS OR GAME OVER PAGE*/}
            {isGameOver || attempts >= MAX_ATTEMPTS ? (
                <div className={'animate-fadeIn'}>
                    <GameOver
                        isCompleted={isCompleted}
                        resetGame={resetGame}
                        score={score}
                        length={Landmarks.length}
                        content={content}
                        language={language}
                    />
                </div>
            ) : !gameStarted ? (
                <>
                    <div className={'text-center fixed text-3xl font-bold font-comic'}>
                        <p>{content.gameTitle}</p>
                    </div>
                    <div>
                        <img
                            src={PlayFlag}
                            alt={'Play Flag'}
                            onClick={startGame}
                            className={'size-36 absolute top-48 left-80 hover:scale-105 hover:animate-none cursor-pointer animate-pulse'}
                            data-cy="start-flag"
                        />                    </div>
                </>
            ) : (
                <div>
                    {/*CONTAINER FOR QUESTIONS*/}
                    <div className="w-full flex justify-center items-center mt-4 absolute top-0 left-0">
                        <QuestionHeader currentQuestion={activeQuestion} content={content} />
                    </div>
                    {Landmarks.map((landmark, index) => (
                        <div key={index}>
                            <div
                                className={`size-24 absolute bg-center bg-cover bg-no-repeat hover:scale-105
                                 ${activeIndex === index
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
                            response={showImage}
                            nextQuestion={handleCorrectAnswerContinue}
                            content={content}
                            language={language}
                        />
                    )}
                    {/*INCORRECT ANSWER MODAL*/}
                    {showRemainingAttempts && (
                        <IncorrectAnswer
                            getHintFunction={getHint}
                            attempts={showRemainingAttempts}
                            close={() => setShowRemainingAttempts(null)}
                            content={content} />
                    )}
                    {/*HINTS MODAL*/}
                    {showHints && (
                        <HintsComponent
                            close={() => setShowHint(null)}
                            question={activeQuestion}
                            numHints={numHints}
                            content={content}
                            language={language}
                        />
                    )}
                    {/*NO HINTS REMAINING MODAL*/}
                    {noHints && (
                        <NoMoreHintsComponents
                            Close={() => setNoHints(false)}
                            content={content}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default GoatIslandGame;