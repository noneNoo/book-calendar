import React from 'react';
// import './newnote.css';

class NewBookAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      thisDateInfo: '',
      year: '',
      month: '',
      date: '',
      thisDateBooks: [],
    };
  }

  // 이 페이지의 정보

  componentDidMount() {
    // 클릭해서 넘겨받은 날짜 props
    const { location } = this.props;
    let year, month, date;

    // props가 있는 경우
    if (location.state) {
      // year = location.state.year;
      // month = location.state.month;
      // date = location.state.date;

      this.setState({
        thisDateInfo: new Date(year, month - 1, date),
        year: location.state.year,
        month: location.state.month,
        date: location.state.date,
      });

      // 새고로침을 할 경우
    } else if (window.location.hash.length === 18) {
      const dateId = window.location.hash.slice(-8);
      // path에서 가져옴
      // year = Number(dateId.slice(0, 4));
      // month = Number(dateId.slice(4, 6));
      // date = Number(dateId.slice(6));

      this.setState({
        thisDateInfo: new Date(year, month - 1, date),
        year: dateId.slice(0, 4),
        month: dateId.slice(4, 6),
        date: dateId.slice(6),
      });

      // 이상한 링크로 접속한 경우
    } else {
      return <h1>잘못된 링크입니다</h1>;
    }
  }

  render() {
    const { year, month, date, thisDateBooks } = this.state;
    return (
      <div id="container">
        <header>
          <button id="home-btn">뒤로</button>
          <h3 id="this-date">
            {year}.{month}.{date}
          </h3>
          {thisDateBooks.length ? (
            <h2>{thisDateBooks}</h2>
          ) : (
            <h2>아직 이날 책을 기록하지 않았어요</h2>
          )}
        </header>
      </div>
    );
  }
}

export default NewBookAdd;
