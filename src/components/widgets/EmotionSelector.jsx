import React, { useState } from "react";

import face_bw_1 from '../../images/emojis/1.png';
import face_bw_2 from '../../images/emojis/2.png';
import face_bw_3 from '../../images/emojis/3.png';
import face_bw_4 from '../../images/emojis/4.png';
import face_bw_5 from '../../images/emojis/5.png';

import face_1 from '../../images/emojis/1-c.png';
import face_2 from '../../images/emojis/2-c.png';
import face_3 from '../../images/emojis/3-c.png';
import face_4 from '../../images/emojis/4-c.png';
import face_5 from '../../images/emojis/5-c.png';

const faces = [
    [face_bw_1, face_1],
    [face_bw_2, face_2],
    [face_bw_3, face_3],
    [face_bw_4, face_4],
    [face_bw_5, face_5],
]

const EmotionSelector = ({ emotionCodeInput, changeEmotionCallback, detailMode }) => {
    /*
    The provision of the boolen 'detailMode' feels like I'm introducing
    quite a bit of coupling here. I'm not entirely sure if there's a 
    better way of doing this.
    */
    
    const EmojiButtonStyle = {
        "padding-left": "8px",
        "padding-right": "8px",
        "padding-top": "0px",
        "padding-bottom": "8px",
        width: "40px"
    };

    const EmojiButtonSmallStyle = {
        width: "15px"
    };

    const emotionCodes = [1, 2, 3, 4, 5];
    const [chosenEmotionCode, setEmotionCode] = useState(emotionCodeInput);

    const onButtonClick = async (clickedEmotionCode) => {

        const newEmotionCode = (clickedEmotionCode === chosenEmotionCode) ? 0 : clickedEmotionCode;
        await changeEmotionCallback(newEmotionCode);
        setEmotionCode(newEmotionCode);
    }

    return (
        <div>
            {
                (detailMode && (emotionCodes.includes(chosenEmotionCode))) ? 
                (<div><p className="user-emotion-text">I feel </p><img 
                style={EmojiButtonSmallStyle} src={faces[chosenEmotionCode - 1][1]} alt={chosenEmotionCode} /></div>)

                : emotionCodes.map( (i) =>
                <img onClick={() => onButtonClick(i)} 
                    style={EmojiButtonStyle} src={faces[i - 1][chosenEmotionCode === i ? 1 : 0]} alt={i} />)
            }
        </div>
    );
}

export default EmotionSelector;