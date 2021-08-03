import React from 'react';
import { render } from 'react-dom';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      workTime: 0,
      status: false,
    }
    this.intervalId = null;
  }

  toMMSS(time) {
    var sec_num = parseInt(time, 10);
    var minutes = Math.floor(sec_num / 60);
    var seconds = sec_num - (minutes * 60);

    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds;
  }

  getWorkTimeLeft() {
    this.intervalId = setInterval(() => {
        const reduceTime = this.state.workTime - 1
        this.setState({ workTime: reduceTime}); 
      }, 1000);
  }
  componentDidMount() {
    this.getWorkTimeLeft();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  componentDidUpdate() {
    if (this.state.workTime === 0 && this.state.status === 'work') {
      this.setState({workTime: 20, status: 'break'}); 
      this.playAudio();
    } else if (this.state.workTime === 0 && this.state.status === 'break') {
      this.setState({workTime: 1200, status: 'work'}) 
      this.playAudio();
    }
  }

  playAudio() {
    var audioElement = new Audio('./sounds/bell.wav');
    audioElement.play();
  }

  resetClock() {
    this.setState({ workTime: 0, status: false});
  }

  closeApp() {
    window.close();
  }

  render() {
    // let timeLeft = this.toMMSS(this.workTime);
    const { workTime, status } = this.state;

    return (
      <div>
        <h1>Protect your eyes</h1>

        {
          status ? 
            (status === 'work' ? (
              <div>
                <img src="./images/work.png" />
                <div className="timer">
                  {this.toMMSS(workTime)}
                </div>
                <button className="btn" onClick={() => this.resetClock()}>Stop</button>
              </div>
            ) : (
              <div>
              <img src="./images/rest.png" />
              <div className="timer">
                {this.toMMSS(workTime)}
              </div>
              <button className="btn" onClick={() => this.resetClock()}>Stop</button>
            </div>
            )) :
            (
              <div>
              <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
              <p>This app will help you track your time and inform you when it's time to rest.</p>
              <button className="btn" onClick={() => this.setState({ status: 'work', workTime: 1200})}>Start</button>
              </div>
            )
        }
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
