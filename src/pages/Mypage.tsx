import styled from "@emotion/styled";
import { BarChart, Bar, XAxis, LabelList, Rectangle } from "recharts";
import { colors, Flex, Text } from "../styles/theme";
import { DefaultProfileIcon, PencilIcon } from "../assets";
import { MajorTag } from "../components/MajorTag";
import { Post } from "../components/Post";
import { ReviewCard } from "../components/ReviewCard";
import bigStar from "../assets/big_star.svg";
import { useMe, useMyPosts } from "../hooks/useMe";
import { useMentorReviews } from "../hooks/useMentors";
import { useNavigate } from "react-router-dom";

export const Mypage = () => {
  const navigate = useNavigate();
  const { data: me, isLoading: meLoading, isError: meError } = useMe();
  const { data: reviewData } = useMentorReviews(me?.id);
  const { data: myPostsData } = useMyPosts();
  const displayRating = reviewData?.average_rating ?? me?.rating_average;

  const distribution = reviewData?.distribution;
  const ratingData = distribution
    ? [
        { label: "1점", value: distribution.one_star },
        { label: "2점", value: distribution.two_star },
        { label: "3점", value: distribution.three_star },
        { label: "4점", value: distribution.four_star },
        { label: "5점", value: distribution.five_star },
      ]
    : [];
  const maxValue =
    ratingData.length > 0 ? Math.max(...ratingData.map((d) => d.value)) : 0;

  if (meLoading) {
    return (
      <Text fontSize={16} color={colors.gray[600]}>
        불러오는 중...
      </Text>
    );
  }

  if (meError || !me) {
    return (
      <Text fontSize={16} color={colors.gray[600]}>
        마이페이지 정보를 불러오지 못했습니다.
      </Text>
    );
  }

  return (
    <Flex width="100%" gap={100}>
      <Flex isColumn={true} gap={86} paddingTop="20px" paddingLeft="20px">
        <Flex gap={40} alignItems="center">
          <Profile>
            <ProfileImgEl
              src={me?.profile_image ?? DefaultProfileIcon}
              alt="프로필"
              onError={(e) => { e.currentTarget.src = DefaultProfileIcon; }}
            />
            <UpdateButton onClick={() => navigate("/main/my/edit")}>
              <UpdateImg src={PencilIcon} alt="프로필 수정" />
            </UpdateButton>
          </Profile>

          <Flex isColumn={true} gap={12}>
            <Text fontSize={24} fontWeight={600}>
              {me.name}
            </Text>
            <Text fontSize={20} fontWeight={400} color={`${colors.gray[500]}`}>
              {me.introduction ?? ""}
            </Text>
            {me.major && (
              <Flex gap={10}>
                <MajorTag major={me.major} variant="dark" />
              </Flex>
            )}
          </Flex>
        </Flex>

        <Flex isColumn={true} gap={16}>
          <Text fontSize={16} fontWeight={500}>
            MY 게시물
          </Text>
          {myPostsData && myPostsData.items.length > 0 ? (
            <PostGrid>
              {myPostsData.items.map((post) => (
                <Post
                  key={post.post_id}
                  id={post.post_id}
                  title={post.title}
                  date={post.created_at}
                  image_url={post.image_url}
                  major={post.major}
                />
              ))}
            </PostGrid>
          ) : (
            <Text fontSize={16} color={colors.gray[500]}>게시글이 없습니다.</Text>
          )}
        </Flex>
      </Flex>

      <Flex isColumn={true} gap={24}>
        <Flex gap={40} alignItems="center">
          <Flex isColumn={true} gap={8} alignItems="center">
            <Flex gap={8} alignItems="center">
              <img src={bigStar} alt="star" width={32} height={32} />
              <Text fontSize={28} fontWeight={700} color={colors.gray[1000]}>
                {displayRating != null ? displayRating.toFixed(1) : "-"}
              </Text>
            </Flex>
            <Text fontSize={20} fontWeight={400} color={colors.gray[300]}>
              총 {reviewData?.total_reviews ?? me.rating_count ?? 0}건
            </Text>
          </Flex>
          {ratingData.length > 0 && (
            <BarChart
              width={220}
              height={160}
              data={ratingData}
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
                    fill={props.value === maxValue ? "#4099FF" : "#DDEDFF"}
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
          )}
        </Flex>

        <Flex isColumn={true} gap={30}>
          {reviewData?.reviews.map((review, i) => (
            <ReviewCard
              key={i}
              name={review.nickname}
              rating={review.rating}
              date={review.created_at.split("T")[0]}
              postTitle={review.post_title}
              content={review.comment}
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

const ProfileImgEl = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
`;

const UpdateImg = styled.img`
  width: 16px;
  height: 16px;
`;
