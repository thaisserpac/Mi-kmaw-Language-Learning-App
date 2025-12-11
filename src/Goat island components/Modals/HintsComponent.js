/**
 * HintsComponent.js
 *
 * Purpose:
 *   Displays the hint modal when a player answers incorrectly and chooses the "Get Hint" option.
 *   This component provides the Mi'kmaq hint word and reveals the English translation on hover.
 *   It visually reinforces learning while helping young players progress through the game.
 *
 * Author: Kimone Barrett A00454699, Mark Louis Tabudlong A00468931
 */

import { useState } from "react";
import BirchPaper from '../Islandgame-images/BirchPaper.png';
import ChatBubble from '../Islandgame-images/ChatBubble.png';
import Girl from '../Islandgame-images/girl.png';
import IslandBackground from '../Islandgame-images/StartScreenBackground.png';

const HintsComponent = ({close, question, numHints, content, language = "english"}) =>{
    const [showTranslation, setShowTranslation] = useState(false);

    const handleMouseOver = () =>{
        setShowTranslation(true);
    }
    const handleMouseOut = () => {
        setShowTranslation(false);
    }

    return (
        <div className={'absolute inset-0 flex w-full h-screen justify-center items-center'}>
            <div className={'inset-0 absolute z-0 w-full h-screen bg-center bg-no-repeat bg-cover'}
                 style={{backgroundImage: `url(${IslandBackground})`}}></div>

            <div>
                <img src={Girl} alt="Girl" className="size-96 -left-10 absolute animate-bounce" />
                <img
                    src={ChatBubble}
                    alt="ChatBubble"
                    className="absolute h-36 w-80 left-48 top-96 z-20"/>
                <p className="absolute left-48 top-96 h-36 w-72 flex items-center justify-center z-30 font-bold text-center">
                    {content.hoverTranslation}
                </p>
            </div>

            <div className={'flex flex-col w-96 h-64 items-center justify-center text-center relative bg-center bg-cover bg-no-repeat scale-[3]'}
                 style={{backgroundImage: `url(${BirchPaper})`}}>
            </div>
            <div className={'z-20 absolute inset-0 flex flex-col w-96 h-96 justify-between items-center mx-auto my-auto p-12'}>
                <div className={'w-full flex flex-col justify-center'}>
                    <h1 className={'text-amber-950 text-center text-3xl font-bold font-comic'}>{content.yourHint}</h1>
                    <p className={'text-amber-950 text-center text-xl italic font-bold font-comic'}>{content.yourHintEnglish}</p>
                </div>
                {/*DISPLAY HINTS*/}
                <div className={'flex flex-col items-center flex-grow justify-center -mt-1'}>
                    <p className={'text-sm italic text-amber-800'}>{content.hoverEnglish}</p>
                    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                        <p className={'text-6xl text-amber-950 font-extrabold cursor-pointer mt-2'}>{question.Hint}</p>
                        {showTranslation && (
                            <p className={'text-lg text-center text-amber-950 mt-3 italic'}>
                                {language === 'french' ? question.HintTranslationFrench : question.HintTranslation}
                            </p>
                        )}
                    </div>
                    <div className={'flex flex-col items-center w-full mt-2'}>
                        <p className={'text-lg text-amber-950 mb-4'}>
                            {content.hintsRemaining.replace('{numHints}', numHints)}
                        </p>
                        <button className={'px-8 py-3 bg-amber-200 border-4 text-xl font-bold border-amber-500 rounded-full transition duration-150 hover:bg-amber-100 shadow-2xl hover:scale-105'}
                                onClick={close}>{content.gotIt}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HintsComponent;