import { useEffect, useState } from "react";
import { LANGUAGE_CONTENT } from "./LanguageContent";

function FeedbackScreen({ 
  isCorrect, 
  correctAnswer, 
  miqmaqWord, 
  correctImage,
  wrongImage,
  attempts,
  onContinue, 
  onRetry, 
  language = "english"
}) {
  const [show, setShow] = useState(false);
  const content = LANGUAGE_CONTENT[language] || LANGUAGE_CONTENT.english;

  useEffect(() => {
    setTimeout(() => setShow(true), 50);
  }, []);

  const isFirstWrongAttempt = !isCorrect && attempts === 1;
  const isSecondWrongAttempt = !isCorrect && attempts === 2;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white rounded-2xl p-8 mx-4 max-w-md w-full transform transition-transform duration-300 ${show ? 'scale-100' : 'scale-90'}`}>
        <div className="text-center">
          {/* Icon - Show for all attempts */}
          <div className={`text-6xl mb-4 ${
            isCorrect ? 'text-green-500' : 'text-red-500'
          }`}>
            {isCorrect ? '✅' : '❌'}
          </div>
          
          {/* Message */}
          <h2 className={`text-2xl font-bold mb-4 ${
            isCorrect ? 'text-green-600' : 'text-red-600'
          }`}>
            {isCorrect ? content.correctMessage : content.incorrectMessage}
          </h2>
          
          {/* Word Display - Only show for second wrong attempts (not for correct answers) */}
          {isSecondWrongAttempt && (
            <p className="text-gray-800 font-semibold text-lg mb-4 border-b pb-2">
              {miqmaqWord}
            </p>
          )}
          
          {/* Image Comparison for Second Wrong Attempt */}
          {isSecondWrongAttempt && (
            <div className="mb-4">
              <p className="text-gray-600 mb-2 text-sm">{content.youSelected}:</p>
              <img 
                src={wrongImage} 
                alt="Wrong selection" 
                className="w-24 h-24 object-cover rounded-lg border-2 border-red-300 mx-auto mb-3"
              />
              <p className="text-gray-600 mb-2 text-sm">{content.correctImage}:</p>
              <img 
                src={correctImage} 
                alt="Correct answer" 
                className="w-24 h-24 object-cover rounded-lg border-2 border-green-300 mx-auto"
              />
            </div>
          )}
          
          {/* Buttons */}
          <div className="flex gap-3 justify-center mt-6">
            {isFirstWrongAttempt ? (
              // First wrong attempt - ONLY show Try Again button (orange)
              <button
                onClick={onRetry}
                className="bg-orange-500 hover:bg-orange-600 text-white font-comic py-3 px-6 rounded-lg text-lg transition-colors flex-1"
              >
                {content.tryAgain}
              </button>
            ) : (
              // Correct answer or second wrong attempt - ONLY show Continue button (green)
              <button
                onClick={onContinue}
                className="bg-green-500 hover:bg-green-600 text-white font-comic py-3 px-6 rounded-lg text-lg transition-colors flex-1"
              >
                {content.continue}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedbackScreen;