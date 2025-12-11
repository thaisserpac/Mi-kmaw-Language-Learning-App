/**
 * AnsweredCorrectly.js
 *
 * Purpose:
 *   Displays the success modal that appears when the player answers a question correctly.
 *   This screen congratulates the learner, visually reinforces progress, and allows the
 *   player to either:
 *     • open the Dictionary to view the newly unlocked word, or
 *     • continue to the next question.
 *
 * Author: Kimone Barrett A00454699, Mark Louis Tabudlong A00468931
 */

import { useState } from "react";
import { GiPawPrint } from "react-icons/gi";
import Boy from "../Islandgame-images/boy.png";
import Scroll from "../Islandgame-images/DictionaryBackground.png";
import IslandBackground from "../Islandgame-images/StartScreenBackground.png";
import Dictionary from "./dictionary";

const AnsweredCorrectly = ({response, nextQuestion, content, language}) =>{
    const [openDictModal, setOpenDictModal] = useState(false)

    // function handleCorrectAnswerContinue(){}
    if(openDictModal) {
       return (
           <div>
               <Dictionary response={response} CloseModal={() => setOpenDictModal(false)} content={content} language={language}/>
           </div>
       )
    }

    return(
        <div className={'h-screen w-screen justify-center items-center inset-0 absolute flex'}>
            <div className={'inset-0 absolute z-0 w-full h-screen bg-center bg-no-repeat bg-cover'}
                 style={{backgroundImage: `url(${IslandBackground})`}}></div>
            <img src={Boy} alt={'Boy'} className={'size-96 left-10 absolute animate-bounce'}/>
            <div className={'absolute w-full h-full flex flex-col gap-3 text-center items-center justify-center content-center rounded-md z-10 p-8 bg-center bg-cover bg-no-repeat'}>
                <img src={Scroll} alt={'Scroll Background'}
                     className={'absolute object-center h-3/5'}
                     style={{transform:'rotate(90deg)', transformOrigin:'center center'}}/>
                <p className={'z-20 mt-1 text-yellow-900 font-bold'}>
                    {content.correct}<br/> {content.unlockedWord}
                    <br/><span className={'font-medium'}>{content.checkDictionary}</span><br/>
                    <span><GiPawPrint className={'size-8 cursor-pointer items-center hover:scale-110'}
                                         onClick={() => setOpenDictModal(true)}/></span>
                </p>
                <button
                    className={'cursor-pointer font-medium z-20 bg-amber-800 rounded-full px-4 py-2 border-2 border-solid border-amber-900 shadow-lg shadow-amber-950 hover:scale-105'}
                    data-cy={"correct-continue-btn"}
                    onClick={nextQuestion}>{content.nextQuestion}</button>
            </div>
        </div>
    )
}

export default AnsweredCorrectly;