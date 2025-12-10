/**
 * AnimalFactDetail.js
 *
 * Purpose:
 *   Displays a detailed modal showing a single random fact about a specific animal.
 *   This modal appears after the user selects an animal from the "RandomAnimalFact"
 *   fact-library modal (unlocked after a streak of correct answers).
 *
 *   It serves as an educational reward system, teaching children fun facts while
 *   reinforcing vocabulary learning in a positive, culturally safe environment.
 *
 * Author: Kimone Barrett A00454699
 */


import {useState} from "react";
import Background from "../Islandgame-images/DictionaryBackground.png";
import IslandBackground from "../Islandgame-images/StartScreenBackground.png";
import Boy from "../Islandgame-images/boy.png";
import Girl from "../Islandgame-images/girl.png";

export const AnimalFactDetail = ({animal, Close, onBack}) => {
    const [fact] = useState(() => {
        const facts = animal.Facts;
        if(facts.length === 0){
            return "No facts available for this animal";
        }
        const randomFactIndex = Math.floor(Math.random() * facts.length);
        return facts[randomFactIndex];
    })

    const animalName = animal.name;

    return (
        <div data-cy={"animal-fact-detail"} className={'inset-0 w-screen h-screen absolute flex justify-center items-center bg-no-repeat bg-cover bg-center overflow-hidden'} style={{backgroundImage:`url(${IslandBackground})`}}>
            <div className={'inset-0 absolute bg-contain bg-center bg-no-repeat z-10 scale-[1]'}
                 style={{backgroundImage: `url(${Background})`, rotate:'90deg'}}></div>
            <div className={'absolute border border-solid bg-yellow-100/100 border-amber-400 px-2 py-4 z-20 rounded-lg shadow-inner  shadow-amber-400'}>
                <h3 className="text-2xl font-bold mb-4">{animalName} Fact</h3>
                <p className="mb-6 italic">"{fact}"</p>
                <div className="flex justify-end space-x-3">
                    <button
                        data-cy={'animal-detail-back'}
                        onClick={onBack}
                        className={'px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 hover:-translate-y-2'}>Back to Animals</button>
                    <button
                        data-cy={'animal-detail-continue'}
                        onClick={Close}
                        className={'px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 hover:-translate-y-2'}>Continue Game</button>
                </div>
            </div>
            <div className={'inset-0 absolute flex justify-between items-center'}>
                <img src={Boy} alt={'Boy'} className={'size-72 animate-bounce'}/>
                <img src={Girl} alt={'Girl'} className={'size-72 animate-bounce'}/>
            </div>
        </div>
    )
}