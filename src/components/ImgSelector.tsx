import styled from '@emotion/styled';
import { ImgAdd } from '../assets';
import { colors } from '../styles/theme';
import { useRef } from 'react';

interface ImgSelectorProps {
  preview: string | null;
  onAdd: (file: File, preview: string) => void;
  onDelete: () => void;
}

export const ImgSelector = ({ preview, onAdd, onDelete }: ImgSelectorProps) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    onAdd(file, url);

    e.target.value = '';
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <Wrapper onClick={handleClick} hasImage={!!preview}>
      {preview ? (
        <>
          <Image src={preview} alt="preview" />
          <DeleteButton onClick={handleDelete}>✕</DeleteButton>
        </>
      ) : (
        <ImgAdd />
      )}
      <HiddenInput type="file" ref={fileRef} onChange={handleChange} />
    </Wrapper>
  );
};

const HiddenInput = styled.input`
  display: none;
`;

const Wrapper = styled.div<{ hasImage: boolean }>`
  cursor: pointer;
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
