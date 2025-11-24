import DictionaryBackground from "./Islandgame-images/DictionaryBackground.png";
import Background from './Islandgame-images/StartScreenBackground.png';
import {motion} from "framer-motion";
import {ISLAND_GAME_WORDS} from './wordBank';
import {IoClose} from "react-icons/io5";
import {useState} from "react";

const Dictionary = ({CloseModal, response}) =>{
    const [showWord, setShowWord] = useState(null);

    function toggleImage(index){
        setShowWord(showWord === index ? null : index);
    }

    return (
        <div className={'fixed inset-0 flex items-center justify-center z-10 bg-black bg-center bg-cover bg-no-repeat'} style={{backgroundImage: `url(${Background})`}}>
            <motion.div className={'relative origin-bottom p-10 md:w-2/3 lg:w-1/2 h-[85vh]'}
                        initial={{scaleX:0 }} animate={{scaleX:1}}
                        exit={{scaleX:0}}
                        transition={{duration:0.8,ease:"easeOut"}}>
                <img src={DictionaryBackground} alt={'Dictionary Background'}
                     className={'absolute inset-0 w-full h-full object-fill z-0'}
                     style={{transform: 'rotate(90deg) scale(1.6)', transformOrigin:'center center'}}/>
                <div className={'z-10 relative flex flex-col h-full gap-1 justify-around'}>
                    <div className={'flex gap-6 content-center items-center justify-center text-3xl font-bold text-yellow-900 font-serif mb-1'}>
                        <h2>🏝️Island Dictionary</h2><span onClick={CloseModal} className={'cursor-pointer'}><IoClose/></span>
                    </div>
                    <p className={'text-center font-bold text-lg text-yellow-900'}>Animals of the Island 🦌</p>
                    <div>
                        {response === null ?(
                            <div className={'grid grid-cols-3 gap-y-1 justify-items-center'}>
                                {ISLAND_GAME_WORDS.map((words, idx)=>(
                                    <div key={idx} className={'flex-col relative items-center space-x-2 mb-10 inline-block'}>
                                        <img src={words.img} alt={words.name}
                                             className={'size-16 relative cursor-pointer hover:-translate-y-2 -top-5'}
                                             onClick={() => toggleImage(idx)}/>
                                        {showWord === idx && (
                                            <div className={'flex flex-col text-center absolute gap-0 top-11'}>
                                                <p className={'text-lg text-yellow-900 font-bold'}>{words.word}</p>
                                                <p className={'text-sm text-yellow-900 font-semibold'}>({words.EnglishTranslation})</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={'grid grid-cols-3 gap-y-1 justify-items-center'}>
                                {ISLAND_GAME_WORDS.map((words, index)=> {
                                    const displayImage = response.some(ans=> ans.Word === words.word);
                                    return (
                                        <div key={index} className={`flex-col relative items-center space-x-2 mb-10 ${displayImage ? "inline-block": "hidden"}`}>
                                            {displayImage && (
                                                <div className={'inline-block relative'}>
                                                    <img src={words.img} alt={words.name}
                                                         className={'w-16 h-16 relative cursor-pointer hover:-translate-y-2'}
                                                         onClick={() => toggleImage(index)}/>
                                                    {showWord === index && (
                                                        <div className={'flex flex-col text-center absolute top-full gap-0'}>
                                                            <p className={'text-lg text-yellow-900 font-bold'}>{words.word}</p>
                                                            <p className={'text-sm text-yellow-900 '}>({words.EnglishTranslation})</p>
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

export default Dictionary