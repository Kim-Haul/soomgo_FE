import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterComponent>
      <Wrapper>
        <div>
          <div className="footer-content">
            <p className="contact">1599-5319</p>
            <p>평일 10:00 - 18:00</p>
            <p>(점심시간 13:00 - 14:00 제외 · 주말/공휴일 제외)</p>
            <Buttons>
              <button className="btn-download">
                <img
                  src="/images/icon-download-appstore.svg"
                  alt="앱스토어 다운로드"
                />
                APP STORE
              </button>
              <button className="btn-download">
                <img
                  src="/images/icon-download-playstore.svg"
                  alt="플레이스토어 다운로드"
                />
                PLAY STORE
              </button>
            </Buttons>
          </div>

          <FooterNav className="footer-content">
            <ul>
              <li>숨고소개</li>
              <li>회사소개</li>
              <li>채용안내</li>
              <li>팀블로그</li>
            </ul>
            <ul>
              <li>고객안내</li>
              <li>이용안내</li>
              <li>안전정책</li>
              <li>예상금액</li>
              <li>고수찾기</li>
              <li>숨고보증</li>
              <li>고수에게묻다</li>
            </ul>
            <ul>
              <li>고수안내</li>
              <li>이용안내</li>
              <li>고수가이드</li>
              <li>고수가입</li>
              <li>고수센터</li>
            </ul>
            <ul>
              <li>고객센터</li>
              <li>공지사항</li>
              <li>자주묻는질문</li>
            </ul>
          </FooterNav>
        </div>

        <Row>
          <div>
            <div className="footer-links">
              <span>이용악관</span>
              <span>개인정보처리방침</span>
              <span>사업자 정보확인</span>
            </div>
            <small className="info">
              (주)브레이브모바일은 통신판매중개자로서 통신판매의 당사자가 아니며
              개별 판매자가 제공하는 서비스에 대한 이행, 계약사항 등과 관련한
              의무와 책임은 거래당사자에게 있습니다.
            </small>
            <address>
              <small>
                상호명:(주)브레이브모바일 · 대표이사:KIM ROBIN H ·
                개인정보책임관리자:김태우 · 주소:서울특별시 강남구 테헤란로 415,
                L7 강남타워 5층
              </small>
              <small>
                사업자등록번호:120-88-22325 · 통신판매업신고증:제
                2021-서울강남-00551 호 · 직업정보제공사업 신고번호:서울청 제
                2019-21호
              </small>
              <small>고객센터:1599-5319 · 이메일:support@soomgo.com</small>
            </address>
            <small>
              Copyright &copy;Brave Mobile Inc. All Rights Reserved.
            </small>
          </div>

          <FooterSns>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.facebook.com/SoomgoKorea/"
            >
              <img
                src="/images/footer-sns-facebook.svg"
                alt="숨고 페이스북 계정"
              />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.instagram.com/soomgo_official/"
            >
              <img
                src="/images/footer-sns-instagram.svg"
                alt="숨고 인스타그램"
              />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://blog.naver.com/brave_mobile_mkt"
            >
              <img src="/images/footer-sns-naverblog.svg" alt="숨고 블로그" />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://post.naver.com/brave_mobile_mkt?isHome=1"
            >
              <img src="/images/footer-sns-naverpost.svg" alt="숨고 포스트" />
            </a>
            <a target="_blank" rel="noreferrer" href="https://news.soomgo.com/">
              <img src="/images/footer-sns-tistory.svg" alt="숨고 스토리" />
            </a>
          </FooterSns>
        </Row>
      </Wrapper>
    </FooterComponent>
  );
};

export default Footer;

const FooterComponent = styled.footer`
  padding: 21px 10px 40px;
  border-top: 1px solid #e1e1e1;
  color: #737373;
  div.footer-content {
    display: inline-block;
  }
  p {
    font-size: 14px;
    line-height: 1.5;
    &.contact {
      padding-bottom: 3px;
      color: #00c7ae;
      font-size: 20px;
      font-weight: 500;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0 8px;
  margin: 30px 0 55px;
  button.btn-download {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 136px;
    height: 36px;
    padding: 0 16px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    img {
      padding-right: 6px;
    }
  }
`;

const Wrapper = styled.div`
  max-width: 970px;
  margin: 0 auto;
`;

const FooterNav = styled.nav`
  float: right;
  display: flex;
  justify-content: space-between;
  width: 380px;
  height: 100%;
  color: #737373;
  font-size: 14px;
  ul li {
    width: 95px;
    padding-bottom: 4px;
    &:first-child {
      color: #323232;
      font-weight: 500;
    }
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 1.4;
  span {
    margin-right: 30px;
    font-weight: 500;
  }
  small {
    display: block;
    font-size: 12px;
    &.info {
      width: 88%;
      margin: 8px 0;
    }
  }
`;

const FooterSns = styled.nav`
  min-width: 200px;
  a {
    padding: 0 6px;
  }
`;
