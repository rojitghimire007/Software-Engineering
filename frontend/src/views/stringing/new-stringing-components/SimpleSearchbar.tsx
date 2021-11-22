import React, { useState, useEffect } from 'react'
import api from 'api';

const SimpleSearchbar = ({ itemFunctions }: any) => {
    return (
        <>
            <input
                type='search'
                placeholder='pipe or fitting id'
            />
        </>
    )
}

export default SimpleSearchbar
