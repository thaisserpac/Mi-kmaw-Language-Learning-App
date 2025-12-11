/**
 * QuestionHeader.js
 *
 * Purpose:
 *   This component displays the header text at the top of the game screen.
 *   It shows either the Mi'kmaq word for the current question or a prompt
 *   instructing the player to click a landmark to begin.
 *
 * Author: Kimone Barrett A00454699
 */

export const QuestionHeader = ({currentQuestion, content}) =>{
    return (
        <div className={'absolute top-0 text-3xl font-bold items-center'}>
            {currentQuestion
                ? <h2>{content.question}: {currentQuestion.Word}</h2>
                : content.clickLandmark
            }
        </div>
    )
}