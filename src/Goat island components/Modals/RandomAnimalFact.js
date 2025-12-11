/**
 * RandomAnimalFact.js
 *
 * Purpose:
 *   This component displays a special reward modal that appears after the player
 *   answers three questions correctly in the Goat Island game. It shows a scrollable
 *   list of animals for which the player has unlocked a fact. Clicking an animal
 *   opens the AnimalFactDetail modal, which reveals one random fact about that animal.
 *
 * Related Components:
 *   • AnimalFactDetail.js — Displays a single animal fact.
 *   • GoatIslandGame.js — Controls when this modal appears (on 3 correct answers).
 *
 * Author: Kimone Barrett A00454699, Mark Louis Tabudlong A00468931, Thais Serpa
 */

import { useState } from "react";
import BirchPaper from "../Islandgame-images/BirchPaper.png";
import Boy from "../Islandgame-images/boy.png";
import Girl from "../Islandgame-images/girl.png";
import IslandBackground from "../Islandgame-images/StartScreenBackground.png";
import { AnimalFactDetail } from "./AnimalFactDetail";

export const RandomAnimalFact = ({unlockedAnimals, Close, content, language}) => {
    const [selectedAnimal, setSelectedAnimal] = useState(null)

    if(selectedAnimal){
        return (
            <div className={'inset-0 absolute flex items-center justify-center bg-black/75 z-50'}>
                <AnimalFactDetail animal={selectedAnimal}
                                  Close={Close}
                                  onBack={()=> setSelectedAnimal(null)}
                                  content={content}
                                  language={language} /> 
            </div>
        )
    }

    return (
        <div data-cy={"animal-fact-modal"} className={'inset-0 absolute flex items-center justify-center bg-center bg-cover bg-no-repeat z-30'}
             style={{backgroundImage: `url(${IslandBackground})`}}>

            <div className={'bg-center bg-no-repeat bg-cover w-96 h-64 scale-[3] pointer-events-none'}
                 style={{backgroundImage: `url(${BirchPaper})`}}></div>
            <div className={'absolute w-[38%] h-96 flex items-center'}>
                <div className={'absolute inset-0 flex justify-center'}>
                    <div className={'flex flex-col gap-2 w-full items-center'}>
                        <h2 className={'text-3xl font-extrabold text-center text-green-800'}>{content.factLibraryUnlocked}</h2>
                        <div className={'w-[90%] border border-solid border-green-50'}></div>
                        <p className={'text-lg font-medium text-green-600'}>{content.clickToView}</p>
                        <div className={'relative w-full'}>
                            <div className={'z-50 pointer-events-auto flex gap-6 h-52 w-full justify-start flex-nowrap overflow-x-scroll overflow-y-visible hide-scrollbar'}>
                                {unlockedAnimals.map((animal, index)=>{
                                    return (
                                        <div key={index}
                                             className={`relative flex flex-col items-center flex-shrink-0 w-[220px] px-4 py-4 mb-3 border-2 rounded-lg cursor-pointer transition-transform`}
                                             onClick={()=> setSelectedAnimal(animal)}>
                                            {animal.Image &&(
                                                <img
                                                    data-cy={`animal-option-${animal.name.toLowerCase()}`}
                                                    src={animal.Image}
                                                    alt={animal.name}
                                                    className={'size-32 object-contain mb-2'}/>
                                            )}
                                            <p className={'font-semibold text-center'}>{animal.name}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={'absolute right-0 top-0 h-full rounded-tr rounded-br w-12 bg-gradient-to-l from-white to-transparent pointer-events-none'}></div>
                        </div>
                        <div className={'text-center z-10'}>
                            <button onClick={Close} className={'px-6 py-3 cursor-pointer hover:scale-110 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition-colors'}>{content.continueGame}</button>
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