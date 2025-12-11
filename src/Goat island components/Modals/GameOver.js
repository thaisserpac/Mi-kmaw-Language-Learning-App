/**
 * GameOver.js
 *
 * Purpose:
 *   Displays the final screen shown when the Goat Island Game ends — either
 *   because the player correctly answered all questions (completion) or
 *   ran out of attempts (failure). This modal provides visual feedback,
 *   performance results, and a path to restart the game.
 *
 * Author: Kimone Barrett A00454699, Mark Louis Tabudlong A00468931, Thais Serpa
 */

import { useState } from "react";
import { GiPawPrint } from "react-icons/gi";
import Scroll from '../Islandgame-images/DictionaryBackground.png';
import BackgroundGameOver from '../Islandgame-images/GameOverBackground.png';
import GameOverScreenBackground from '../Islandgame-images/GameOverScreenBackground.jpg';
import Boy from '../Islandgame-images/boy.png';
import Girl from '../Islandgame-images/girl.png';
import Dictionary from "./dictionary";

const GameOver = ({isCompleted, resetGame, score, length, content, language}) => {
    const [openDict, setOpenDict] = useState(null);

    if(openDict){
        return (
            <div>
                <Dictionary CloseModal={()=> setOpenDict(null)} response={null} content={content} language={language}/>
            </div>
        )
    }

    return (
        <div data-cy={'gameOver-modal'} className={'inset-0 absolute flex bg-center bg-no-repeat bg-cover overflow-hidden'}
             style={{backgroundImage: `url(${GameOverScreenBackground})`}}>
            {/*SCROLL BACKGROUND*/}
            <div className={'absolute bg-contain bg-no-repeat bg-center w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90 scale-[1.25]'}
                 style={{backgroundImage: `url(${Scroll})`}}>
                {/*CONTENT BACKGROUND*/}
                <div className={'absolute inset-0 m-auto w-[50%] h-[50%] bg-no-repeat bg-center bg-contain -rotate-90'}
                     style={{backgroundImage: `url(${BackgroundGameOver})`}}>

                    <div className={'flex flex-col gap-2 items-center justify-center w-full h-full'}>
                        <div data-cy={"gameOver-message"} className={'text-center text-xl font-black text-amber-700 bg-amber-50/30 py-3 px-8 border-8 border-amber-100 rounded-full'}>
                            {isCompleted ? content.congratulations : content.gameOver}
                        </div>
                        <div className={'flex flex-col text-center text-xl font-bold'}>
                            {isCompleted ? (
                                <p className={'flex items-center text-sm text-white'}>
                                    {content.answeredAllQuestions}
                                    <span className={'inline-flex items-center justify-center'}>
                                    <GiPawPrint onClick={()=>setOpenDict(true)}
                                                   className={'cursor-pointer size-8 hover:scale-110'}/>
                                    </span>
                                </p>
                            ) : (
                                <p className={'flex items-center text-sm text-white'}>
                                    {content.ranOutAttempts}
                                    <span className={'inline-flex items-center justify-center'}>
                                    <GiPawPrint onClick={()=>setOpenDict(true)}
                                                   className={'cursor-pointer size-8 hover:scale-105'}/>
                                </span>
                                </p>
                            )}
                        </div>
                        <div className={'bg-black/60 p-3 rounded-xl'}>
                            <h2 data-cy={"score-display"} className={'text-center text-lg font-black text-green-500'}>{content.score} <br/> {score}/{length}</h2>
                        </div>

                        <div className={'flex flex-col gap-3 ml-72 mr-72 mt-4'}>
                            <button
                                data-cy={'reset-btn'}
                                onClick={resetGame}
                                className={`rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold 
                                text-amber-700
                                border-4 border-solid border-amber-500/ 
                                hover:scale-105 cursor-pointer`}
                            >{content.playAgain}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'inset-0 absolute flex justify-between items-center pointer-events-none'}>
                <img src={Boy} alt={'Boy'} className={'size-72 animate-bounce'}/>
                <img src={Girl} alt={'Girl'} className={'size-72 animate-bounce'}/>
            </div>
        </div>
    )
}

export default GameOver;