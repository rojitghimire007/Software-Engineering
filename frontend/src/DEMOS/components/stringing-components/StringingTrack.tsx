import React from 'react'

const StringingTrack = ({ name }: any) => {
    return (
        <>
            {name != '' ?
                <div style={{ textTransform: 'uppercase', backgroundColor: 'rgba(200,200,200,1)', width: '100%', height: '540px' }}>
                    {name} Track Item Here
                </div>
                :
                null // Don't Render!
            }
        </>
    )
}

export default StringingTrack
