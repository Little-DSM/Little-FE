import styled from "@emotion/styled";
import { colors } from "../styles/theme";
import particIcon from "../assets/partic_icon.svg";
import starFilled from "../assets/star_filled.svg";
import starEmpty from "../assets/star_empty.svg";

interface ReviewCardProps {
  name: string;
  profileImg?: string;
  rating: number;
  date: string;
  postTitle: string;
  content: string;
}

export const ReviewCard = ({
  name,
  profileImg,
  rating,
  date,
  postTitle,
  content,
}: ReviewCardProps) => {
  return (
    <Card>
      <TopSection>
        <AvatarNameRow>
          <ProfileAvatar>
            {profileImg ? (
              <ProfileImg src={profileImg} alt={name} />
            ) : (
              <DefaultIcon src={particIcon} alt="default profile" />
            )}
          </ProfileAvatar>
          <Name>{name}</Name>
        </AvatarNameRow>
        <StarDateRow>
          <Stars>
            {Array.from({ length: 5 }, (_, i) => (
              <img
                key={i}
                src={i < rating ? starFilled : starEmpty}
                alt={i < rating ? "filled star" : "empty star"}
                width={14}
                height={14}
              />
            ))}
          </Stars>
          <DateText>{date}</DateText>
        </StarDateRow>
        <PostTitle>{postTitle}</PostTitle>
      </TopSection>
      <Content>{content}</Content>
    </Card>
  );
};

const Card = styled.div`
  width: 310px;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AvatarNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProfileAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${colors.gray[100]};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DefaultIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const Name = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.gray[900]};
`;

const StarDateRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Stars = styled.div`
  display: flex;
  gap: 2px;
`;

const DateText = styled.span`
  font-size: 8px;
  font-weight: 400;
  color: ${colors.gray[300]};
`;

const PostTitle = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${colors.gray[300]};
`;

const Content = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: ${colors.gray[900]};
  margin: 0;
`;
