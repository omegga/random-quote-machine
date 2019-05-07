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

  selectQuote(e) {
    e.preventDefault();
    this.setState({ selectedQuote: getRandomQuote(this.state.quotes) });
  }

  render() {
    if (this.state.quotes.length === 0) {
      return <p>Waiting for quotes...</p>;
    }
    if (this.state.loadingError) {
      return <p>An error occured. Try to reload the page.</p>;
    }
    const { quote, author } = this.state.selectedQuote;
    const tweetLink = `https://twitter.com/intent/tweet?text=${quote} ~ ${author}`;
    return (
      <section id="quote-box">
        <p id="text">{ quote }</p>
        <p id="author">{ author }</p>
        <div>
          <a 
            id="tweet-quote"
            className="twitter-share-button"
            href={tweetLink}
            data-size="large"
          >
            Tweet
          </a>
        </div>
        <a id="new-quote" href="#" onClick={this.selectQuote}>Get Another Quote</a>
      </section>
    );
  }
}

export default App;
