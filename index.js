function App() {
    const [breakLength, setBreakLength] = React.useState(5)
    const [sessionLength, setSessionLength] = React.useState(25)
    const [timerPlaying, setTimerPlaying] = React.useState(false)
    const [timerLabel,setTimerLabel] = React.useState("SESSION")
    const [timeLeft, setTimeLeft] = React.useState(1500)

    /* Setting the Timer Type */
    const title = timerLabel === "SESSION" ? "Session" : "Break"

    /* Break Length Increment and Decrement Functions */
    function handleBreakDecrement() {
        if (breakLength > 1) {
            setBreakLength(preValue => preValue - 1)
        }
    }

    function handleBreakIncrement() {
        if (breakLength < 60) {
            setBreakLength(preValue => preValue + 1)
        }
    }

      /* Session Length Increment and Decrement Functions */
    function handleSessionDecrement() {
        if (sessionLength > 1) {
            setSessionLength(preValue => preValue - 1)
            setTimeLeft(preValue => preValue - 60)
        }
    }

    function handleSessionIncrement() {
        if (sessionLength < 60) {
            setSessionLength(preValue => preValue + 1)
            setTimeLeft(preValue => preValue + 60)
        }
    }

    /* Time Formatting Function */
    function timeFormatter() {
        const minutes = Math.floor(timeLeft / 60)
        const seconds = timeLeft - (minutes * 60)
        const formattedSeconds = seconds < 10 ? "0" + seconds : seconds
        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes
        return `${formattedMinutes}:${formattedSeconds}`
    }

    /* Setting the Timer to Play and Pause*/
    function handleTimerPlaying() {
        setTimerPlaying(!timerPlaying)
        clearTimeout(timeout)
    }

    const timeout = setTimeout(() => {
        if(timeLeft > 0 && timerPlaying == true){
            setTimeLeft(timeLeft - 1)
        }
    }, 1000);

    /* Setting the Reset Button */
    function handleReset() {
        clearTimeout(timeout)
        setTimeLeft(1500)
        setBreakLength(5)
        setSessionLength(25)
        setTimerPlaying(false)
        setTimerLabel("SESSION")
        const audio = document.getElementById("beep");
        audio.pause()
        audio.currentTime = 0;
    }

    /* Switching Time Type and Playing audio */
    const resetTimer = () => {
        const audio = document.getElementById("beep");
        if(!timeLeft && timerLabel === "SESSION"){
            setTimeLeft(breakLength * 60)
            setTimerLabel("BREAK")
            audio.play()
        }
        if(!timeLeft && timerLabel === "BREAK"){
          setTimeLeft(sessionLength * 60)
            setTimerLabel("SESSION")
            audio.pause()
            audio.currentTime = 0;
        }
    }

    React.useEffect(() => {
        resetTimer()
    }, [[timerPlaying, timeLeft, timeout]])


    /* Don't understand this */
    /*
        const clock = () => {
        if(timerPlaying){
            timeout
            resetTimer()
        }else {
            clearTimeout(timeout)
        }
        }

        React.useEffect(() => {
            clock()
        }, [timerPlaying, timeLeft, timeout])
    */

    return(
        <div id="clock-wrapper">
            <div id="main-heading">25 + 5 Clock</div>
            <div id="break-and-session-length-wrapper">
                <div id="break-length-wrapper">
                    <div id="break-label">Break Length</div>
                    <div id="break-length-controls-wrapper">
                        <button id="break-decrement" onClick={handleBreakDecrement} disabled={timerPlaying}>Decrease</button>
                        <div id="break-length">{breakLength}</div>
                        <button id="break-increment" onClick={handleBreakIncrement} disabled={timerPlaying}>Increase</button>
                    </div>
                </div>

                <div id="session-length-wrapper">
                    <div id="session-label">Session Length</div>
                    <div id="session-length-controls-wrapper">
                        <button id="session-decrement" onClick={handleSessionDecrement} disabled={timerPlaying}>Decrease</button>
                        <div id="session-length">{sessionLength}</div>
                        <button id="session-increment" onClick={handleSessionIncrement} disabled={timerPlaying}>Increase</button>
                    </div>
                </div>
            </div>
            <div id="timer-wrapper">
                <div id="timer-label">{title}</div>
                <div id="time-left">{timeFormatter()}</div>
                <div id="timer-controls">
                    <button id="start_stop" onClick={handleTimerPlaying}>Start / Stop</button>
                    <button id="reset" onClick={handleReset}>Reset</button>
                </div>
            </div>

            <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))