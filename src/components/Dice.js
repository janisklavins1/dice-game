import React from 'react'

const Dice = (props) => {

    return (
        <div className='dice-container'>
            <div className={`dice-box ${ props.clicked ? 'clicked' : ''}`} onClick={() => props.clickItem()}>
                <p className='dice-number'>{props.value}</p>
            </div>
        </div>
    )
}

export default Dice