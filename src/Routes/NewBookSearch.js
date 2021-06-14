import React from 'react';
import axios from 'axios';

import SearchBookLi from '../Components/SearchBookLists';

import './newbooksearch.css';

class NewBookSearch extends React.Component {
  state = {
    searchValue: '',
    searchCount: 0,
    searchFlag: false,
    searchBooks: [],
  };
  // 카카오 책 검색 api 가져오기
  getBookDB = async (value) => {
    if (value.length > 1) {
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
      this.setState({
        isLoading: false,
        searchFlag: true,
        searchBooks: documents,
      });
    } else {
      alert('검색어를 한 글자 이상 입력해야 해요!');
    }
  };

  render() {
    const { searchValue, isLoading, searchFlag, searchBooks } = this.state;
    return (
      <div id="search-main-container">
        <h3 id="search-header">검색하기</h3>
        <div className="content-width">
          <form
            onSubmit={function () {
              return false;
            }}
          >
            <input
              type="text"
              id="searchbar"
              placeholder="책 이름을 입력해보세요"
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  e.preventDefault();
                  this.getBookDB(searchValue);
                }
              }}
              onInput={(e) => {
                this.setState({ searchValue: e.target.value });
              }}
            ></input>
            <button id="search-btn" onClick={(e) => {}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </form>
          <section id="search-contentsbox">
            {/* {searchFlag ? (
              <span id="search-count">
                '{searchValue}'의 검색 결과 총 {searchBooks.length}개
              </span>
            ) : null} */}
            <ul id="search-ul">
              {/* 흐앙 머리 아프게 생김 */}
              {/*  */}
              {searchFlag ? (
                isLoading ? (
                  <span id="loading-text">loading...</span>
                ) : (
                  searchBooks.map((item, index) => {
                    const date = item.datetime.substring(0, 10);
                    return (
                      <SearchBookLi
                        thumbnail={item.thumbnail}
                        title={item.title}
                        publisher={item.publisher}
                        date={date}
                        info={item.contents}
                        authors={item.authors}
                      />
                    );
                  })
                )
              ) : null}
            </ul>
          </section>
        </div>
      </div>
    );
  }
}

export default NewBookSearch;
