import { useState } from "react";
import styled from "@emotion/styled";
import { colors } from "../styles/theme";
import Button from "./Button";
import { DefaultProfileIcon } from "../assets";
import arrowRight from "../assets/arrow_right.svg";
import { useApplications, useSelectMentor } from "../hooks/usePosts";
import { useNavigate } from "react-router-dom";

interface ParticModalProps {
  isOpen: boolean;
  postId: number;
  onClose: () => void;
  onPrev?: () => void;
}

export const ParticModal = ({ isOpen, postId, onClose, onPrev }: ParticModalProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data, isLoading } = useApplications(postId, isOpen);
  const { mutate: selectMentor, isPending } = useSelectMentor(postId);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!selectedId) return;
    selectMentor({ mentor_id: selectedId }, { onSuccess: onClose });
  };

  return (
    <Overlay onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <HeaderSection>
          <Title>지원자 목록</Title>
          <Divider />
        </HeaderSection>

        <ListWrapper>
          {isLoading && <EmptyText>불러오는 중...</EmptyText>}
          {!isLoading && data?.mentors.length === 0 && (
            <EmptyText>지원자가 없습니다.</EmptyText>
          )}
          {data?.mentors.map((applicant) => (
            <ApplicantRow key={applicant.id}>
              <RadioCircle
                selected={selectedId === applicant.id}
                onClick={() =>
                  setSelectedId((prev) => (prev === applicant.id ? null : applicant.id))
                }
              >
                {selectedId === applicant.id && <CheckMark>✓</CheckMark>}
              </RadioCircle>
              <InfoBox onClick={() => { onClose(); navigate(`/main/mentor/${applicant.id}`); }}>
                <ProfileAvatar>
                  <ProfileImg
                    src={applicant.profile_image ?? DefaultProfileIcon}
                    alt={applicant.name}
                    onError={(e) => { e.currentTarget.src = DefaultProfileIcon; }}
                  />
                </ProfileAvatar>
                <NameText>{applicant.name}</NameText>
                <img
                  src={arrowRight}
                  alt="arrow"
                  style={{ marginLeft: "auto", flexShrink: 0 }}
                />
              </InfoBox>
            </ApplicantRow>
          ))}
        </ListWrapper>

        <ButtonRow>
          <Button onClick={handleConfirm} disabled={!selectedId || isPending}>
            멘토링 진행
          </Button>
          <Button
            onClick={onPrev}
            backgroundColor={colors.gray[100]}
            color={colors.gray[800]}
          >
            이전
          </Button>
        </ButtonRow>
      </ModalCard>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalCard = styled.div`
  width: 548px;
  height: 584px;
  padding: 26px 24px;
  background-color: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.gray[900]};
  margin: 0;
`;

const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${colors.gray[100]};
`;

const ListWrapper = styled.div`
  max-height: ${5 * 68}px;
  overflow-y: auto;
`;

const EmptyText = styled.p`
  font-size: 14px;
  color: ${colors.gray[500]};
  text-align: center;
  padding: 24px 0;
`;

const ApplicantRow = styled.div`
  display: flex;
  align-items: center;
  height: 68px;
  width: 100%;
  gap: 16px;
`;

const RadioCircle = styled.div<{ selected: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid
    ${({ selected }) => (selected ? colors.main[1] : colors.gray[100])};
  background-color: ${({ selected }) => (selected ? colors.main[1] : "transparent")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const CheckMark = styled.span`
  color: white;
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
`;

const InfoBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 12px;
  gap: 8px;
  cursor: pointer;
  &:hover { background-color: ${colors.gray[50]}; border-radius: 8px; }
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


const NameText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.gray[900]};
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: auto;
`;
