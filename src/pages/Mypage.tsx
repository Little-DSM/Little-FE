import styled from "@emotion/styled";
import { BarChart, Bar, XAxis, LabelList, Rectangle } from "recharts";
import { colors, Flex, Text } from "../styles/theme";
import { ProfileIcon, PencilIcon } from "../assets";
import { MajorTag } from "../components/MajorTag";
import { Post } from "../components/Post";
import { ReviewCard } from "../components/ReviewCard";
import bigStar from "../assets/big_star.svg";

const RATING_DATA = [
  { label: "1점", value: 30 },
  { label: "2점", value: 10 },
  { label: "3점", value: 20 },
  { label: "4점", value: 40 },
  { label: "5점", value: 10 },
];

const MAX_VALUE = Math.max(...RATING_DATA.map((d) => d.value));

const DUMMY_REVIEWS = [
  {
    id: 1,
    name: "익명의 고라니",
    rating: 1,
    date: "2025.10.10",
    postTitle: "[React 멘토링 해주세요]",
    content: "너무 별로에요.",
  },
  {
    id: 2,
    name: "행복한 토끼",
    profileImg:
      "https://i.pinimg.com/736x/05/7a/16/057a1660313978eadc03d6d0c793b20d.jpg",
    rating: 4,
    date: "2025.10.10",
    postTitle: "[React 멘토링 해주세요]",
    content: "설명을 정말 잘 해주셨어요. 덕분에 많이 배웠습니다!",
  },
  {
    id: 3,
    name: "조용한 판다",
    rating: 3,
    date: "2025.10.09",
    postTitle: "[Next.js 멘토링 부탁드려요]",
    content: "무난했습니다. 조금 더 자세한 설명이 있었으면 좋겠어요.",
  },
];

const DUMMY_POSTS = [
  {
    id: 1,
    title: "리액트에 대해 알려주세요!알려달라고요..",
    author: "오찬영",
    date: "2024.10.11.",
    view: 120000,
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkJPKBtdZlkQMf3wB1nhKDThY_drt2UyZ_kg&s",
    major: "Frontend",
  },
  {
    id: 2,
    title: "리액트에 대해 알려주세요!알려달라고요..",
    author: "오찬영",
    date: "2024.10.11.",
    view: 120000,
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkJPKBtdZlkQMf3wB1nhKDThY_drt2UyZ_kg&s",
    major: "Frontend",
  },
  {
    id: 3,
    title: "리액트에 대해 알려주세요!알려달라고요..",
    author: "오찬영",
    date: "2024.10.11.",
    view: 120000,
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkJPKBtdZlkQMf3wB1nhKDThY_drt2UyZ_kg&s",
    major: "Frontend",
  },
  {
    id: 4,
    title: "리액트에 대해 알려주세요!알려달라고요..",
    author: "오찬영",
    date: "2024.10.11.",
    view: 120000,
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkJPKBtdZlkQMf3wB1nhKDThY_drt2UyZ_kg&s",
    major: "Frontend",
  },
  {
    id: 5,
    title: "리액트에 대해 알려주세요!알려달라고요..",
    author: "오찬영",
    date: "2024.10.11.",
    view: 120000,
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkJPKBtdZlkQMf3wB1nhKDThY_drt2UyZ_kg&s",
    major: "Frontend",
  },
  {
    id: 6,
    title: "리액트에 대해 알려주세요!알려달라고요..",
    author: "오찬영",
    date: "2024.10.11.",
    view: 120000,
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkJPKBtdZlkQMf3wB1nhKDThY_drt2UyZ_kg&s",
    major: "Frontend",
  },
];

export const Mypage = () => {
  return (
    <Flex width="100%" gap={100}>
      <Flex isColumn={true} gap={86} paddingTop="20px" paddingLeft="20px">
        <Flex gap={40} alignItems="center">
          <Profile>
            <ProfileImg src={ProfileIcon} alt="프로필" />
            <UpdateButton>
              <UpdateImg src={PencilIcon} alt="프로필 수정" />
            </UpdateButton>
          </Profile>

          <Flex isColumn={true} gap={12}>
            <Text fontSize={24} fontWeight={600}>
              {"오찬영"}
            </Text>
            <Text fontSize={20} fontWeight={400} color={`${colors.gray[500]}`}>
              {"안녕하세요. 전 게임전공 찬영이에요"}
            </Text>

            <Flex gap={10}>
              <MajorTag major="Game" variant="dark" />
              <MajorTag major="Game" variant="dark" />
              <MajorTag major="Game" variant="dark" />
            </Flex>
          </Flex>
        </Flex>

        <Flex isColumn={true} gap={16}>
          <Text fontSize={16} fontWeight={500}>
            게시물
          </Text>
          <PostGrid>
            {DUMMY_POSTS.map((post) => (
              <Post
                key={post.id}
                title={post.title}
                author={post.author}
                date={post.date}
                view={post.view}
                imgUrl={post.imgUrl}
                major={post.major}
              />
            ))}
          </PostGrid>
        </Flex>
      </Flex>

      <Flex isColumn={true} gap={24}>
        {/* 그래프 섹션 */}
        <Flex gap={40} alignItems="center">
          <Flex isColumn={true} gap={8} alignItems="center">
            <Flex gap={8} alignItems="center">
              <img src={bigStar} alt="star" width={32} height={32} />
              <Text fontSize={28} fontWeight={700} color={colors.gray[1000]}>
                3.2
              </Text>
            </Flex>
            <Text fontSize={20} fontWeight={400} color={colors.gray[300]}>
              총 300건
            </Text>
          </Flex>
          <BarChart
            width={220}
            height={160}
            data={RATING_DATA}
            barSize={32}
            margin={{ top: 20, right: 0, bottom: 0, left: 0 }}
          >
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: colors.gray[500] }}
            />
            <Bar
              dataKey="value"
              isAnimationActive
              animationDuration={800}
              shape={(props: any) => (
                <Rectangle
                  {...props}
                  radius={[4, 4, 0, 0]}
                  fill={props.value === MAX_VALUE ? "#4099FF" : "#DDEDFF"}
                />
              )}
            >
              <LabelList
                dataKey="value"
                position="top"
                formatter={(v: unknown) => `${v}%`}
                style={{ fontSize: 11, fill: colors.gray[500] }}
              />
            </Bar>
          </BarChart>
        </Flex>

        {/* 리뷰 섹션 */}
        <Flex isColumn={true} gap={30}>
          {DUMMY_REVIEWS.map((review) => (
            <ReviewCard
              key={review.id}
              name={review.name}
              profileImg={review.profileImg}
              rating={review.rating}
              date={review.date}
              postTitle={review.postTitle}
              content={review.content}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 256px);
  gap: 24px;
`;

const Profile = styled.div`
  width: 110px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.gray[100]};
  border-radius: 100%;
  position: relative;
`;
const UpdateButton = styled.button`
  width: 27px;
  height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.gray[200]};
  border-radius: 100%;
  position: absolute;
  bottom: 4px;
  right: 4px;
`;
const ProfileImg = styled.img`
  width: 84px;
  height: 84px;
`;
const UpdateImg = styled.img`
  width: 16px;
  height: 16px;
`;
