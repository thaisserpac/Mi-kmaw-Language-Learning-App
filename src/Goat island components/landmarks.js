/**
 * Landmarks.js
 *
 * Purpose:
 *   This module defines the list of landmark locations used in the Goat Island
 *   Mi'kmaq Language Learning Game. Each landmark represents an activity or cultural
 *   location on Goat Island (e.g., Drum Making, Basket Weaving, Kayaking), and acts
 *   as a clickable point where a new vocabulary question is triggered.
 *
 *
 * Notes:
 *   - Landmarks determine the progression order of questions.
 *   - Coordinates (x, y) position each landmark on the map background image.
 *   - These values are used by components such as:
 *        - GoatIslandGame (main gameplay)
 *        - ActiveQuestionComponent (activates when a landmark is clicked)
 *        - Cypress E2E tests (selecting visible landmarks)
 *
 * Gameplay Role:
 *   Players click landmarks to answer vocabulary questions. Completed landmarks
 *   are visually replaced with a checkmark to track progress. This structure
 *   ensures an intuitive, map-based learning experience suitable for early learners.
 *
 * Author: Kimone Barrett A00454699
 */

import Basket from './Islandgame-images/basketmaking.png';
import Bread from './Islandgame-images/breadmaking.png';
import Dance from './Islandgame-images/dance.png';
import Drum from './Islandgame-images/drum.png';
import ChildrenArea from './Islandgame-images/childrensarea.png';
import Garden from './Islandgame-images/garden.png';
import Kayak from './Islandgame-images/kayak.png';
import HuntingAndFishing from './Islandgame-images/huntingandfishing.png';
import Photos from './Islandgame-images/photos.png';

export const Landmarks = [
    {
        questIndex: 0,
        name: "Dance",
        Img: Dance,
        x: "20%",
        y: "35%"
    },
    {
        questIndex: 1,
        name: "Basket",
        Img: Basket,
        x: "35%",
        y: "50%"
    },
    {
        questIndex: 2,
        name: "Photo",
        Img: Photos,
        x: "55%",
        y: "45%"
    },
    {
        questIndex: 3,
        name: "Bread",
        Img: Bread,
        x: "75%",
        y: "40%"
    },
    {
        questIndex: 4,
        name: "Drum",
        Img: Drum,
        x: "65%",
        y: "59%"
    },
    {
        questIndex: 5,
        name: 'HuntingAndFishing',
        Img: HuntingAndFishing,
        x: "50%",
        y:"70%"
    },
    {
        questIndex: 6,
        name: 'Kayak',
        Img: Kayak,
        x: "30%",
        y:"75%"
    },
    {
        questIndex: 7,
        name: 'ChildrenArea',
        Img: ChildrenArea,
        x: "8%",
        y:"75%"
    },
    {
        questIndex: 8,
        name: 'Garden',
        Img: Garden,
        x: "5%",
        y:"50%"
    }
]