import { useState } from "react";
import styled from "@emotion/styled";
import { colors } from "../styles/theme";
import Button from "./Button";
import particIcon from "../assets/partic_icon.svg";
import arrowRight from "../assets/arrow_right.svg";

interface Applicant {
  id: number;
  name: string;
  profileImg?: string;
}

interface ParticModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (selectedId: number | null) => void;
  onPrev?: () => void;
}

const APPLICANTS: Applicant[] = [
  {
    id: 1,
    name: "박지연",
    profileImg:
      "https://i.pinimg.com/736x/05/7a/16/057a1660313978eadc03d6d0c793b20d.jpg",
  },
  {
    id: 2,
    name: "박지연",
    profileImg:
      "https://i.pinimg.com/736x/a4/3e/05/a43e051017a945eddf90d667fbf3857c.jpg",
  },
  { id: 3, name: "박지연" },
  { id: 4, name: "박지연" },
  { id: 5, name: "박지연" },
  { id: 6, name: "박지연" },
];

export const ParticModal = ({
  isOpen,
  onClose,
  onConfirm,
  onPrev,
}: ParticModalProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <HeaderSection>
          <Title>지원자 목록</Title>
          <Divider />
        </HeaderSection>

        <ListWrapper>
          {APPLICANTS.map((applicant) => (
            <ApplicantRow
              key={applicant.id}
              onClick={() => setSelectedId((prev) => prev === applicant.id ? null : applicant.id)}
            >
              <RadioCircle selected={selectedId === applicant.id}>
                {selectedId === applicant.id && <CheckMark>✓</CheckMark>}
              </RadioCircle>
              <InfoBox>
                <ProfileAvatar>
                  {applicant.profileImg ? (
                    <ProfileImg
                      src={applicant.profileImg}
                      alt={applicant.name}
                    />
                  ) : (
                    <DefaultIcon src={particIcon} alt="default profile" />
                  )}
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
          <Button onClick={() => onConfirm?.(selectedId)}>멘토링 진행</Button>
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

const ApplicantRow = styled.div`
  display: flex;
  align-items: center;
  height: 68px;
  width: 100%;
  gap: 16px;
  cursor: pointer;
`;

const RadioCircle = styled.div<{ selected: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid
    ${({ selected }) => (selected ? colors.main[1] : colors.gray[100])};
  background-color: ${({ selected }) =>
    selected ? colors.main[1] : "transparent"};
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
