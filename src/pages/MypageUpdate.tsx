import { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { colors, Flex, Text } from '../styles/theme';
import { useMe, useUpdateMe } from '../hooks/useMe';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import { TextArea } from '../components/TextArea';
import Button from '../components/Button';
import MajorButton from '../components/MajorButton';
import { DefaultProfileIcon, PencilIcon } from '../assets';

const MAJORS = [
  'Frontend', 'Backend', 'iOS', 'Android',
  'Game', 'Embedded', 'Security', 'AI', 'Design', 'DevOps',
];

const formatContact = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length < 4) return digits;
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
};

export const MypageUpdate = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const { data: me } = useMe();
  const { mutate: updateMe, isPending } = useUpdateMe();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [customMajor, setCustomMajor] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (!me) return;
    setName(me.name);
    setContact(me.contact ?? '');
    setIntroduction(me.introduction ?? '');
    setPreviewImage(me.profile_image);
    if (me.major) {
      if (MAJORS.includes(me.major)) {
        setSelectedMajor(me.major);
      } else {
        setIsCustom(true);
        setCustomMajor(me.major);
      }
    }
  }, [me]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleMajorSelect = (major: string) => {
    setSelectedMajor(major);
    setIsCustom(false);
    setCustomMajor('');
  };

  const handleCustomSelect = () => {
    setSelectedMajor('');
    setIsCustom(true);
  };

  const handleSave = () => {
    const major = isCustom ? customMajor : selectedMajor;
    updateMe(
      {
        name: name || undefined,
        contact: contact || null,
        introduction: introduction || undefined,
        major: major || undefined,
        profile_image: previewImage || undefined,
      },
      { onSuccess: async () => { await refreshUser(); navigate('/main/my'); } },
    );
  };

  return (
    <Flex width="100%" isColumn gap={60} paddingBottom="80px">
      <Flex width="100%" justifyContent="flex-end" gap={8}>
        <Button onClick={handleSave} disabled={isPending}>
          {isPending ? '저장 중...' : '저장'}
        </Button>
        <Button
          onClick={() => navigate('/main/my')}
          backgroundColor={colors.gray[50]}
          color={colors.gray[900]}
        >
          이전
        </Button>
      </Flex>

      <Flex width="100%" isColumn gap={60} alignItems="center">
        <Profile>
          <ProfileImg
            src={previewImage ?? DefaultProfileIcon}
            alt="프로필"
            onError={(e) => { e.currentTarget.src = DefaultProfileIcon; }}
          />
          <EditButton onClick={() => fileInputRef.current?.click()}>
            <img src={PencilIcon} alt="프로필 수정" width={16} height={16} />
          </EditButton>
          <HiddenInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Profile>

        <FormSection>
          <Input
            label="이름"
            placeholder="이름을 입력해주세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="연락처"
            placeholder="연락처를 입력해주세요."
            value={contact}
            onChange={(e) => setContact(formatContact(e.target.value))}
          />

          <TextArea
            label="소개"
            placeholder="자기소개를 입력해주세요."
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
          />

          <Flex isColumn gap={12}>
            <Text fontSize={16} color={colors.gray[900]}>전공</Text>
            <Flex gap={8} flexWrap="wrap">
              {MAJORS.map((major) => (
                <MajorButton
                  key={major}
                  isClick={selectedMajor === major && !isCustom}
                  onClick={() => handleMajorSelect(major)}
                >
                  {major}
                </MajorButton>
              ))}
              <MajorButton isClick={isCustom} onClick={handleCustomSelect}>
                기타
              </MajorButton>
            </Flex>
            {isCustom && (
              <Input
                placeholder="전공을 직접 입력해주세요."
                value={customMajor}
                onChange={(e) => setCustomMajor(e.target.value)}
              />
            )}
          </Flex>
        </FormSection>
      </Flex>
    </Flex>
  );
};

const Profile = styled.div`
  width: 172px;
  height: 172px;
  border-radius: 100%;
  position: relative;
  flex-shrink: 0;
`;

const ProfileImg = styled.img`
  width: 172px;
  height: 172px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${colors.gray[100]};
`;

const EditButton = styled.button`
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.gray[200]};
  border-radius: 100%;
  position: absolute;
  bottom: 4px;
  right: 4px;
  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  max-width: 600px;
`;
