import DictionaryBackground from "./Islandgame-images/DictionaryBackground.png";
import Background from './Islandgame-images/StartScreenBackground.png';
import {motion} from "framer-motion";
import {ISLAND_GAME_WORDS} from './wordBank';
import {IoClose} from "react-icons/io5";
import {useState} from "react";

const Dictionary = ({CloseModal, response}) => {
    const [showWord, setShowWord] = useState(null);

    function toggleImage(index){
        setShowWord(showWord === index ? null : index);
    }

    return (
        <div className={'fixed inset-0 flex items-center justify-center z-50 bg-black/80 bg-center bg-cover bg-no-repeat'} style={{backgroundImage: `url(${Background})`}}>
            
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Titan+One&display=swap');`}
            </style>

            <motion.div className={'relative origin-bottom w-[95%] sm:w-2/3 lg:w-1/3 h-[85vh] flex items-center justify-center'}
                        initial={{scaleX:0 }} animate={{scaleX:1}}
                        exit={{scaleX:0}}
                        transition={{duration:0.8,ease:"easeOut"}}>
                
                {/* BACKGROUND SCROLL IMAGE */}
                <img src={DictionaryBackground} alt={'Dictionary Background'}
                     className={'absolute inset-0 w-full h-full object-contain z-0'}
                     style={{transform: 'rotate(90deg) scale(1.5)', transformOrigin:'center center'}}/>
                
                {/* CONTENT CONTAINER 
                    - CHANGED pt-24 to pt-36 (Mobile) and sm:pt-44 (Tablet/Desktop)
                    - This pushes everything down onto the actual paper area.
                */}
                <div className={'z-10 relative flex flex-col w-[80%] h-full justify-start items-center pt-36 sm:pt-44'}>
                    
                    {/* Header Section */}
                    <div className={'w-full flex justify-between items-center border-b-2 border-amber-900/20 pb-2 mb-2'}>
                        <div className="w-8"></div> 
                        <h2 className={'text-2xl sm:text-3xl text-amber-900 drop-shadow-sm text-center'} 
                            style={{ fontFamily: '"Titan One", sans-serif' }}>
                            Island Dictionary
                        </h2>
                        <span onClick={CloseModal} className={'cursor-pointer text-amber-900 hover:text-red-600 hover:scale-110 transition-transform'}>
                            <IoClose size={32}/>
                        </span>
                    </div>

                    <p className={'text-center text-lg text-amber-800 mb-2'} style={{ fontFamily: '"Titan One", sans-serif' }}>
                        Animals of the Island 🦌
                    </p>

                    {/* SCROLLABLE GRID AREA 
                        - Added mt-2 to give space between the text and the animals.
                    */}
                    <div className={'w-full h-[55%] mt-2 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-700 scrollbar-track-transparent px-2'}>
                        {response === null ? (
                            <div className={'grid grid-cols-3 gap-y-6 justify-items-center pt-2'}>
                                {ISLAND_GAME_WORDS.map((words, idx)=>(
                                    <div key={idx} className={'flex flex-col relative items-center'}>
                                        <img src={words.img} alt={words.name}
                                             className={'w-14 h-14 sm:w-16 sm:h-16 object-contain cursor-pointer hover:-translate-y-2 transition-transform'}
                                             onClick={() => toggleImage(idx)}/>
                                        
                                        {/* Name Label */}
                                        {showWord === idx && (
                                            <div className={'absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-[#fdf6e3] border-2 border-amber-800 rounded-lg px-2 py-1 z-50 w-max shadow-lg'}>
                                                <p className={'text-sm text-amber-900'} style={{ fontFamily: '"Titan One", sans-serif' }}>{words.word}</p>
                                                <p className={'text-xs text-amber-700 font-bold'}>({words.EnglishTranslation})</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={'grid grid-cols-3 gap-y-6 justify-items-center pt-2'}>
                                {ISLAND_GAME_WORDS.map((words, index)=> {
                                    const displayImage = response.some(ans=> ans.Word === words.word);
                                    return (
                                        <div key={index} className={`${displayImage ? "block": "hidden"}`}>
                                            {displayImage && (
                                                <div className={'flex flex-col relative items-center'}>
                                                    <img src={words.img} alt={words.name}
                                                         className={'w-14 h-14 sm:w-16 sm:h-16 object-contain cursor-pointer hover:-translate-y-2 transition-transform'}
                                                         onClick={() => toggleImage(index)}/>
                                                    
                                                    {showWord === index && (
                                                        <div className={'absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-[#fdf6e3] border-2 border-amber-800 rounded-lg px-2 py-1 z-50 w-max shadow-lg'}>
                                                            <p className={'text-sm text-amber-900'} style={{ fontFamily: '"Titan One", sans-serif' }}>{words.word}</p>
                                                            <p className={'text-xs text-amber-700 font-bold'}>({words.EnglishTranslation})</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Dictionary;