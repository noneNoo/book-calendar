import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class NewBookSearch extends React.Component {
  state = {
    searchValue: '',
    searchCount: 0,
    searchFlag: false,
    searchBooks: [],
  };
  // 카카오 책 검색 api 가져오기
  getBookDB = async (value) => {
    this.setState({ isLoading: true });
    const {
      data: { documents },
    } = await axios.get('https://dapi.kakao.com/v3/search/book.json', {
      params: {
        query: value,
        sort: 'accuracy',
        size: 50,
      },
      headers: {
        Authorization: `KakaoAK 5d747726cdf041bcd20aca6e5b81429a`,
      },
    });
    console.log(documents);
    this.setState({
      isLoading: false,
      searchFlag: true,
      searchBooks: documents,
    });
  };
  render() {
    const { searchValue, isLoading, searchFlag, searchBooks } = this.state;
    return (
      <div id="main-container">
        <header>검색하기</header>
        <form>
          <input
            type="text"
            placeholder="책 이름을 입력해보세요"
            onInput={(e) => {
              this.setState({ searchValue: e.target.value });
              this.getBookDB(searchValue);
            }}
          ></input>
          <input
            type="button"
            value="click"
            onClick={(e) => {
              if (searchValue) {
                this.getBookDB(searchValue);
              } else {
                alert('검색어를 입력해야 해요!');
              }
            }}
          ></input>
          {searchValue.length ? (
            <div>
              '{searchValue}'의 검색 결과 총 {searchBooks.length}개
            </div>
          ) : (
            <div>검색어를 입력하세요</div>
          )}
        </form>
        <section>
          <ul>
            {/* 흐앙 머리 아프게 생김 */}
            {/*  */}
            {searchFlag ? (
              isLoading ? (
                <div>loading...</div>
              ) : (
                searchBooks.map((item, index) => {
                  const date = item.datetime.substring(0, 10);
                  return (
                    //   컴포넌트화
                    <Link to={{ pathname: '/bookinfo' }}>
                      <li>
                        <img src={item.thumbnail}></img>
                        <h1>{item.title}</h1>
                        <h4>{item.publisher}</h4>
                        <h5>{date}</h5>
                      </li>
                    </Link>
                  );
                })
              )
            ) : (
              <div>지금은 서치할 수 없음</div>
            )}
          </ul>
        </section>
      </div>
    );
  }
}

export default NewBookSearch;
