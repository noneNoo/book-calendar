import React from 'react';
import './calendar.css';

import DateDiv from '../Components/DateDiv';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    // 변화할 데이터
  }

  state = {
    viewYear: new Date().getFullYear(),
    viewMonth: new Date().getMonth(),
  };

  // 캘린더 헤더 버튼을 눌렀을 때 발생하는 이벤트 함수
  moveMonth = (e, direction) => {
    const { viewYear, viewMonth } = this.state;

    let currentTarget = e.target;

    if (currentTarget.id === 'left') {
      viewMonth === 0
        ? this.setState({
            viewYear: viewYear - 1,
            viewMonth: 11,
          })
        : this.setState({
            viewMonth: viewMonth - 1,
          });
    } else if (currentTarget.id === 'right') {
      viewMonth === 11
        ? this.setState({
            viewYear: viewYear + 1,
            viewMonth: 0,
          })
        : this.setState({
            viewMonth: viewMonth + 1,
          });
    }
  };

  render() {
    const date = new Date();

    const { viewYear, viewMonth } = this.state;
    // const viewDate = new Date().setFullYear();

    // 두 번째 인자에 0을 넣으면 지난단 마지막 일을 알려준다
    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);

    // 지난 달 마지막 날짜, 요일
    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    // 이번 달 마지막 날짜, 요일
    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    // 캘린더에 나타날 날짜를 담는 배열
    const prevDates = [];
    const nextDates = [];

    // 지난달 date 미리보기 계산
    if (PLDay !== 6) {
      for (let i = 0; i < PLDay + 1; i++) {
        prevDates.unshift(PLDate - i);
      }
    }
    // 다음달 date 미리보기 계산
    for (let i = 1; i < 7 - TLDay; i++) {
      nextDates.push(i);
    }

    // 이번달 날짜 배열
    const thisDates = Array(TLDate)
      // fill메서드로 배열들을 undefind 로 만든다
      .fill()
      // map메서드로 배열들에 index값을 부여한다
      .map((arr, index) => index + 1);

    return (
      <div id="main-container">
        <div className="calendar-header">
          <div className="content-width">
            <button
              className="move-month-btn"
              id="left"
              onClick={this.moveMonth}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
              </svg>
            </button>
            <h3 className="calendar-this-month">
              {viewYear}년 {viewMonth + 1}월
            </h3>
            <button
              className="move-month-btn"
              id="right"
              onClick={this.moveMonth}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="calendar-container">
          <div className="days">
            <span className="day sunday">일</span>
            <span className="day">월</span>
            <span className="day">화</span>
            <span className="day">수</span>
            <span className="day">목</span>
            <span className="day">금</span>
            <span className="day saturday">토</span>
          </div>
          <div className="dates">
            {/* 이전달미리 */}
            {prevDates.map((item, index) => {
              return <DateDiv date={item} state="prev date" key={item} />;
            })}
            {/* 이번달 그리기 */}
            {thisDates.map((item) => {
              // 오늘 날짜를 찾아서 표시하기

              if (
                viewYear === date.getFullYear() &&
                viewMonth === date.getMonth() &&
                item === date.getDate()
              ) {
                return (
                  <DateDiv
                    date={item}
                    state="normal date today"
                    key={item}
                    thisYear={viewYear}
                    thisMonth={viewMonth + 1}
                    thisDay={item}
                  />
                );
              } else {
                return (
                  <DateDiv
                    date={item}
                    state="normal date"
                    key={item}
                    thisYear={viewYear}
                    thisMonth={viewMonth + 1}
                    thisDay={item}
                  />
                );
              }
            })}
            {/* 오늘 표시 그리기 */}
            {(function () {
              if (
                (viewYear === date.getFullYear(), viewMonth === date.getMonth())
              ) {
              }
            })()}
            {/* 다음달미리 */}
            {nextDates.map((item) => {
              return <DateDiv date={item} state="next date" key={item} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
