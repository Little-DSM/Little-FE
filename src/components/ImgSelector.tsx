import styled from '@emotion/styled';
import { ImgAdd } from '../assets';
import { colors } from '../styles/theme';
import Input from './Input';

interface ImgSelectorProps {
  imageUrl: string;
  preview: string | null;
  onChangeUrl: (url: string) => void;
  onDelete: () => void;
}

export const ImgSelector = ({ imageUrl, preview, onChangeUrl, onDelete }: ImgSelectorProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <Container>
      <Wrapper hasImage={!!preview}>
        {preview ? (
          <>
            <Image src={preview} alt="preview" />
            <DeleteButton type="button" onClick={handleDelete}>
              ✕
            </DeleteButton>
          </>
        ) : (
          <ImgAdd />
        )}
      </Wrapper>
      <Input
        value={imageUrl}
        onChange={(e) => onChangeUrl(e.target.value)}
        label="이미지 URL"
        placeholder="https://example.com/image.png"
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Wrapper = styled.div<{ hasImage: boolean }>`
  width: 282px;
  height: 202px;
  border-radius: 20px;
  background-color: ${colors.gray[50]};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  &:hover button {
    display: ${({ hasImage }) => (hasImage ? 'flex' : 'none')};
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DeleteButton = styled.button`
  display: none;
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
