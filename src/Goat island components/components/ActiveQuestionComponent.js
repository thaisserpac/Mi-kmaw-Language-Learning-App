/**
 * ActiveQuestionComponent.js
 *
 * Purpose:
 *   This component displays the answer choices for the currently active question
 *   in the Goat Island game. The answer images appear near the selected landmark
 *   and allow the user to choose which animal corresponds to the Mi'kmaq word.
 *
 * Author: Kimone Barrett A00454699
 */

export const ActiveQuestionComponent = ({activeQuestion, checkAnswers, responseY, responseX}) => {
    return (
        <div className={'absolute'} style={{top: responseY, left: responseX}}>
            <div className={'flex flex-row mt-12 -ml-10 items-center'}>
                {Array.isArray(activeQuestion.Responses) && activeQuestion.Responses.map((resp, resIndex) => (
                    <img
                        className={'cursor-pointer size-24 hover:-translate-y-6 hover:scale-105'}
                        src={resp.Image}
                        key={resIndex} alt={resp.name}
                        data-cy={resp.isCorrect ? "answer-correct-option" : "answer-option"}
                        onClick={() => checkAnswers(resp, resp.isCorrect)}/>
                ))}
            </div>
        </div>
    )
}