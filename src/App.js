import './App.css';
import { Box, Button, Grid, LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import StarIcon from "@mui/icons-material/Star";
import Result from './Result';


function App() {
  let [indexNumber, setIndexNumber] = useState(0)
  let [nextBtn, setNextBtn] = useState(true)
  let [score, setScore] = useState(0)
  let [color, setColor] = useState('')
  let [bgColor, setBgColor] = useState('')
  let [status, setStatus] = useState('')
  let [showResult, setShowResult] = useState(false)
  let [showOptions, setShowOptions] = useState(false)
  let [userOptions, setUserOptions] = useState('')


  let [questions, setQuestions] = useState([
    {
      question: "HTML Stands For _______________________",
      incorrect_answers: [
        "Hyper Text Makeup Language",
        "html",
        "Case Cading Style Sheet",
        "Hypertext markup language",
      ],
      correct_answer: "Hypertext markup language",
    },
    {
      question: "CSS Stands For _______________________",
      incorrect_answers: [
        "Casecading Style Sheet",
        "Java",
        "Ram",
        "Hypertext markup language",
      ],
      correct_answer: "Casecading Style Sheet",
    },
    {
      question: "JS Stands For _______________________",
      incorrect_answers: ["Java Style", "Java Script", "Script", "Script Src"],
      correct_answer: "Java Script",
    },
    {
      question: "DOM Stands For _______________________",
      incorrect_answers: ["Document Object Model", "html", "Css", "Java"],
      correct_answer: "Document Object Model",
    },
    {
      question: "RAM Stands For _______________________",
      incorrect_answers: ["Read Only Memory", "Dom", "Random Acccess Memory", "For Pc"],
      correct_answer: "Random Acccess Memory",
    }
  ])


  let checkQuestion = (a, b) => {
    setUserOptions(a)
    if (a === b) {
      setShowOptions(true)
      setScore(score + 1)
      console.log(score)
      setColor('white')
      setBgColor('#2ECC71')
      setStatus('Correct!')
    }
    else {
      setShowOptions(true)
      setStatus('Sorry!')
      setColor('white')
      setBgColor('#FD3832')
    }
  }

  let next = () => {
    setShowOptions(false)
    console.log('first')
    setColor('')
    setBgColor('')
    setStatus('')
    if (indexNumber + 1 === questions.length) {
      setNextBtn(false)
      setShowResult(true)
    }
    else {
      setIndexNumber(indexNumber + 1)
      setShowResult(false)
    }
  }

  let givenSeconds = 10;

  let [miliSec, setMiliSec] = useState(0);
  let [sec, setSec] = useState(givenSeconds);

  let timer;

  useEffect(() => {
    timer = setInterval(() => {
      setMiliSec(miliSec - 1);

      if (miliSec === 0) {
        setSec(sec - 1);
        setMiliSec(59);
      }
    }, 5);

    return () => clearInterval(timer);
  });

  let stop = () => {
    clearInterval(timer);
    setShowResult(true);
  };
  useEffect(() => {
    if (sec === 0 && miliSec === 0) {
      stop();
    }
  });

  return (
    <Box sx={{ backgroundColor: 'lightgrey', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {showResult ? <Result score={score} quizLength={questions.length} /> :
        <Box sx={{ backgroundColor: 'white', height: '80%', width: '30%', border: '1px solid black' }}>
          <LinearProgress variant="determinate" value={(indexNumber + 1) / questions.length * 100} color="success" />

          <Box sx={{ paddingTop: 2, paddingLeft: 5, paddingRight: 5 }}>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: 30 }}>Question {indexNumber + 1} of {questions.length}</Typography>
              <Box sx={{ display: 'flex' }}>
                <AccessAlarmsIcon />
                <Typography sx={{ marginLeft: 1, width: '40px' }}>{sec}:00</Typography>
              </Box>
            </Box>

            <Box>
              <StarIcon sx={{ fontSize: 30, color: '#FCA120' }} />
              <StarIcon sx={{ fontSize: 30, color: '#FCA120' }} />
              <StarIcon sx={{ fontSize: 30, color: 'lightgrey' }} />
            </Box>

            <Grid container sx={{ marginY: 2 }}>
              <Grid item xl={12}>
                <Typography sx={{ marginY: 3, width: '100%', paddingX: 1, }}>
                  {questions[indexNumber].question}
                </Typography>
              </Grid>
            </Grid>

            <Grid container rowSpacing={1} columnSpacing={1} sx={{ marginY: 2 }}>
              {questions[indexNumber].incorrect_answers.map((e, i) => (
                <Grid item xl={12} key={i} sx={{ marginBottom: 1 }}>
                  <Button disabled={showOptions} onClick={() => checkQuestion(e, questions[indexNumber].correct_answer)} sx={{ width: '100%', color: color, backgroundColor: bgColor, border: '1px solid grey', borderRadius: 2, paddingY: 2, paddingX: 1, cursor: 'pointer' }}>
                    {e}
                  </Button>
                </Grid>
              ))}
            </Grid>


            <Typography sx={{ height: '50px', color: bgColor, fontWeight: 'bold', fontSize: 28, textAlign: 'center', marginTop: 5, marginBottom: 6 }}>{status}</Typography>

            {!showOptions ? '' :
              <Box onClick={next} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant='contained' sx={{ borderRadius: 2, border: 'none', paddingY: 2, paddingX: 5, fontSize: 20 }}>{nextBtn ? 'Next Question' : 'Finish'}</Button>
              </Box>
            }

          </Box>
        </Box>
      }
    </Box>
  );
}

export default App;
