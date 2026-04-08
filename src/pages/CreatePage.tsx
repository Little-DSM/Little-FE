import { useState } from 'react';
import { ImgSelector, MajorSelector, TextArea, Toggle } from '../components';
import Input from '../components/Input';
import { major } from '../types';
import { colors, Flex } from '../styles/theme';
import Button from '../components/Button';

export const CreatePage = () => {
  const [selectedMajor, setSelectedMajor] = useState<string>(major[0]);
  const [datas, setDatas] = useState<{
    title: string;
    content: string;
    major: string;
    imgFile: File | null;
    preview: string | null;
    isMentee?: boolean;
  }>({
    title: '',
    content: '',
    major: selectedMajor,
    imgFile: null,
    preview: null,
    isMentee: false,
  });

  const handleAddImage = (index: number, file: File, preview: string) => {
    setDatas((prev) => {
      if (prev.preview) URL.revokeObjectURL(prev.preview);

      return {
        ...prev,
        imgFile: file,
        preview,
      };
    });
  };

  const handleDeleteImage = (index: number) => {
    setDatas((prev) => {
      if (prev.preview) URL.revokeObjectURL(prev.preview);

      return {
        ...prev,
        imgFile: null,
        preview: null,
      };
    });
  };
  const handleOnChange = (label: string, value: string) => {
    setDatas((prev) => ({ ...prev, [label]: value }));
  };

  return (
    <Flex width="100%" gap={24}>
      <Flex width="100%" isColumn gap={40}>
        <ImgSelector
          preview={datas.preview}
          index={0}
          onAdd={handleAddImage}
          onDelete={handleDeleteImage}
        />
        <Input
          onChange={(e) => handleOnChange('title', e.target.value)}
          value={datas.title}
          label="제목"
          placeholder="제목을 입력하세요.."
        />
        <MajorSelector
          setSelectedMajor={setSelectedMajor}
          selectedMajor={selectedMajor}
        />
        <TextArea
          onChange={(e) => handleOnChange('content', e.target.value)}
          value={datas.content}
          placeholder="설명을 입력하세요.."
          label="멘토링 내용"
        />
      </Flex>
      <Flex style={{ flexShrink: 0 }} gap={12} alignItems="center">
        <Toggle
          value={datas.isMentee}
          onChange={(value) =>
            setDatas((prev) => ({ ...prev, isMentee: value }))
          }
          label="멘티로 올리기"
        />
        <Flex gap={8}>
          <Button>게시</Button>
          <Button backgroundColor={colors.gray[50]} color={colors.gray[900]}>
            이전
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
