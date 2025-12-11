/**
 * IncorrectAnswer.js
 *
 * Purpose:
 *   This component displays a modal informing the player that their answer was incorrect.
 *   It also tells the player how many attempts remain and provides two actions:
 *      • "Get Hint" – requests a hint from the parent component.
 *      • "Try Again" – closes the modal and returns to the question.
 *
 * Author: Kimone Barrett A00454699, Mark Louis Tabudlong A00468931
 */

import Scroll from "../Islandgame-images/DictionaryBackground.png";
import IslandBackground from "../Islandgame-images/StartScreenBackground.png";
import Girl from "../Islandgame-images/girl.png";

const IncorrectAnswer = ({getHintFunction, attempts, close, content}) => {

    return (
        <div className={'absolute inset-0 flex w-full h-screen justify-center items-center'}>
            <div className={'inset-0 absolute w-full h-screen  z-0 bg-no-repeat bg-cover bg-center'}
                 style={{backgroundImage: `url(${IslandBackground})`}}></div>
            <img src={Girl} alt={'Girl'} className={'absolute left-10 size-96 animate-bounce'}/>
            <div className={'relative w-full h-full gap-3 flex flex-col content-center items-center justify-center rounded-lg  z-10 bg-center bg-cover bg-no-repeat'}>
                <img src={Scroll} alt={'Scroll'} className={'absolute object-center h-3/5'}
                     style={{transform:'rotate(90deg)', transformOrigin:'center center'}}/>
                <p className={'text-lg font-bold z-20 text-yellow-900 text-center ml-12 mr-14'}>
                    {content.incorrect}<br/>
                    {content.youHave} {attempts} {content.attemptsRemaining}
                </p>
                <div className={'flex flex-row gap-4'}>
                    <button className={'text-sm font-bold z-20 cursor-pointer bg-amber-600 border-2 border-solid border-amber-700 rounded-full px-4 py-2 shadow-lg shadow-amber-800 hover:scale-105'}
                            onClick={getHintFunction}>{content.getHint}</button>
                    <button className={'cursor-pointer bg-amber-800 border-2 border-solid border-amber-900  font-bold text-sm rounded-full px-2 py-1 z-10 shadow-lg shadow-amber-950 hover:scale-105'}
                            onClick={close}>{content.tryAgain}</button>
                </div>
            </div>
        </div>
    )
}

export default IncorrectAnswer;