import React from 'react';

import { Link } from 'react-router-dom';

function DateDiv({ date, state, thisYear, thisMonth, thisDay }) {
  // 1월,일~ 9월,일까지 숫자를 01~ 09로 나타내기 위한 변수 선언
  let stringMonth;
  let stringDay;

  // 9일 미만 앞에는 0을 붙여주기
  if (thisMonth < 10) {
    stringMonth = `0${thisMonth}`;
  } else {
    stringMonth = String(thisMonth);
  }
  if (thisDay < 10) {
    stringDay = `0${thisDay}`;
  } else {
    stringDay = String(thisDay);
  }

  const dateId = `${thisYear}${stringMonth}${stringDay}`;

  return (
    <Link
      className={state}
      to={{
        pathname: `/newnote/${dateId}`,
        state: {
          year: thisYear,
          month: stringMonth,
          date: stringDay,
          dateId: dateId,
        },
      }}
      onClick={() => {
        console.log(thisYear, thisMonth, thisDay);
      }}
    >
      {date}
    </Link>
  );
}

export default DateDiv;
