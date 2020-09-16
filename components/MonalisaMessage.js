import React from "react";

const ASCII_ENDPOINT = "https://api.github.com/octocat";

const getData = async (string) => {
  const response = await fetch(
    `${ASCII_ENDPOINT}?s=${encodeURIComponent(string)}`
  );
  return response.text();
};

const getMonaMessage = ({ who, meetingTitle, meetingDate, meetingTime }) => {
  const ms = Math.abs(new Date(`${meetingDate}T${meetingTime}`) - Date.now());
  const minutesToGo = Math.floor(ms / 60000);

  const when = minutesToGo > 59 ? `${Math.floor(minutesToGo / 60)} hours` : `${minutesToGo} minutes`
  return `${who} has a meeting coming up in ${when}`
};

class MonalisaMessage extends React.Component {

  state = {
    message: '',
    asciiArt: '',
  };

  async componentDidUpdate(prevProps) {
    if (this.props.messageData != prevProps.messageData) {
      // The octocat endpoint will only accept alphanumeric characters and spaces, so we strip out characters here.
      const asciiArt = await getData(getMonaMessage(this.props.messageData).replace(/[^\w\s]/gi, ''));
      this.setState({ asciiArt });
    }
  }

  render() {
    return (
      <div className="cli">
        <div className="cli-example">        
        {this.state.asciiArt}</div>
      </div>
    );
  }

}

export default React.memo(MonalisaMessage)