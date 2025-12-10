/**
 * StartGameScreen.js
 *
 * Purpose:
 *   This component serves as the entry screen for the Eskasoni Goat Island Game.
 *   It introduces players to the game mechanics, provides access to the dictionary,
 *   and allows users to start the game. It acts as a friendly, kid-focused tutorial
 *   before gameplay begins.
 *
 * Author: Kimone Barrett A00454699
 */


import Boy from '../Islandgame-images/boy.png';
import Girl from '../Islandgame-images/girl.png';
import Scroll from '../Islandgame-images/DictionaryBackground.png';
import { GiPawPrint, GiTiedScroll } from "react-icons/gi";
import { useState } from "react";
import GoatIslandGame from "../GoatIslandGame";
import Background from '../Islandgame-images/StartScreenBackground.png';
import Dictionary from "../Modals/dictionary";

const StartGameScreen = () => {
    const [showDescription, setDescription] = useState(null);
    const [startGame, setStartGame] = useState(false);
    const [openDictionary, setOpenDictionary] = useState(false);

    if (startGame) {
        return (
            <div className={'animate-fadeIn'}>
                <GoatIslandGame />
            </div>
        )
    }

    if(openDictionary){
        return (
            <div className={'animate-fadeIn'}>
                <Dictionary CloseModal={() => setOpenDictionary(false)} response={null}/>
            </div>
        )
    }

    return (
        <>
            <div className={'inset-0 bg-black fixed w-full h-full flex items-center justify-center overflow-hidden bg-center bg-no-repeat bg-cover'}
                 style={{backgroundImage: `url(${Background})`}}>
                {/*POSITION CHARACTERS ON SCREEN*/}
                <img src={Boy} alt={'Boy'} className={'absolute left-2 bottom-0 h-[28%] sm:h-[35%] lg:h-[45%] drop-shadow-xl animate-bounce'} />
                <img src={Girl} alt={'Girl'} className={'absolute right-4 bottom-0 h-[28%] sm:h-[35%]s lg:h-[45%] drop-shadow-xl animate-bounce'} />
                <div className={'inset-0 relative w-[90%] w-max-[535px] h-[655px] flex flex-col items-center justify-center'}>
                    {/*h-[655px]*/}
                    <img src={Scroll} alt={'ScrollBackground'} className={'h-full w-full absolute inset-0 object-contain drop-shadow-2xl'}
                         style={{ transform: 'rotate(90deg) scale(1.5)' }} />
                    <div className={'flex flex-col relative items-center mt-0 z-20 px-2 sm:px-6'}>
                        <h1 className={'font-black text-2xl lg:text-4xl sm:text-3xl text-yellow-900 drop-shadow-md mb-4'}>🏝️ How to Play</h1>

                        <div className={'flex gap-10 sm:gap-8 mb-6'}>
                            <GiPawPrint onClick={() => setDescription('DictionaryDescription')}
                                           className={'lg:size-14 sm:size-10 hover:scale-125 transition-transform cursor-pointer'} />
                            <GiTiedScroll onClick={() => setDescription('HintsDescription')}
                                          className={'lg:size-14 sm:size-10 hover:scale-125 transition-transform cursor-pointer'} />
                        </div>
                        <div className={'bg-yellow-500/25 rounded-xl p-4 w-full text-center border border-solid border-yellow-500 shadow-inner font-semibold text-sm sm:text-base'}>
                            {showDescription === null && (
                                <p>Lets learn about animals on Eskasoni island.</p>
                            )}
                            {showDescription === 'DictionaryDescription' && (
                                <p>Unlock new words when you get an answer correct!</p>
                            )}
                            {showDescription === 'HintsDescription' && (
                                <p>You get 3 hints.<br/>Use them wisely!</p>
                            )}
                        </div>
                        <div className={'flex flex-col gap-2 mt-10 sm:mt-8'}>
                            <button className={`text-2xl sm:text-xl text-black font-black px-6 py-3 bg-amber-500 
                            hover:bg-amber-600 border-4 border-solid border-amber-700 rounded-full hover:scale-110 
                            transition-transform shadow-black/25 shadow-xl`}
                                    onClick={()=>setOpenDictionary(true)}>Learn Words</button>
                            <button data-cy={"Start-Game"} className={`text-2xl sm:text-xl rounded-full 
                            text-black font-black px-6 py-3 sm:px-10 sm:py-4 bg-amber-500 
                            hover:bg-amber-600 border-4 border-solid border-amber-700 hover:scale-110 transition-transform 
                            shadow-black/25 shadow-xl`}
                                    onClick={() => setStartGame(true)}>Play</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StartGameScreen;