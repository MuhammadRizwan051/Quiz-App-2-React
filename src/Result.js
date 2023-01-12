import React from 'react'
import { Box, Typography } from '@mui/material'
import tickImage from './tickImage.png'


function Result(props) {
    let { score, quizLength } = props

    let percentage = (score * 100) / quizLength
    return (
        <>
            <Box sx={{ backgroundColor: 'white', height: '20%', width: '20%', border: '1px solid black', borderRadius: 5 }}>
                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {percentage >= 40 ?
                        <Typography sx={{ fontSize: 40, textAlign: 'center', color:'green', fontWeight:'bold' }}>Passed</Typography>
                        :
                        <Typography sx={{ fontSize: 40, textAlign: 'center', color:'crimson', fontWeight:'bold' }}>Fail</Typography>
                    }
                </Box>
                <Typography sx={{ fontSize: 20, paddingX: 3 }}>Score: {score}</Typography>
                <Typography sx={{ fontSize: 20, paddingX: 3 }}>Percentage: {percentage} %</Typography>
            </Box>
        </>
    )
}

export default Result