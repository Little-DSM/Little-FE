import styled from '@emotion/styled';
import { colors, Flex, Text } from '../styles/theme';
import Button from './Button';
import { useRef } from 'react';

interface ModalType {
  onClick?: () => void;
  isOpen?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteModal = ({ onClick, isOpen, setIsOpen }: ModalType) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      setIsOpen(false);
    }
  };

  const handleCancelClick = () => {
    setIsOpen(false);
  };
  return (
    isOpen && (
      <Background ref={modalRef} onClick={handleModalClick}>
        <ContentWrapper>
          <Flex isColumn gap={8} width="100%">
            <Text fontSize={20} fontWeight={600} color={colors.gray[900]}>
              삭제하시겠습니까?
            </Text>
            <Text fontSize={16} fontWeight={400} color={colors.gray[400]}>
              삭제하시면 되돌리실 수 없습니다
            </Text>
          </Flex>
          <Flex width="100%" justifyContent="end" gap={8}>
            <Button onClick={onClick}>삭제</Button>
            <Button
              onClick={handleCancelClick}
              backgroundColor={colors.gray[50]}
              color={colors.gray[900]}
            >
              이전
            </Button>
          </Flex>
        </ContentWrapper>
      </Background>
    )
  );
};

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #24202018;
  position: fixed;
  top: 0;
  left: 0;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 404px;
  background-color: ${colors.gray[0]};
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 68px;
`;
