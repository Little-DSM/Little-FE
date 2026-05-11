import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImgSelector, MajorSelector, TextArea, Toggle } from "../components";
import Input from "../components/Input";
import { colors, Flex, Text } from "../styles/theme";
import Button from "../components/Button";
import { useCreatePost } from "../hooks/usePosts";

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => reject(new Error("이미지를 읽지 못했습니다."));
    reader.readAsDataURL(file);
  });

export const CreatePage = () => {
  const navigate = useNavigate();
  const [selectedMajor, setSelectedMajor] = useState<string>('');
  const [role, setRole] = useState<'MENTEE' | 'MENTOR'>('MENTEE');
  const [datas, setDatas] = useState({
    title: "",
    description: "",
    imgFile: null as File | null,
    preview: null as string | null,
    imageUrl: null as string | null,
  });

  const { mutate: createPost, isPending } = useCreatePost();

  const handleAddImage = async (file: File, preview: string) => {
    try {
      const imageUrl = await readFileAsDataUrl(file);
      setDatas((prev) => {
        if (prev.preview) URL.revokeObjectURL(prev.preview);
        return { ...prev, imgFile: file, preview, imageUrl };
      });
    } catch {
      URL.revokeObjectURL(preview);
      alert("이미지를 불러오지 못했습니다.");
    }
  };

  const handleDeleteImage = () => {
    setDatas((prev) => {
      if (prev.preview) URL.revokeObjectURL(prev.preview);
      return { ...prev, imgFile: null, preview: null, imageUrl: null };
    });
  };

  const handleSubmit = () => {
    if (!datas.title.trim()) return alert("제목을 입력해주세요.");
    if (!datas.description.trim()) return alert("멘토링 내용을 입력해주세요.");

    createPost(
      {
        title: datas.title,
        description: datas.description,
        major: selectedMajor,
        image_url: datas.imageUrl,
        role,
      },
      {
        onSuccess: (post) => navigate(`/main/view/${post.id}`),
        onError: (err: any) =>
          alert(err?.response?.data?.detail ?? "게시 실패"),
      },
    );
  };

  return (
    <Flex width="100%" gap={24} paddingBottom="80px" paddingTop="40px">
      <Flex width="100%" isColumn gap={40}>
        <ImgSelector
          preview={datas.preview}
          onAdd={handleAddImage}
          onDelete={handleDeleteImage}
        />
        <Input
          onChange={(e) =>
            setDatas((prev) => ({ ...prev, title: e.target.value }))
          }
          value={datas.title}
          label="제목"
          placeholder="제목을 입력하세요.."
        />
        <MajorSelector
          setSelectedMajor={setSelectedMajor}
          selectedMajor={selectedMajor}
        />
        <Flex isColumn gap={12}>
          <Text fontSize={16} color={colors.gray[900]}>
            역할
          </Text>
          <Flex alignItems="center" gap={12}>
            <Text fontSize={14} color={role === 'MENTEE' ? colors.gray[900] : colors.gray[500]}>
              멘티
            </Text>
            <Toggle
              value={role === 'MENTOR'}
              onChange={(isMentor) => setRole(isMentor ? 'MENTOR' : 'MENTEE')}
            />
            <Text fontSize={14} color={role === 'MENTOR' ? colors.gray[900] : colors.gray[500]}>
              멘토
            </Text>
          </Flex>
        </Flex>
        <TextArea
          onChange={(e) =>
            setDatas((prev) => ({ ...prev, description: e.target.value }))
          }
          value={datas.description}
          placeholder="설명을 입력하세요.."
          label="멘토링 내용"
        />
      </Flex>
      <Flex style={{ flexShrink: 0 }} gap={12} alignItems="center">
        <Flex gap={8}>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "게시 중..." : "게시"}
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
