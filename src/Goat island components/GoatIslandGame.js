import Background from "./Islandgame-images/Island.png";
import BackgroundGameOver from './Islandgame-images/GameOverBackground.png';
import IslandBackground from './Islandgame-images/StartScreenBackground.png';
import StartFlag from "./Islandgame-images/Start-removebg-preview.png";
import Scroll from "./Islandgame-images/DictionaryBackground.png";
import {Landmarks} from "./landmarks";
import {Questions} from "./questions";
import {useState} from "react";
import Dictionary from "./dictionary";
import {GiScrollQuill} from "react-icons/gi";
import {GiTiedScroll} from "react-icons/gi";
import {IoIosClose} from "react-icons/io";
import Boy from './Islandgame-images/boy.png';
import Girl from './Islandgame-images/girl.png';
import CheckMark from './Islandgame-images/checkmark.png';

const GoatIslandGame = () =>{
    const [shuffledArray, setShuffledArray] = useState(()=>shuffleQuestions(Questions));
    const [completedLandmarks, setCompletedLandmarks] = useState(new Array(Landmarks.length).fill(false));
    const nextIndex = completedLandmarks.findIndex(isCompleted=>isCompleted===false);

    const [currentQuestion, setCurrentQuestion] = useState(null); //Gets the current question clicked
    const [answeredCorrectly, setAnsweredCorrectly] = useState(false); //Checks if the question has been answered
    const [showRemainingAttempts, setShowRemainingAttempts] = useState(null);

    const isCompleted= nextIndex === -1 && shuffledArray.length>0;

    const isGameOver = isCompleted || currentQuestion?.isGameOverDueToFailure;
    const [gameStarted, setGameStarted] = useState(false)
    // Track user attempts and count score
    const [attempts, setAttempts] = useState(0);
    const [score, setScore] = useState(0);

    const [numHints,setNumHints] = useState(0);
    const [showHints, setShowHint] = useState(null);
    const [noHints, setNoHints] = useState(null);

    const [openModal, setOpenModal] = useState(false);

    const maxHints = 3;
    const [showTranslation, setShowTranslation] = useState(false);
    const maxAttempts = 2;

    // Unlock Dictionary Word
    const [showImage, setShowImage] = useState([]);

    const handleMouseOver = () =>{
        setShowTranslation(true);
    }
    const handleMouseOut = () => {
        setShowTranslation(false);
    }

    function shuffleQuestions(array){
        const shuffled = [...array];
        let currentIndex = shuffled.length;
        let randomIndex;

        while(currentIndex !==0){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
        }
        return shuffled;
    }

    function handleImageClick(index){
        const questionData = shuffledArray[nextIndex];
        const landmark = Landmarks[index];

        setCurrentQuestion({
            question: questionData,
            x: landmark.x,
            y: landmark.y,
            activeIndex: nextIndex
        });
        setAnsweredCorrectly(false);
    }

    // Checks the correct answers
    function checkAnswers(response, isCorrect){
        if(isCorrect){
            const index = currentQuestion.activeIndex
            setCompletedLandmarks(prevState => {
                const completed = [...prevState];
                completed[index] = true;
                return completed;
            });

            const isLastQuestion = index === Landmarks.length - 1;

            setAnsweredCorrectly(true);
            setCurrentQuestion(null);
            setAttempts(0);
            setScore(prevScore => prevScore+1);
            // if the answer is correct display the image in the dictionary
            // use the name of the image to match it in the word bank file
            console.log("response in checkAnswers:", response);
            setShowImage( prev => [...prev, response]);
            console.log(showImage);

            if(isLastQuestion){
                setAnsweredCorrectly(true);
            }
        }else{
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            if(attempts>=maxAttempts){
                setCurrentQuestion({isGameOverDueToFailure:true})
                setShowRemainingAttempts(null)
            }else{
                setShowRemainingAttempts(maxAttempts - newAttempts);
            }
        }
    }

    function handleCorrectAnswerContinue(){
        setAnsweredCorrectly(null);

        if(nextIndex === -1){
            setAnsweredCorrectly(true);
        }
    }

    // Current active question
    const activeQuestion = currentQuestion != null ?
        currentQuestion.question :
        null

    // Current active index
    const activeIndex = currentQuestion?.activeIndex

    // Stores the X and Y positions of the choices
    const responseY = currentQuestion?.y || 0;
    const responseX = currentQuestion?.x || 0;

    function resetGame(){
        setCompletedLandmarks(new Array(Landmarks.length).fill(false));
        setShuffledArray(()=>shuffleQuestions(Questions));
        setAnsweredCorrectly(false);
        setCurrentQuestion(null);
        setScore(0);
        setAttempts(0);
        setNumHints(0);
        setShowRemainingAttempts(false);
        setGameStarted(false);
        setShowImage([]);
    }

    function startGame(){
        setGameStarted(true);
        setNumHints(maxHints);
        setShowHint(null);
    }

    function getHint(){
        setShowRemainingAttempts(false);
        setNumHints(numHints - 1);

        if(numHints <= 0){
            setShowHint(false);
            setNoHints(true);
        } else{
            setShowHint(true);
        }
    }

    if(openModal){
        return (
            <div className={'animate-fadeIn z-30'}>
                <Dictionary CloseModal={() => setOpenModal(false)} response={showImage}/>
            </div>
        )
    }

    return (
        <div className={'h-screen w-full flex absolute inset-0 items-center justify-center bg-cover bg-center bg-no-repeat object-fill'} style={{backgroundImage: `url(${Background})`}}>
            {/*DICTIONARY*/}
            <div className={'inset-0 absolute'}>
                {/*<button onClick={()=>setOpenModal(true)}>Open</button>*/}
                <GiScrollQuill className={'cursor-pointer size-24 text-yellow-600'} onClick={()=>setOpenModal(true)}/>
                <div className={'flex flex-row gap-3'}>
                    {Array.from({length:Math.min(numHints,maxHints)},(_,index)=>(
                        <GiTiedScroll className={'size-12 '} key={index}/>
                    ))}
                </div>
            </div>
            {/*DISPLAY LANDMARKS or GAME OVER PAGE*/}
            {isGameOver || attempts >= maxAttempts  ? (
                <>
                    <div className={'inset-0 absolute bg-black bg-opacity-20 backdrop-blur-md'}></div>
                    <div className={'w-[70vw] h-[70vh] shadow-cyan-400 bg-cover bg-center bg-no-repeat z-10'}
                         style={{backgroundImage: `url(${BackgroundGameOver})`}}>
                        <div className={'flex flex-col gap-6 items-center'}>
                            <div className={'text-center text-3xl font-black'}>
                                {isCompleted ? (
                                    <p>Game Completed</p>
                                ): (
                                    <p>Game Over</p>
                                )}
                            </div>
                            <div className={'flex flex-col text-center text-xl font-bold'}>
                                {isCompleted ? (
                                    <p>You answered all the questions</p>
                                ) : (
                                    <p className={'flex items-center gap-1'}>You ran out of attempts. Check out dictionary
                                        <span className={'inline-flex items-center justify-center'}>
                                            <GiScrollQuill onClick={()=>setOpenModal(true)} className={'cursor-pointer hover:scale-105'}/></span></p>
                                )}
                            </div>
                            <div className={'text-center text-4xl font-black'}>
                                <h2>Score <br/> {score}/{Landmarks.length}</h2>
                            </div>

                            <div className={'flex flex-col gap-3 ml-72 mr-72 mt-4'}>
                                <button onClick={resetGame} className={'rounded-full bg-amber-700 pl-10 pr-10 pt-2 pb-2 text-lg font-semibold border-4 border-solid border-amber-900 hover:scale-105'}>Play Again</button>
                                {/*<button onClick={handleSwitchGame} className={'rounded-full bg-amber-800 pl-10 pr-10 pt-2 pb-2 text-lg font-semibold'}>Home</button>*/}
                                <button className={'font-semibold text-lg bg-amber-600 pl-10 pr-10 pt-2 pb-2 rounded-full border-4 border-solid border-amber-900 hover:scale-105'}>View Rewards</button>
                            </div>
                        </div>
                    </div>
                </>
            ): !gameStarted ?(
                <>
                    <div className={'text-center right-96 top-6 fixed text-3xl font-bold font-comic'}>
                        <p>Eskasoni Goat Island <br/>Game</p>
                    </div>
                    <div onClick={startGame}
                         className={'size-96 absolute top-20 left-10 hover:scale-105 cursor-pointer bg-center bg-cover bg-no-repeat'}
                         style={{backgroundImage: `url(${StartFlag})`}}>
                    </div>
                </>
            ):(
                <>
                    {/*(currentQuestion && currentQuestion.activeIndex===index)? 'visible': 'hidden'*/}
                    {Landmarks.map((landmark, index)=>(
                        <div key={index}>
                            <div className={`size-24 absolute bg-center bg-cover bg-no-repeat hover:scale-105
                                 ${activeIndex===index ?'':(currentQuestion || index !==nextIndex ? 'cursor-not-allowed':'hover:cursor-pointer')}`}
                                 style={{backgroundImage:`url(${completedLandmarks[index] ? CheckMark : landmark.Img})`, top:landmark.y, left: landmark.x,
                                     visibility:(currentQuestion) ? 'hidden': (index === nextIndex || completedLandmarks[index])? 'visible': 'hidden'}}
                                 onClick={currentQuestion || index !== nextIndex ? null:()=>handleImageClick(index)}>
                            </div>
                        </div>
                    ))}
                    {/*CONTAINER FOR QUESTIONS*/}
                    {activeQuestion === null ?
                        (
                            <div className={'right-64 top-10 fixed text-3xl font-bold font-comic'}>
                                <h2>Click Landmark to start</h2>
                            </div>
                        ) : (
                            <div className={'right-96 top-6 fixed text-3xl font-bold font-comic'}>
                                <h2>Question: {activeQuestion.Word}</h2>
                            </div>
                        )
                    }
                    {/*CONTAINER FOR RESPONSES*/}
                    {activeQuestion && (
                        <div className={'absolute'} style={{top:responseY, left:responseX}}>
                            <div className={'flex flex-row mt-12 -ml-10 items-center'}>
                                {Array.isArray(activeQuestion.Responses) && activeQuestion.Responses.map((resp, resIndex)=>(
                                    <img className={'cursor-pointer size-24 hover:-translate-y-6 hover:scale-105'} src={resp.Image} key={resIndex} alt={resp.name} onClick={()=>checkAnswers(resp, resp.isCorrect)}/>
                                ))}
                            </div>
                        </div>
                    )}
                    {answeredCorrectly &&(
                        <div className={'h-screen w-screen justify-center items-center inset-0 absolute flex'}>
                            <div className={'inset-0 absolute z-0 w-full h-screen bg-center bg-no-repeat bg-cover'} style={{backgroundImage: `url(${IslandBackground})`}}></div>
                            <img src={Boy} alt={'Boy'} className={'size-96 left-10 absolute'}/>
                            <div className={'absolute w-full h-full flex flex-col gap-3 text-center items-center justify-center content-center rounded-md z-10 p-8 bg-center bg-cover bg-no-repeat'}>
                                <img src={Scroll} alt={'Scroll Background'} className={'absolute object-center  h-3/5'} style={{transform:'rotate(90deg)', transformOrigin:'center center'}}/>
                                <p className={'z-20 mt-1 text-yellow-900 font-bold'}>Correct!<br/> You've unlocked a new word!
                                    <br/><span className={'font-medium'}>Check it out in the dictionary</span><br/>
                                    <span><GiScrollQuill className={'size-8 cursor-pointer items-center hover:scale-105'}
                                                         onClick={()=> setOpenModal(true)}/></span></p>
                                <button className={'cursor-pointer font-medium z-20 bg-amber-800 rounded-full px-4 py-2 border-2 border-solid border-amber-900 shadow-lg shadow-amber-950 hover:scale-105'}
                                        onClick={handleCorrectAnswerContinue}>Next Question</button>
                            </div>
                        </div>
                    )}
                    {showRemainingAttempts &&(
                        <div className={'absolute inset-0 flex w-full h-screen justify-center items-center'}>
                            <div className={'inset-0 absolute w-full h-screen  z-0 bg-no-repeat bg-cover bg-center'} style={{backgroundImage: `url(${IslandBackground})`}}></div>
                            <img src={Girl} alt={'Girl'} className={'absolute left-10 size-96'}/>
                            <div className={'relative w-full h-full gap-3 flex flex-col content-center items-center justify-center rounded-lg  z-10 bg-center bg-cover bg-no-repeat'}>
                                <img src={Scroll} alt={'Scroll'} className={'absolute object-center h-3/5'} style={{transform:'rotate(90deg)', transformOrigin:'center center'}}/>
                                <p className={'text-lg font-bold z-20 text-yellow-900 text-center ml-12 mr-14'}>Oops<br/>You have {showRemainingAttempts} attempt remaining!</p>
                                <div className={'flex flex-row gap-4'}>
                                    <button className={'text-sm font-bold z-20 cursor-pointer bg-amber-600 border-2 border-solid border-amber-700 rounded-full px-4 py-2 shadow-lg shadow-amber-800 hover:scale-105'}
                                            onClick={getHint}>Get Hint</button>
                                    <button className={'cursor-pointer bg-amber-800 border-2 border-solid border-amber-900  font-bold text-sm rounded-full px-2 py-1 z-10 shadow-lg shadow-amber-950 hover:scale-105'}
                                            onClick={()=>setShowRemainingAttempts(null)}>Try Again</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {showHints &&(
                        <div className={'absolute inset-0 flex w-full h-screen justify-center items-center'}>
                            <div className={'inset-0 absolute z-0 w-full h-screen bg-center bg-no-repeat bg-cover'} style={{backgroundImage: `url(${IslandBackground})`}}></div>
                            <img src={Girl} alt={'Girl'} className={'size-96 left-24 absolute'}/>
                            <div className={'flex flex-col rounded-md w-72 h-24 items-center justify-center text-center relative bg-center bg-cover bg-no-repeat'}>
                                <img src={Scroll} alt={'Scroll'} className={'absolute object-center'}/>
                                <div className={'z-20'}>
                                    <span className={'flex flex-row gap-3 items-center -mt-10 text-yellow-900'}>
                                        <h1 className={'text-lg font-medium font-comic'}>Hints</h1>
                                        <IoIosClose className={'cursor-pointer'} onClick={()=>setShowHint(null)}/>
                                    </span>
                                </div>
                                <div className={'ml-24 mr-24 z-20 flex flex-col gap-5 text-yellow-900 font-comic'}>
                                    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                                        <p className={'text-base font-bold cursor-pointer'}>{activeQuestion.Hint}</p>
                                        {showTranslation && activeQuestion.EnglishTranslation &&(
                                            <p className={'text-sm italic'}>{activeQuestion.HintTranslation}</p>
                                        )}
                                    </div>

                                    <p className={'text-sm'}>You have {numHints} hints remaining</p>
                                </div>

                            </div>
                        </div>
                    )}
                    {noHints &&(
                        <div className={'absolute inset-0 flex w-full h-screen justify-center items-center'}>
                            <div className={'inset-0 absolute z-0 w-full h-screen bg-center bg-no-repeat bg-cover'} style={{backgroundImage: `url(${IslandBackground})`}}></div>
                            <div className={'flex flex-col rounded-md w-64 h-20 items-center relative bg-center bg-cover bg-no-repeat'}>
                                <img src={Scroll} alt={'Scroll'} className={'absolute object-center inset-0'}/>
                                <div className={'z-10'}>
                                    <span className={'flex flex-row  gap-6 items-center mt-12 text-yellow-900'}>
                                        <h1 className={'text-lg font-medium font-comic'}>Hints</h1>
                                        <IoIosClose className={'cursor-pointer'} onClick={()=>setNoHints(null)}/>
                                    </span>
                                </div>
                                <div className={'ml-24 mr-24 z-20'}>
                                    <p className={'text-sm text-yellow-900'}>You have 0 hints remaining</p>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default GoatIslandGame;
