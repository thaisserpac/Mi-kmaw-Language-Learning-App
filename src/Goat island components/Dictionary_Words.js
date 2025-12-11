/**
 * Dictionary_Words.js
 *
 * Purpose:
 *   This module transforms the Questions dataset into a simplified dictionary format
 *   used by the in-game Dictionary modal. It extracts only the *correct* answer from
 *   each question and formats the data into a list of dictionary entries.
 *
 * Usage:
 *   Imported directly into Dictionary.js to populate the dictionary list.
 *
 * Author: Kimone Barrett A00454699, Mark Louis Tabudlong A00468931
 */

import { Questions } from "./questions";

export const Dictionary_Words = Questions.map(q =>{
    const correct = q.Responses.find(r => r.isCorrect);
    return {
        word: correct.Word,                    // Mi'kmaq word 
        english: q.EnglishTranslation,         // English translation 
        french: getFrenchTranslation(q.EnglishTranslation), // French translation
        img: correct.Image,
        name: correct.name,                    // English animal name
        Facts: correct.Facts,                  // English facts
        FactsFrench: correct.FactsFrench || [] // French facts
    };
});

// Helper function to translate animal names to French
function getFrenchTranslation(englishName) {
    const translations = {
        'Deer': 'Cerf',
        'Fox': 'Renard',
        'Bunny': 'Lapin',
        'Bear': 'Ours',
        'Beaver': 'Castor',
        'Moose': 'Orignal',
        'Porcupine': 'Porc-épic',
        'Raccoon': 'Raton laveur',
        'Skunk': 'Mouffette'
    };
    return translations[englishName] || englishName;
}