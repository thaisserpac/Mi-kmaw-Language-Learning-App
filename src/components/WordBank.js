/**
 * WordBank.js
 * 
 * Purpose: Provides a structured data set of Mi'kmaq words with corresponding translations,
 *          audio files, and images for use in a language learning game. This module also
 *          exports processed data structures for easy integration with other components.
 * 
 * Author(s): Aaron Gonsalves, Preksha Joon
 * Assisted by: ChatGPT (Documentation assistance + Data Transformation)
 * 
 * COTS Used:
 * - Local assets: Images and audio files representing Mi'kmaq words.
 */

// Import audio files and images for Mi'kmaq words
import ninAudio from "./audio/ni'n.mp3";
import ninImage from "./images/me.png";

import kilAudio from "./audio/ki'l.mp3";
import kilImage from "./images/you.png";

import nemituAudio from "./audio/nemitu.mp3";
import nemituImage from "./images/my_name_is.png";

import tataAudio from "./audio/ta'ta.mp3";
import tataImage from "./images/dad.png";

import ltuAudio from "./audio/l'tu.mp3";
import ltuImage from "./images/create.png";

import elieyAudio from "./audio/eliey.mp3";
import elieyImage from "./images/im_going.png";

import wiktmAudio from "./audio/wiktm.mp3";
import wiktmImage from "./images/i_enjoy.png";

import teluisiAudio from "./audio/teluisi.mp3";
import teluisiImage from "./images/my_name_is.png";

import mijisiAudio from "./audio/mijisi.mp3";
import mijisiImage from "./images/eat.png";

import aqqAudio from "./audio/aqq.mp3";
import aqqImage from "./images/aqq.jpeg";

import wejieyAudio from "./audio/wejiey.mp3";
import wejieyImage from "./images/wejiey.i_am_coming_from.png";

import kesalkAudio from "./audio/kesalk.mp3";
import kesalkImage from "./images/i_love.png";

import kesatmAudio from "./audio/kesatm.mp3";
import kesatmImage from "./images/Good.png";

import kijuAudio from "./audio/kiju'.mp3";
import kijuImage from "./images/Mother_or_Grandmother.png";

import nekmAudio from "./audio/nekm.mp3";
import nekmImage from "./images/him_or_her.png";

import alatuAudio from "./audio/ala'tu.mp3";
import alatuImage from "./images/I_Have_it.png";

import ulaAudio from "./audio/ula.mp3";
import ulaImage from "./images/ula.png";

import kesalulAudio from "./audio/kesalul.mp3";
import kesalulImage from "./images/i_love_you.png";

import weltasiAudio from "./audio/welta'si.mp3";
import weltasiImage from "./images/I_Am_Happy.png";

import wenAudio from "./audio/wen.mp3";
import wenImage from "./images/Who.png";

/**
 * allWords
 * 
 * Purpose: Represents a collection of Mi'kmaq words, each with its English and French translations,
 *          associated image, and audio file.
 */
const ALL_WORDS = [
  { word: "ni'n", english: "I", french: "je", image: ninImage, audio: ninAudio },
  { word: "ki'l", english: "you", french: "tu", image: kilImage, audio: kilAudio },
  { word: "teluisi", english: "My name is...", french: "Je m'appelle...", image: teluisiImage, audio: teluisiAudio },
  { word: "aqq", english: "and", french: "et", image: aqqImage, audio: aqqAudio },
  { word: "mijisi", english: "eat", french: "manger", image: mijisiImage, audio: mijisiAudio },
  { word: "wiktm", english: "I like the taste of it.", french: "J'aime le goût.", image: wiktmImage, audio: wiktmAudio },
  { word: "kesalk", english: "I love", french: "j'aime", image: kesalkImage, audio: kesalkAudio },
  { word: "l'tu", english: "Make it.", french: "Fais-le.", image: ltuImage, audio: ltuAudio },
  { word: "eliey", english: "I am going.", french: "Je vais.", image: elieyImage, audio: elieyAudio },
  { word: "nemitu", english: "I see it", french: "je le vois", image: nemituImage, audio: nemituAudio },
  { word: "kesatm", english: "I like", french: "j'aime", image: kesatmImage, audio: kesatmAudio },
  { word: "wejiey", english: "I am coming from", french: "je viens de", image: wejieyImage, audio: wejieyAudio },
  { word: "ta'ta", english: "Dad", french: "papa", image: tataImage, audio: tataAudio },
  { word: "kiju'", english: "Mother or Grandmother", french: "mère ou grand-mère", image: kijuImage, audio: kijuAudio },
  { word: "nekm", english: "Him or Her", french: "lui ou elle", image: nekmImage, audio: nekmAudio },
  { word: "ala'tu", english: "I have it", french: "je l'ai", image: alatuImage, audio: alatuAudio },
  { word: "ula", english: "Look at this", french: "regarde ça", image: ulaImage, audio: ulaAudio },
  { word: "kesalul", english: "I love you", french: "je t'aime", image: kesalulImage, audio: kesalulAudio },
  { word: "welta'si", english: "I am happy", french: "je suis heureux", image: weltasiImage, audio: weltasiAudio },
  { word: "wen", english: "Who", french: "qui", image: wenImage, audio: wenAudio }
];

/**
 * WORD_INFO
 * 
 * Purpose: Transforms the `ALL_WORDS` array into a simplified structure containing only
 *          the word text, associated image, and audio file for use in the game.
 */
const WORD_INFO = ALL_WORDS.map(item => ({
  text: item.word,
  image: item.image,
  audio: item.audio
}));

/**
 * WORDS
 * 
 * Purpose: Transforms the `ALL_WORDS` array into a structure containing the word text
 *          with both English and French translations for use in the dictionary.
 */
const WORDS = ALL_WORDS.map(item => ({
  mikmaq: item.word,
  english: item.english,
  french: item.french
}));

// Export the processed data structures for use in other components
export { WORD_INFO, WORDS as words };
