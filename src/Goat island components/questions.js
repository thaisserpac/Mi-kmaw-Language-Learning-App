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
 * Author: Kimone Barrett (A00454699), Mark Louis Tabudlong A00468931
 */

import Bear from "./Islandgame-images/bear.png";
import Beaver from "./Islandgame-images/beaver.png";
import Bunny from "./Islandgame-images/bunny.png";
import Deer from "./Islandgame-images/deer.png";
import Fox from "./Islandgame-images/fox.png";
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
                    "Baby deer (called fawns) have white spots to help them hide.",
                    "Deer can jump super high. Like a superhero!"
                ],
                FactsFrench: [
                    "Les cerfs de l'île aiment se promener tranquillement dans les bois pour ne pas se faire entendre.",
                    "Les bébés cerfs (appelés faons) ont des taches blanches pour les aider à se cacher.",
                    "Les cerfs peuvent sauter très haut. Comme un super-héros !"
                ]},
            {Image: Fox, isCorrect: false, name:'Fox'},
            {Image: Bunny, isCorrect: false, name:'Bunny'}
        ],
        Hint: "sune'wit",
        HintTranslation:'Fast',
        HintTranslationFrench: 'Rapide'
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
                ],
                FactsFrench: [
                    "Les renards dorment les uns sur les autres pour rester au chaud.",
                    "Les renards communiquent en utilisant plus de 20 sons différents.",
                    "Un bébé renard s'appelle un renardeau."
                ]}
        ],
        Hint: "megwe'g",
        HintTranslation: 'red',
        HintTranslationFrench: 'rouge'
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
                ],
                FactsFrench: [
                    "Les lapins aiment se cacher dans les hautes herbes autour de l'île aux Chèvres",
                    "Leurs longues oreilles les aident à entendre le danger de loin.",
                    "Ils peuvent remuer leur nez des centaines de fois pour mieux sentir les choses"
                ]},
            {Image: Deer, isCorrect: false, name: 'Deer'},
            {Image: Fox, isCorrect: false, name: 'Fox'}
        ],
        Hint: "wenaqja't",
        HintTranslation: 'hop',
        HintTranslationFrench: 'sauter'
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
                ],
                FactsFrench: [
                    "Les ours peuvent sentir la nourriture à plus de 30 km de distance",
                    "Les bébés ours restent avec leur maman pendant environ deux ans.",
                    "Les ours adorent jouer ; ils luttent et roulent tout comme vous, les enfants."
                ]},
            {Image: Deer, isCorrect: false, name: 'Deer'},
            {Image: Fox, isCorrect: false, name: 'Fox'}
        ],
        Hint: "mesgilg",
        HintTranslation:'big',
        HintTranslationFrench: 'grand'
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
                ],
                FactsFrench: [
                    "Les castors sont les bâtisseurs de la forêt. Ils construisent des barrages avec des bâtons",
                    "Leur queue plate les aide à nager comme une pagaie",
                    "Ils peuvent rester sous l'eau très longtemps. Presque 15 minutes !"
                ]}
        ],
        Hint: "gmu'j",
        HintTranslation: 'wood',
        HintTranslationFrench: 'bois'
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
                ],
                FactsFrench: [
                    "Les orignaux peuvent nager pendant des heures sans s'arrêter !",
                    "Les bois d'un orignal peuvent atteindre 1.8 mètre de largeur.",
                    "Les orignaux peuvent courir jusqu'à 56 km/h ; plus vite que la plupart des gens ne le pensent."
                ]},
            {Image: Skunk, isCorrect: false, name: 'Skunk'}
        ],
        Hint: "ugsmu'l",
        HintTranslation: 'antler',
        HintTranslationFrench: 'bois'

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
                    "Their quills are sharp, but they only use them if they feel scared.",
                    "Porcupines like to eat bark from trees. Kind of like tree chips!"
                ],
                FactsFrench: [
                    "Les porcs-épics adorent grimper aux arbres autour de l'île.",
                    "Leurs piquants sont tranchants, mais ils ne les utilisent que s'ils se sentent effrayés.",
                    "Les porcs-épics aiment manger l'écorce des arbres. Un peu comme des chips d'arbre !"
                ]}
        ],
        Hint: "gi'g",
        HintTranslation: 'sharp',
        HintTranslationFrench: 'tranchant'
    },
    {
        ID: 7,
        EnglishTranslation: 'Raccoon',
        Word: 'amaljikwej',
        Responses: [
            {Image: Raccoon, isCorrect: true, name:'Raccoon', Word: 'amaljikwej',
                Facts: [
                    "Raccoons have a mask around their eyes that makes them look sneaky.",
                    "They use their paws like little hands to open things",
                    "Raccoons explore at night, so kids don't see them often during the day."
                ],
                FactsFrench: [
                    "Les ratons laveurs ont un masque autour des yeux qui les fait paraître sournois.",
                    "Ils utilisent leurs pattes comme de petites mains pour ouvrir les choses",
                    "Les ratons laveurs explorent la nuit, donc les enfants ne les voient pas souvent pendant la journée."
                ]},
            {Image: Skunk, isCorrect: false, name:'Skunk'},
            {Image: Porcupine, isCorrect: false, name: 'Porcupine'}
        ],
        Hint: 'gimiet',
        HintTranslation: 'sneak around',
        HintTranslationFrench: 'se faufiler'
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
                ],
                FactsFrench: [
                    "Les mouffettes ont une rayure blanche qui avertit les autres de rester à l'écart.",
                    "Ils ne pulvérisent que lorsqu'ils ont peur, pas pour s'amuser",
                    "Les mouffettes adorent manger des insectes ! Délicieux pour eux, dégoûtant pour nous !"
                ]},
            {Image: Porcupine, isCorrect: false, name: 'Porcupine'}
        ],
        Hint: "jijjema'q",
        HintTranslation: 'smell bad',
        HintTranslationFrench: 'mauvaise odeur'
    }
]