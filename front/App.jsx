import React from 'react';

function getRandomQuote(quotes) {
  return quotes[Math.round(Math.random() * quotes.length)];
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      loadingError: false
    };
    this.selectQuote = this.selectQuote.bind(this);
  }

  componentDidMount() {
    fetch('/api/quotes')
    .then(data => data.json())
    .then(quotes => {
      this.setState({ quotes, selectedQuote: getRandomQuote(quotes) });
    })
    .catch(err => {
      this.setState({ loadingError: true });
    });
  }

  selectQuote() {
    this.setState({ selectedQuote: getRandomQuote(this.state.quotes) });
  }

  render() {
    if (this.state.quotes.length === 0) {
      return <p>Waiting for quotes...</p>;
    }
    if (this.state.loadingError) {
      return <p>An error occured. Try to reload the page</p>;
    }
    const { quote, author } = this.state.selectedQuote;
    return (
      <section>
        <p>{ quote }</p>
        <p>{ author }</p>
        <button onClick={this.selectQuote}>Get Another Quote</button>
      </section>
    );
  }
}

export default App;
