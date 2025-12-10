/**
 * NoMoreHintsComponents.js
 *
 * Purpose:
 *   This component displays a modal informing the player that they have used all
 *   their available hints. It appears when the player attempts to request more hints
 *   than the game allows (MAX_HINTS limit).
 *
 * Author: Kimone Barrett A00454699
 */
import Girl from '../Islandgame-images/girl.png';
import IslandBackground from '../Islandgame-images/StartScreenBackground.png';
import BirchPaper from '../Islandgame-images/BirchPaper.png';
import ChatBubble from '../Islandgame-images/ChatBubble.png';

export const NoMoreHintsComponents = ({Close}) =>{
    return (
        <div className={'absolute inset-0 flex w-full h-screen justify-center items-center'}>
            <div className={'inset-0 absolute z-0 w-full h-screen bg-center bg-no-repeat bg-cover'}
                 style={{backgroundImage: `url(${IslandBackground})`}}></div>
            <div>
                <img src={Girl} alt="Girl" className="size-96 -left-10 absolute" />
                <img
                    src={ChatBubble}
                    alt="ChatBubble"
                    className="absolute h-36 w-80 left-48 top-96 z-20"/>
                <p className="absolute left-48 top-96 h-36 w-72 flex items-center justify-center z-30 font-bold text-center">
                    Oh no!
                </p>
            </div>

            <div className={'flex flex-col w-96 h-64 items-center justify-center text-center relative bg-center bg-cover bg-no-repeat scale-[3]'}
                 style={{backgroundImage: `url(${BirchPaper})`}}>
            </div>
            <div className={'z-20 absolute inset-0 flex flex-col w-96 h-96 justify-between items-center mx-auto my-auto p-12'}>
                <div className={'w-full flex flex-col justify-center'}>
                    <h1 className={'text-amber-950 text-center text-3xl font-bold font-comic'}>hi'lewei alo'tasit</h1>
                    <p className={'text-amber-950 text-center text-xl italic font-bold font-comic'}>(Your Hint)</p>
                </div>
                {/*DISPLAY HINTS*/}
                <div className={'flex flex-col items-center flex-grow justify-center -mt-1'}>
                    <div className={'flex flex-col items-center w-full mt-2'}>
                        <p className={'text-lg text-amber-950 mb-4'}>You have 0 hints remaining</p>
                        <button className={'px-8 py-3 bg-amber-200 border-4 text-xl font-bold border-amber-500 rounded-full transition duration-150 hover:bg-amber-100 shadow-2xl hover:scale-105'}
                                onClick={Close}>Got it</button>
                    </div>
                </div>
            </div>
        </div>
    )
}