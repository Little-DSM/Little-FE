import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImgSelector, MajorSelector, TextArea } from '../components';
import Input from '../components/Input';
import { major } from '../types';
import { colors, Flex } from '../styles/theme';
import Button from '../components/Button';
import { useCreatePost } from '../hooks/usePosts';

export const CreatePage = () => {
  const navigate = useNavigate();
  const [selectedMajor, setSelectedMajor] = useState<string>(major[0]);
  const [datas, setDatas] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });

  const { mutate: createPost, isPending } = useCreatePost();

  const handleDeleteImage = () => {
    setDatas((prev) => ({ ...prev, imageUrl: '' }));
  };

  const preview = datas.imageUrl.trim() || null;

  const handleSubmit = () => {
    if (!datas.title.trim()) return alert('제목을 입력해주세요.');
    if (!datas.description.trim()) return alert('멘토링 내용을 입력해주세요.');

    const imageUrl = datas.imageUrl.trim();

    createPost(
      {
        title: datas.title,
        description: datas.description,
        major: selectedMajor,
        image_url: imageUrl || null,
      },
      {
        onSuccess: (post) => navigate(`/main/view/${post.id}`),
        onError: (err: any) => alert(err?.response?.data?.detail ?? '게시 실패'),
      },
    );
  };

  return (
    <Flex width="100%" gap={24}>
      <Flex width="100%" isColumn gap={40}>
        <ImgSelector
          imageUrl={datas.imageUrl}
          preview={preview}
          onChangeUrl={(imageUrl) => setDatas((prev) => ({ ...prev, imageUrl }))}
          onDelete={handleDeleteImage}
        />
        <Input
          onChange={(e) => setDatas((prev) => ({ ...prev, title: e.target.value }))}
          value={datas.title}
          label="제목"
          placeholder="제목을 입력하세요.."
        />
        <MajorSelector setSelectedMajor={setSelectedMajor} selectedMajor={selectedMajor} />
        <TextArea
          onChange={(e) => setDatas((prev) => ({ ...prev, description: e.target.value }))}
          value={datas.description}
          placeholder="설명을 입력하세요.."
          label="멘토링 내용"
        />
      </Flex>
      <Flex style={{ flexShrink: 0 }} gap={12} alignItems="center">
        <Flex gap={8}>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? '게시 중...' : '게시'}
          </Button>
          <Button
            onClick={() => navigate(-1)}
            backgroundColor={colors.gray[50]}
            color={colors.gray[900]}
          >
            이전
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
