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
            {Image: Deer, isCorrect:true, name:'Deer', Word: 'lentuk'},
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
            {Image: Fox, isCorrect: true, name: 'Fox', Word: 'wowkwis'}
        ],
        Hint: "megwe'g",
        HintTranslation: 'red'
    },
    {
        ID: 2,
        EnglishTranslation: 'Bunny',
        Word: "ali'kmuj",
        Responses: [
            {Image: Bunny, isCorrect: true, name: 'Bunny', Word: "ali'kmuj",},
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
            {Image: Bear, isCorrect: true, name: 'Bear', Word: 'muin'},
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
            {Image: Beaver, isCorrect: true, name: 'Beaver', Word: 'kopit'}
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
            {Image: Moose, isCorrect: true, name:'Moose', Word: "tia'm"},
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
            {Image: Porcupine, isCorrect: true, name: 'Porcupine', Word: 'matues'}
        ],
        Hint: "gi'g",
        HintTranslation: 'sharp'
    },
    {
        ID: 7,
        EnglishTranslation: 'Raccoon',
        Word: 'amaljikwej',
        Responses: [
            {Image: Raccoon, isCorrect: true, name:'Raccoon', Word: 'amaljikwej'},
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
            {Image: Skunk, isCorrect: true, name:'Skunk', Word: 'apikjilu'},
            {Image: Porcupine, isCorrect: false, name: 'Porcupine'}
        ],
        Hint: "jijjema'q",
        HintTranslation: 'smell bad'
    }
]