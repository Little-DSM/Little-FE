import styled from "@emotion/styled";
import { BarChart, Bar, XAxis, LabelList, Rectangle } from "recharts";
import { useParams } from "react-router-dom";
import { colors, Flex, Text } from "../styles/theme";
import { DefaultProfileIcon } from "../assets";
import { MajorTag } from "../components/MajorTag";
import { ReviewCard } from "../components/ReviewCard";
import bigStar from "../assets/big_star.svg";
import { useMentorDetail, useMentorReviews } from "../hooks/useMentors";

export const MentorPage = () => {
  const { id } = useParams<{ id: string }>();
  const mentorId = Number(id);

  const { data: mentor, isLoading, isError } = useMentorDetail(mentorId);
  const { data: reviewData } = useMentorReviews(mentorId);

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

  if (isLoading) {
    return <Text fontSize={16} color={colors.gray[600]}>불러오는 중...</Text>;
  }

  if (isError || !mentor) {
    return <Text fontSize={16} color={colors.gray[600]}>멘토 정보를 불러오지 못했습니다.</Text>;
  }

  return (
    <Flex width="100%" gap={100}>
      <Flex isColumn gap={86} paddingTop="20px" paddingLeft="20px">
        <Flex gap={40} alignItems="center">
          <Profile>
            <ProfileImgEl
              src={mentor.profile_image ?? DefaultProfileIcon}
              alt="프로필"
              onError={(e) => { e.currentTarget.src = DefaultProfileIcon; }}
            />
          </Profile>

          <Flex isColumn gap={12}>
            <Text fontSize={24} fontWeight={600}>{mentor.name}</Text>
            {mentor.tech_stack && (
              <Text fontSize={20} fontWeight={400} color={colors.gray[500]}>
                {mentor.tech_stack}
              </Text>
            )}
            {mentor.major && (
              <Flex gap={10}>
                <MajorTag major={mentor.major} variant="dark" />
              </Flex>
            )}
          </Flex>
        </Flex>

        <Flex isColumn gap={16}>
          <Text fontSize={16} fontWeight={500}>게시물</Text>
          <Text fontSize={16} color={colors.gray[500]}>게시글이 없습니다.</Text>
        </Flex>
      </Flex>

      <Flex isColumn gap={24}>
        <Flex gap={40} alignItems="center">
          <Flex isColumn gap={8} alignItems="center">
            <Flex gap={8} alignItems="center">
              <img src={bigStar} alt="star" width={32} height={32} />
              <Text fontSize={28} fontWeight={700} color={colors.gray[1000]}>
                {reviewData?.average_rating != null
                  ? reviewData.average_rating.toFixed(1)
                  : mentor.rating_average != null
                  ? mentor.rating_average.toFixed(1)
                  : "-"}
              </Text>
            </Flex>
            <Text fontSize={20} fontWeight={400} color={colors.gray[300]}>
              총 {reviewData?.total_reviews ?? mentor.rating_count ?? 0}건
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

        <Flex isColumn gap={30}>
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

const Profile = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 100%;
  position: relative;
`;

const ProfileImgEl = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${colors.gray[100]};
`;
