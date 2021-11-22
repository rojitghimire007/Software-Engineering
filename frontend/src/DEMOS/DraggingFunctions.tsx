import React from 'react'

const onDragStart = () => {
    console.log("Drag Started")
}
const onDragEnd = () => {
    console.log("Drag Ended")
}

export default {onDragEnd, onDragStart}