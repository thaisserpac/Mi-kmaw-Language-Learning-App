/**
 * Questions.js
 * Purpose:
 *      This module defines the full set of question objects used in the Goat Island
 *      Mi'kmaq Language Learning Game. Each question teaches a Mi'kmaq animal word
 *      through image-based multiple-choice activities designed for young learners (ages 5–6).
 *      The dataset includes:
 *       - The Mi'kmaq word
 *       - English translation
 *       - Three response options (one correct, two incorrect)
 *       - A hint in Mi'kmaq and English
 *       - Animal facts (3 per animal) shown as rewards for correct progress
 * Author: Kimone Barrett (A00454699)
 */

import Deer from "./Islandgame-images/deer.png";
import Fox from "./Islandgame-images/fox.png";
import Bunny from "./Islandgame-images/bunny.png";
import Bear from "./Islandgame-images/bear.png";
import Beaver from "./Islandgame-images/beaver.png";
import Moose from "./Islandgame-images/moose.png";
import Porcupine from "./Islandgame-images/porcupine.png";
import Raccoon from "./Islandgame-images/raccoon.png";
import Skunk from "./Islandgame-images/skunk.png";

export const Questions = [
    {
        ID: 0,
        EnglishTranslation: 'Deer',
        Word: 'lentuk',
        Responses: [
            {Image: Deer, isCorrect:true, name:'Deer', Word: 'lentuk',
                Facts: [
                    "Deer on the island love to walk quietly through the woods so not one hears them.",
                    "Babby deer (called fawns) have white spots to help them hide.",
                    "Deer can jump super high. Like a superhero!"
                ]},
            {Image: Fox, isCorrect: false, name:'Fox'},
            {Image: Bunny, isCorrect: false, name:'Bunny'}
        ],
        Hint: "sune'wit",
        HintTranslation:'Fast'
    },
    {
        ID: 1,
        EnglishTranslation: 'Fox',
        Word: 'wowkwis',
        Responses: [
            {Image: Deer, isCorrect: false, name:'Deer'},
            {Image: Bunny, isCorrect: false, name:'Bunny'},
            {Image: Fox, isCorrect: true, name: 'Fox', Word: 'wowkwis',
                Facts: [
                    "Foxes sleep on top of each other to stay warm.",
                    "Foxes communicate using more than 20 different sounds.",
                    "A baby fox is called a kit."
                ]}
        ],
        Hint: "megwe'g",
        HintTranslation: 'red'
    },
    {
        ID: 2,
        EnglishTranslation: 'Bunny',
        Word: "ali'kmuj",
        Responses: [
            {Image: Bunny, isCorrect: true, name: 'Bunny', Word: "ali'kmuj",
                Facts: [
                    "Bunnies like hiding in tall grass around Goat Island",
                    "Their long ears help them hear danger far away.",
                    "They can wiggle their noses hundreds of times to smell things better"
                ]},
            {Image: Deer, isCorrect: false, name: 'Deer'},
            {Image: Fox, isCorrect: false, name: 'Fox'}
        ],
        Hint: "wenaqja't",
        HintTranslation: 'hop'
    },
    {
        ID: 3,
        EnglishTranslation: 'Bear',
        Word: 'muin',
        Responses: [
            {Image: Bear, isCorrect: true, name: 'Bear', Word: 'muin',
                Facts: [
                    "Bears can smell food from over 30km away",
                    "Baby bears stay with their mon for about two years.",
                    "Bears love to play; they wrestle and roll just like you kids."
                ]},
            {Image: Deer, isCorrect: false, name: 'Deer'},
            {Image: Fox, isCorrect: false, name: 'Fox'}
        ],
        Hint: "mesgilg",
        HintTranslation:'big'
    },
    {
        ID: 4,
        EnglishTranslation: 'Beaver',
        Word: 'kopit',
        Responses: [
            {Image: Bear, isCorrect: false, name: 'Bear'},
            {Image: Deer, isCorrect: false, name: 'Deer'},
            {Image: Beaver, isCorrect: true, name: 'Beaver', Word: 'kopit',
                Facts: [
                    "Beavers are the builders of the forest. They make dams from sticks",
                    "Their flat tails helps them swim like a paddle",
                    "They can stay underwater fro a very long time. Almost 15 minutes!"
                ]}
        ],
        Hint: "gmu'j",
        HintTranslation: 'wood'
    },
    {
        ID: 5,
        EnglishTranslation: 'Moose',
        Word: "tia'm",
        Responses: [
            {Image: Porcupine, isCorrect: false, name:'Porcupine'},
            {Image: Moose, isCorrect: true, name:'Moose', Word: "tia'm",
                Facts: [
                    "Moose can swim for hours without stopping!",
                    "A moose's antlers can grow as long as 6 feet wide.",
                    "Moose can run up to 56 km/h; faster than most people think."
                ]},
            {Image: Skunk, isCorrect: false, name: 'Skunk'}
        ],
        Hint: "ugsmu'l",
        HintTranslation: 'antler'

    },
    {
        ID: 6,
        EnglishTranslation: 'Porcupine',
        Word: 'matues',
        Responses: [
            {Image: Moose, isCorrect: false, name:'Moose'},
            {Image: Skunk, isCorrect: false, name:'Skunk'},
            {Image: Porcupine, isCorrect: true, name: 'Porcupine', Word: 'matues',
                Facts: [
                    "Porcupines love to climb trees around the island.",
                    "Their quills are shark, but they only use them if they feel scared.",
                    "Porcupines like to eat bark from trees. Kind of like tree chips!"
                ]}
        ],
        Hint: "gi'g",
        HintTranslation: 'sharp'
    },
    {
        ID: 7,
        EnglishTranslation: 'Raccoon',
        Word: 'amaljikwej',
        Responses: [
            {Image: Raccoon, isCorrect: true, name:'Raccoon', Word: 'amaljikwej',
                Facts: [
                    "Raccoons have a mak around their eyes that makes them look sneaky.",
                    "They use their paws like little hands to open things",
                    "Raccoons explore at night, so kids don't see them often during the day."
                ]},
            {Image: Skunk, isCorrect: false, name:'Skunk'},
            {Image: Porcupine, isCorrect: false, name: 'Porcupine'}
        ],
        Hint: 'gimiet',
        HintTranslation: 'sneak around'
    },
    {
        ID: 8,
        EnglishTranslation: 'Skunk',
        Word: 'apikjilu',
        Responses: [
            {Image: Moose, isCorrect: false, name:'Moose'},
            {Image: Skunk, isCorrect: true, name:'Skunk', Word: 'apikjilu',
                Facts: [
                    "Skunks have a white stripe that warms others to stay back.",
                    "They only spray when they're scared, not for fun",
                    "Skunks love to eat bugs! Yummy to them, nasty to us!"
                ]},
            {Image: Porcupine, isCorrect: false, name: 'Porcupine'}
        ],
        Hint: "jijjema'q",
        HintTranslation: 'smell bad'
    }
]