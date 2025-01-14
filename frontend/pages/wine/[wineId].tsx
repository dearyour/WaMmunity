import React, { useCallback, useEffect, useRef, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { useSelector, useDispatch } from "react-redux";
import { Progress } from "antd";
import Slider from "../../components/Slider";
import styled from "@emotion/styled";
// import { dataList } from "constants";
import Router, { useRouter } from "next/router";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import StyleDrawer from "components/wine/StyleInfo";
import Rating from "@mui/material/Rating";
import WineSlider from "components/WineSlider";
import NowPlayingSection from "components/WineSlider";
import { RootState } from "store/module";
import TestCarousel from "components/TestCarousel";
const Base = styled.div`
  position: relative;
`;

const TopInfo = styled.section`
  border-bottom: 1px solid rgb(227, 227, 227);
  // background: #eae0da;
`;

const PosterContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #eae0da;
  padding: 14px 16px 30px;
  // display: flex;
`;

const Backdrop = styled.div`
  display: flex;
  width: 100%;
  height: 450px;
  margin-top: 20px;
  // background-image: linear-gradient(
  //   -180deg,
  //   rgba(0, 0, 0, 0.35) 2%,
  //   rgba(0, 0, 0, 0.2) 70%,
  //   rgba(0, 0, 0, 0.5) 100%
  // );
  // background-color: #fff;
  overflow: hidden;
`;

const BackdropImage = styled.div<{ imageUrl: string }>`
  background: url(${({ imageUrl }) => imageUrl}) center center / cover no-repeat;
  min-width: 110px;
  // min-width: 9em;
  // height: 14em;
  position: relative;
  top: auto;
  left: auto;
  // height: 100%;
  filter: none;
  margin: 0px 0px 0px 100px;
  border: solid 2px fff;
  background-color: #eae0da;
`;

const PosterWrapper = styled.div`
  position: absolute;
  width: 200px;
  height: 300px;
  border: solid 2px #fff;
  top: 83px;
  left: -30px;
  border-radius: 3px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background: #fff;
`;

const Poster = styled.div`
  width: 100%;
  height: 100%;
  // object-fit: cover;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Main = styled.div`
  padding: 14px 16px 22px;
  text-align: center;
`;
const Mains = styled.div`
  padding: 14px 16px 22px;
  text-align: center;
  background: #f8f8f8;
`;

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  position: relative;
  background-color: white;
  padding: 10px 20px 30px 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
const Containers = styled.div`
  max-width: 960px;
  margin: 0 auto;
  position: relative;
`;

const ContentWrapper = styled.div`
  margin: 10px 0px 0px 100px;
  text-align: left;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const Title = styled.h1`
  font-size: 33px;
  font-weight: 700;
  line-height: 30px;
`;

const Titles = styled.h1`
  font-size: 22px;
  font-weight: 700;
  line-height: 40px;
  display: flex;
`;
const Titless = styled.h1`
  font-size: 22px;
  font-weight: 700;
  line-height: 40px;
  // display: flex;
  margin-left: 90px;
  margin-top: 15px;
  margin-bottom: 30px;
`;

const Keyword = styled.div`
  font-size: 17px;
  font-weight: 400;
  padding: 8px 0;
  // border-bottom: 1px solid white;
  color: rgba(0, 0, 0, 0.5);
  // color: #590805;
`;

const AverageRate = styled.div`
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  padding: 8px 0;
  margin-top: 1px;
  border-bottom: 1px solid white;
  // border-bottom: 1px solid #ededed;
`;

const Actions = styled.div`
  margin-top: 20px;
  height: 30px;
  display: flex;
  align-items: center;
`;

const StarRate = styled.div`
  width: 230px;
  // height: 57px;
  margin: 0;
  // margin-top: 320px;
  margin-left: 100px;
  text-align: center;
  // border-right: 1px solid white;
`;
const StarRates = styled.div`
  width: 30%;
  height: 57px;
  margin: 0;
  margin-top: 325px;
  // margin-left: 100px;
  text-align: center;
  // border-right: 1px solid white;
`;

const StarRateText = styled.div`
  font-size: 20px;
  line-height: 8px;
  margin-bottom: 20px;
  margin-top: 15px;
  color: #787878;
`;

const RatingWrapper = styled.div`
  margin-top: 8px;
`;

const Divider = styled.div`
  width: 1px;
  height: 100%;
  background: #ededed;
  float: left;
`;

const ActionButtonContainer = styled.div`
  width: 250px;
  padding: 0 30px;
  margin: auto auto;
  border-right: 1px solid white;
  border-left: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  border: none;
  background: transparent;
  font-size: 14px;
  margin: 0 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  > svg {
    margin-right: 7px;
    &:hover {
      transform: scale(1.4);
    }
  }
`;

const BottomInfo = styled.div`
  padding: 28px 0 48px;
  max-width: 960px;
  margin: 0 auto;
`;

const ContentSectionContainer = styled.div`
  border-right: 1px solid;
  border-left: 1px solid;
  border-top: 1px solid;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  background: #fff;
  border-color: #e3e3e3;
`;
const WishText = styled.div`
  font-size: 1.2rem;
  margin-left: 10px;
  margin-top: 25px;
`;

const Radio = styled.input`
  display: none;
`;

const SStar = styled(FaStar)`
  cursor: pointer;
  transition: color 200ms;
`;

function WineDetail(): any {
  const router = useRouter();
  const { wineId } = router.query;
  const [data, setdata] = useState<any>(""); // 와인디테일데이터
  const [datas, setdatas] = useState<any>("");
  const [rating, setRating] = useState<number>(0); //따로 와인평가점수
  const [ratings, setRatings] = useState<number>(3); // 리뷰 쓰는 별점
  const [hover, setHover] = useState<Number>(0);
  const [commentData, setCommentData] = useState([]);
  const [dats, setdats] = useState<any>("");
  const commentRef: any = useRef(null);
  const [comment, setComment] = useState(""); // 평점작성
  const userId = useSelector((state: RootState) => state.user.users.id);
  const [likeState, setLikeState] = useState("delete"); //
  const [wishNumber, setWishNumber] = useState(0);
  // console.log(userId);

  const __GetWineDetail = useCallback(() => {
    return axios({
      method: "GET",
      url: process.env.BACK_EC2 + "wine/" + wineId,
      // url: "https://localhost:8080/api/wine",
    })
      .then((res) => {
        setdata(res.data.object);
        setRating(res.data.object.ratingAvg);
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  }, [wineId]);

  useEffect(() => {
    __GetWineDetail();
  }, [__GetWineDetail]);

  const __loadComments = useCallback(() => {
    //평점 업로드 또는 불러올때 계속 새로고침
    // const feedsId = detailData.feed.feedId;
    axios({
      method: "GET",
      url: process.env.BACK_EC2 + "wine/wineReview/" + wineId,
      // url: "https://localhost:8080/api/" + "wine/wineReview/" + wineId,
    })
      .then((res) => {
        console.log(res.data.object);
        setCommentData(res.data.object.reverse());
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [wineId]);
  useEffect(() => {
    __loadComments();
  }, [__loadComments]);
  // 평점 작성
  const __uploadComment = useCallback(() => {
    if (comment.length > 0 && comment.trim()) {
      if (data) {
        const data = {
          wineId: Number(wineId),
          content: comment,
          memberId: userId,
          rating: ratings,
        };
        console.log(data);
        axios({
          method: "POST",
          url: process.env.BACK_EC2 + "wine/review",
          data: data,
        })
          .then((res) => {
            commentRef.current.value = "";
            setComment("");
            __loadComments();
            __GetWineDetail();
          })
          .catch((err) => {
            // console.log(err);
          });
      }
    }
  }, [
    comment,
    commentRef,
    userId,
    data,
    ratings,
    wineId,
    __loadComments,
    __GetWineDetail,
  ]);
  const __deleteComment = useCallback(
    (id) => {
      if (commentData) {
        const token = localStorage.getItem("Token");
        axios({
          method: "DELETE",
          url: process.env.BACK_EC2 + "wine/review/" + id,
        })
          .then((res) => {
            __loadComments(); // 로드 comment 다시 부른다
            __GetWineDetail();
          })
          .catch((err) => {});
      }
    },
    [commentData, __loadComments, __GetWineDetail]
  );
  ////////////////////////////////////////////위시리스트

  useEffect(() => {
    axios({
      method: "GET",
      url: process.env.BACK_EC2 + "wine/wishlist/" + userId,
    })
      .then((res) => {
        console.log(res.data);
        let tempss = res.data.object.filter(
          (item: any) => item.wineId === Number(wineId)
        );
        // console.log(tempss); // 이부분  []이면 트루 반환
        // console.log(tempss.length); // 이부분 0이면 펄스 반환
        // 빈배열은 true 반환한다 배열의 길이를 0은 false 반환한다
        if (tempss.length === 0) {
          console.log("##위시로드데이터 0개 ");
          setLikeState("delete");
        } else {
          console.log("##위시로드데이터 1개 ");
          setLikeState("ok");
        }
      })
      .catch((err) => {
        return err;
      });
  }, [userId, wineId]);
  //순수하게 wishList Id값 추출하기위해 사용
  const __loadLike = useCallback(() => {
    return axios({
      method: "GET",
      url: process.env.BACK_EC2 + "wine/wishlist/" + userId,
    })
      .then((res) => {
        console.log(res.data);
        let tempss = res.data.object.filter(
          (item: any) => item.wineId === Number(wineId)
        );
        console.log(tempss);
        let wishIds = tempss[0].id;
        setWishNumber(Number(wishIds));
      })
      .catch((err) => {
        return err;
      });
  }, [userId, wineId]);

  useEffect(() => {
    __loadLike();
  }, [__loadLike]);

  const __deleteLike = useCallback(() => {
    // if (likeState === "ok") {
    return axios({
      method: "delete",
      url: process.env.BACK_EC2 + "wine/wishlist/" + wishNumber,
    })
      .then((res) => {
        setLikeState("delete");
        // console.log("##delete성공");
        __loadLike();
      })
      .catch((err) => {
        return err;
      });
    // } else {
    //   __updateLike();
    // }
  }, [__loadLike, wishNumber]);

  const __updateLike = useCallback(() => {
    // if (likeState === "delete") {
    const data = {
      wineId: Number(wineId),
      memberId: userId,
    };
    return axios({
      method: "post",
      url: process.env.BACK_EC2 + "wine/wishlist",
      data: data,
    })
      .then((res) => {
        setLikeState("ok");
        // console.log("##ok성공");
        // console.log(likeState); //useState 여기서직접 콘솔안찍힘 463 함수끝나는곳에 찍을것
        __loadLike();
      })
      .catch((err) => {
        return err;
      });
    // } else {
    //   __deleteLike();
    // }
  }, [userId, wineId, __loadLike]);

  // console.log("##likeState" + likeState);
  // console.log("##wishnumber" + wishNumber);

  //유즈이펙트로 곧바로 부르기
  // useEffect(() => {
  //   console.log(wineId);
  //   if (!wineId) {
  //     return;
  //   }
  //   axios({
  //     method: "get",
  //     url: process.env.BACK_EC2 + "wine/" + wineId,
  //   })
  //     .then((res) => {
  //       console.log(res.data);
  //       setdata(res.data.object);
  //       setRating(res.data.object.ratingAvg);
  //       // router.push("/wine/" + wineId);
  //     })
  //     .catch((err) => {
  //       // Router.push("/404");
  //     });
  // }, [wineId]);
  return (
    <AppLayout>
      <Base>
        <>
          <TopInfo>
            {/* 포스터 영역 */}

            <PosterContainer>
              <Backdrop>
                <BackdropImage imageUrl={data.img}></BackdropImage>
                <ContentWrapper>
                  <Title>{data.name}</Title>

                  <AverageRate className="태양">
                    · 와인 스타일 : {data.cat1}
                  </AverageRate>
                  <AverageRate>· 원산지 : {data.country}</AverageRate>
                  <AverageRate>· 지역 : {data.region1}</AverageRate>
                  <AverageRate>· 제조 회사 : {data.winery}</AverageRate>
                  <AverageRate>· 숙성 기간 : {data.ageing} 년</AverageRate>
                  <AverageRate>· 포도 품종 : {data.grape1}</AverageRate>
                  <Keyword>
                    · 해외 평균가 : ₩
                    {data
                      ? data.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : ""}
                  </Keyword>
                  <Actions>
                    {/* <Divider /> */}
                    {/* 액션 버튼 */}

                    <ActionButtonContainer>
                      <ActionButton>
                        <ImgWrap
                          onClick={() => {
                            likeState === "ok"
                              ? __deleteLike()
                              : __updateLike();
                          }}
                        >
                          <Like>
                            {/* <LikeImg src="/assets/pngwing.com2.png"></LikeImg> */}
                            <LikeBaseImg
                              className={
                                likeState === "ok"
                                  ? "likeanimated"
                                  : "unlikeanimated"
                              }
                              // onClick={
                              //   // likeState === "ok" ? __deleteLike() :
                              //   __updateLike()
                              // }
                              src="/assets/pngwing.com2.png"
                            ></LikeBaseImg>
                            <LikeBase
                              src="/assets/pngwing.com.png"
                              // onClick={__updateLike}
                            ></LikeBase>

                            {/* <span> {data ? likeCount : 0}</span> */}
                          </Like>
                          {/* <CommentCount>
                    <CommentImg src="/assets/feed/pngwing.com5.png"></CommentImg>
                    <span> {data && data.comments ? data.comments.length : 0}</span>
                  </CommentCount> */}
                        </ImgWrap>
                      </ActionButton>
                      <WishText>위시리스트</WishText>
                    </ActionButtonContainer>
                    <StarRate>
                      <StarRateText>
                        {/* ✨ 평점 : [ {data.ratingAvg} ] */}
                      </StarRateText>

                      <RatingWrapper>
                        {/* <Rating size="large" /> */}
                      </RatingWrapper>
                    </StarRate>
                  </Actions>
                </ContentWrapper>
                <StarRates>
                  <div>
                    <Rating
                      name="text-feedback"
                      value={rating}
                      readOnly
                      precision={0.5}
                      size="large"
                      // emptyIcon={
                      //   <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                      // }
                    />
                  </div>
                  <StarRateText>
                    ✨ 평점 : [ {data ? data.ratingAvg.toFixed(1) : null} ]
                  </StarRateText>
                  <StarRateText>최근 리뷰 : [ {data.ratingNum} ]</StarRateText>
                </StarRates>
              </Backdrop>
            </PosterContainer>

            {/* 메인 */}

            <Main>
              <Container>
                <TitlesRapper>
                  <Titles>기본 정보</Titles>

                  <StyleDrawer>도움말</StyleDrawer>
                </TitlesRapper>
                <UserStates>
                  　·{" "}
                  <span className="자" style={{ marginRight: "10px" }}>
                    당도
                  </span>{" "}
                  [&nbsp;
                  {data ? <span> {data.sweet.toFixed(1)}</span> : null}
                  &nbsp;]&nbsp;
                  {data ? (
                    <OndoProgress>
                      <Progress
                        strokeColor={{
                          "0%": "#058cec",
                          "100%": "#ff0000",
                        }}
                        percent={data.sweet}
                        showInfo={false}
                      />
                    </OndoProgress>
                  ) : null}
                  　·{" "}
                  <span className="헬스왕" style={{ marginRight: "10px" }}>
                    산도
                  </span>
                  &nbsp;[&nbsp;
                  {data ? <span> {data.acidic.toFixed(1)}</span> : null}
                  &nbsp;]&nbsp;
                  {data ? (
                    <OndoProgress>
                      <Progress
                        strokeColor={{
                          "0%": "#058cec",
                          "100%": "#ff0000",
                        }}
                        percent={data.acidic}
                        showInfo={false}
                      />
                    </OndoProgress>
                  ) : null}
                </UserStates>
                <UserStates>
                  　·{" "}
                  <span className="환경미화원" style={{ marginRight: "10px" }}>
                    바디
                  </span>
                  &nbsp;[&nbsp;
                  {data ? <span> {data.bold.toFixed(1)}</span> : null}
                  &nbsp;]&nbsp;
                  {data ? (
                    <OndoProgress>
                      <Progress
                        strokeColor={{
                          "0%": "#058cec",
                          "100%": "#ff0000",
                        }}
                        percent={data.bold}
                        showInfo={false}
                      />
                    </OndoProgress>
                  ) : null}
                  　·{" "}
                  <span className="넓고" style={{ marginRight: "10px" }}>
                    타닌
                  </span>
                  &nbsp;[&nbsp;
                  {data ? <span> {data.tannic.toFixed(1)}</span> : null}
                  &nbsp;]&nbsp;
                  {data ? (
                    <OndoProgress>
                      <Progress
                        strokeColor={{
                          "0%": "#058cec",
                          "100%": "#ff0000",
                        }}
                        percent={data.tannic}
                        showInfo={false}
                      />
                    </OndoProgress>
                  ) : null}
                </UserStates>
                <UserStates>
                  　&nbsp;&nbsp;·{" "}
                  <span className="공부벌레" style={{ marginRight: "10px" }}>
                    도수
                  </span>
                  &nbsp;[&nbsp;
                  {data ? <span> {data.alcoholContent.toFixed(1)}</span> : null}
                  &nbsp;]&nbsp;
                  {data ? (
                    <OndoProgress>
                      <Progress
                        strokeColor={{
                          "0%": "#058cec",
                          "100%": "#ff0000",
                        }}
                        percent={data.alcoholContent}
                        showInfo={false}
                      />
                    </OndoProgress>
                  ) : null}
                  　·{" "}
                  <span className="바른" style={{ marginRight: "10px" }}>
                    와인향
                  </span>
                  &nbsp;[&nbsp;
                  {data ? <span> {data.driedFruit.toFixed(1)}</span> : null}
                  &nbsp;]&nbsp;
                  {data ? (
                    <OndoProgress>
                      <Progress
                        strokeColor={{
                          "0%": "#058cec",
                          "100%": "#ff0000",
                        }}
                        percent={data.driedFruit}
                        showInfo={false}
                      />
                    </OndoProgress>
                  ) : null}
                </UserStates>
              </Container>
            </Main>
            <Mains>
              <Containers>
                <PosterWrapper>
                  <Poster style={{ backgroundImage: `url(${data.img})` }} />
                  {/* <CommentImg style={{ backgroundImage: `url(${data.img})` }} /> */}
                  {/* </Poster> */}
                </PosterWrapper>
                <ContentWrapper>
                  <InnerOut>
                    <Inner>
                      <CommentCount>
                        <CommentImg
                          style={{ backgroundImage: `url(${data.img})` }}
                        />
                        <Titless>와인 리뷰</Titless>
                      </CommentCount>

                      {/* <CommentLine></CommentLine> */}
                      <CommentWrap>
                        {/*리뷰렌더*/}
                        {commentData &&
                          commentData.map((now: any, idx: any) => {
                            return (
                              <div key={idx}>
                                <CommentFeedUser>
                                  {/* <CommentProfile
                                    src={data.img}
                                  ></CommentProfile> */}
                                  <span>
                                    <CommentUsername>
                                      {/* {now.rating} */}
                                      <Rating
                                        name="text-feedback"
                                        value={now.rating}
                                        readOnly
                                        precision={0.5}
                                        size="small"
                                        // emptyIcon={
                                        //   <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                                        // }
                                      />
                                    </CommentUsername>
                                    <CommentUsername>
                                      <span className="태양">
                                        {now.memberName}
                                      </span>
                                    </CommentUsername>
                                    <CommentUsernames>
                                      {now.regtime[0]}년 {now.regtime[1]}월{" "}
                                      {now.regtime[2]}일 {now.regtime[3]}시{" "}
                                      {now.regtime[4]}분
                                    </CommentUsernames>
                                  </span>
                                </CommentFeedUser>
                                <CommentContent>
                                  {now.content}
                                  {userId === now.memberId ? (
                                    <CommentDeleteBtn
                                      onClick={() => {
                                        __deleteComment(now.id);
                                      }}
                                    >
                                      삭제
                                    </CommentDeleteBtn>
                                  ) : (
                                    <></>
                                  )}
                                </CommentContent>
                                <CommentDivider />
                              </div>
                            );
                          })}
                      </CommentWrap>
                      <CommentLine></CommentLine>
                      <CommentInputWrap>
                        <div>
                          {[...Array(5)].map((star, i) => {
                            const ratingValue = i + 1;
                            return (
                              <label key={i}>
                                <Radio
                                  type="radio"
                                  name="rating"
                                  value={ratingValue}
                                  onClick={() => setRatings(ratingValue)}
                                  // onChange={() => setRating(list.ratingAvg)}
                                />
                                <SStar
                                  size={20}
                                  color={
                                    ratingValue <= (hover || ratings)
                                      ? "#ffc107"
                                      : "black"
                                  }
                                  onMouseEnter={() => setHover(ratingValue)}
                                  onMouseLeave={() => setHover(0)}
                                />
                              </label>
                              //list.ratingAvg  ===  hover || rating
                            );
                          })}
                        </div>
                        <CommentInput
                          type="text"
                          // autoFocus={true}
                          placeholder="평가를 입력해 주세요"
                          ref={commentRef}
                          onKeyUp={(e) => {
                            if (e.key === "Enter") {
                              {
                                __uploadComment();
                              }
                            }
                          }}
                          onChange={(e) => setComment(e.target.value)}
                        ></CommentInput>
                      </CommentInputWrap>
                      {/* <NowPlayingSection /> */}
                      <TestCarousel />
                    </Inner>
                  </InnerOut>

                  {/* 패딩전용  */}
                  <Actions>
                    <StarRate>
                      <RatingWrapper>
                        {/* <Rating size="large" /> */}
                      </RatingWrapper>
                    </StarRate>
                    <Divider />
                  </Actions>
                  <Actions>
                    <StarRate>
                      <RatingWrapper>
                        {/* <Rating size="large" /> */}
                      </RatingWrapper>
                    </StarRate>
                    <Divider />
                  </Actions>
                </ContentWrapper>
              </Containers>
            </Mains>
          </TopInfo>

          {/* 리뷰 정보 */}
        </>
      </Base>
    </AppLayout>
  );
}
const TitlesRapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const OndoProgress = styled.div`
  transition: all 2s ease-in-out;
  width: 25%;
`;
// const OndoProgress = styled(Progress)`
//   transition: all 2s ease-in-out;
//   width: 25%;
// `;

const UserStates = styled.div`
  display: flex;
  margin-top: 30px;
  /* border: 1px solid pink; */
  border-radius: 5px;
  padding: 5px;
  justify-content: center;
  text-align: center;
  align-item: center;
  background-color: white;
`;

const ImgWrap = styled.div`
  display: flex;
  justify-content: end;
  // margin-bottom: 5px;
  padding-right: 15px;
`;
const Like = styled.div`
  padding: 2px;
  margin-right: 5px;
  position: relative;
  &:active {
    animation: box-ani 0.05s linear forwards;
  }
`;

const LikeImg = styled.img`
  /* visibility: hidden; */
  width: 2rem;
  cursor: pointer;
`;

const LikeBase = styled.img`
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 0;
  left: 0;
`;
const LikeBaseImg = styled.img`
  transition: all 1s ease-out;
  height: 2rem;
  width: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  /* opacity: 0; */
`;
const InnerOut = styled.div`
  display: flex;
`;
const Inner = styled.div`
  /* margin-left: 20px; */
  width: 70%;
  padding-top: 10px;
  // overflow: hidden;
  margin-left: 125px;
`;

const CommentFeedUser = styled.div`
  margin-top: 5px;
  display: flex;
`;
const CommentProfile = styled.img`
  width: 7%;
  border-radius: 100%;
  margin-top: 5px;
`;
const CommentUsername = styled.span`
  margin-left: 12px;
`;
const CommentUsernames = styled.span`
  font-size: 0.8em;
  margin-left: 20px;
`;
const CommentCount = styled.div`
  padding: 2px;
  margin-left: 140px;
`;

const CommentImg = styled.img`
  width: 2rem;
  background-positsion: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const CommentInput = styled.input`
  outline: none;
  border: none;
  padding: 5px;
  width: 100%;
  /* height: 100%; */
`;
const CommentDeleteBtn = styled.span`
  font-size: 0.7rem;
  color: blue;
  opacity: 80%;
  cursor: pointer;
  white-space: nowrap;
`;
const CommentInputWrap = styled.div`
  height: 10%;
  width: 100%;
  /* overflow: scroll; */
`;

const CommentContent = styled.div`
  padding: 10px 4px;
  display: flex;
  margin-left: 20px;
  justify-content: space-between;
`;

const CommentDivider = styled.hr`
  background-color: pink;
  opacity: 40%;
`;

const CommentWrap = styled.div`
  overflow-y: scroll;
  padding-left: 20px;
  padding-right: 10px;
  height: 23vh;
  width: 100%;
  // border-left: 1px solid gray;
  // border-top: 1px solid gray;
  // border-right: 1px solid gray;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  &::-webkit-scrollbar-track {
    background-color: palevioletred;
  }
`;
const CommentLine = styled.hr`
  width: 100%;
`;

export default WineDetail;
