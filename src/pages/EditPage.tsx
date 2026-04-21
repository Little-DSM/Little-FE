import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ImgSelector, MajorSelector, TextArea } from '../components';
import Input from '../components/Input';
import { colors, Flex } from '../styles/theme';
import Button from '../components/Button';
import { usePostDetail, useUpdatePost, useDeletePost } from '../hooks/usePosts';

export const EditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const postId = Number(id);

  const { data: post, isLoading } = usePostDetail(postId);
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost(postId);
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

  const [selectedMajor, setSelectedMajor] = useState('');
  const [datas, setDatas] = useState({
    title: '',
    description: '',
    imgFile: null as File | null,
    preview: null as string | null,
  });

  useEffect(() => {
    if (post) {
      setSelectedMajor(post.major);
      setDatas({
        title: post.title,
        description: post.description,
        imgFile: null,
        preview: post.image_url,
      });
    }
  }, [post]);

  const handleAddImage = (file: File, preview: string) => {
    setDatas((prev) => {
      if (prev.preview && !prev.imgFile) return { ...prev, imgFile: file, preview };
      if (prev.preview) URL.revokeObjectURL(prev.preview);
      return { ...prev, imgFile: file, preview };
    });
  };

  const handleDeleteImage = () => {
    setDatas((prev) => {
      if (prev.imgFile && prev.preview) URL.revokeObjectURL(prev.preview);
      return { ...prev, imgFile: null, preview: null };
    });
  };

  const handleSubmit = () => {
    if (!datas.title.trim()) return alert('제목을 입력해주세요.');

    updatePost(
      {
        title: datas.title,
        description: datas.description,
        major: selectedMajor,
      },
      {
        onSuccess: () => navigate(`/main/view/${postId}`),
        onError: (err: any) => alert(err?.response?.data?.detail ?? '수정 실패'),
      },
    );
  };

  const handleDelete = () => {
    if (!confirm('게시글을 삭제하시겠습니까?')) return;
    deletePost(postId, {
      onSuccess: () => navigate('/main'),
      onError: (err: any) => alert(err?.response?.data?.detail ?? '삭제 실패'),
    });
  };

  if (isLoading) return null;

  return (
    <Flex width="100%" gap={24}>
      <Flex width="100%" isColumn gap={40}>
        <ImgSelector
          preview={datas.preview}
          onAdd={handleAddImage}
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
          <Button onClick={handleSubmit} disabled={isUpdating}>
            {isUpdating ? '수정 중...' : '수정'}
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            backgroundColor={colors.gray[50]}
            color={colors.gray[900]}
          >
            삭제
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
