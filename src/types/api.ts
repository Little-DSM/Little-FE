export interface AuthTokenPairResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface MyPageResponse {
  email: string | null;
  id: number;
  introduction: string | null;
  major: string;
  name: string;
  profile_image: string | null;
  rating_average: number | null;
  rating_count: number;
}

export interface MyPageUpdateRequest {
  introduction?: string;
  major?: string;
  name?: string;
  profile_image?: string;
}

export interface MentoringProgressItem {
  completed_at: string | null;
  counterpart_contact: string;
  counterpart_id: number;
  counterpart_name: string;
  major: string;
  mentor_contact: string;
  mentor_id: number;
  mentor_name: string;
  my_role: 'MENTEE' | 'MENTOR';
  post_id: number;
  selected_at: string;
  status: 'IN_PROGRESS' | 'COMPLETED';
  title: string;
}

export interface MentoringProgressListResponse {
  items: MentoringProgressItem[];
}

export interface MyPostItem {
  post_id: number;
  title: string;
  image_url: string | null;
  major: string;
  author_name: string;
  created_at: string;
  view_count: number;
}

export interface MyPostListResponse {
  total_count: number;
  items: MyPostItem[];
}

export interface UserSummary {
  id: number;
  major: string;
  name: string;
}

export interface MentoringPostDetail {
  author: UserSummary;
  created_at: string;
  description: string;
  id: number;
  image_url: string | null;
  major: string;
  title: string;
}

export interface MentoringPostListItem {
  created_at: string;
  description: string;
  id: number;
  image_url: string | null;
  major: string;
  title: string;
}

export interface MentoringPostCreate {
  description: string;
  image_url?: string | null;
  major: string;
  title: string;
}

export interface MentoringPostUpdate {
  description?: string;
  image_url?: string | null;
  major?: string;
  title?: string;
}

export interface MentorApplicationSummary {
  id: number;
  major: string;
  name: string;
  profile_image: string | null;
  tech_stack: string;
}

export interface MentorApplicationsResponse {
  mentors: MentorApplicationSummary[];
  post_id: number;
}

export interface MentorSelectRequest {
  mentor_id: number;
}

export interface MentorSelectResponse {
  mentor: MentorApplicationSummary;
  post_id: number;
  selected_at: string;
}

export interface ReviewCreateRequest {
  comment: string;
  rating: number;
}

export interface ReviewResponse {
  comment: string;
  created_at: string;
  mentee_id: number;
  mentor_id: number;
  post_id: number;
  rating: number;
}

export interface MentorDetailResponse {
  application_count: number;
  contact: string;
  email: string;
  id: number;
  major: string;
  name: string;
  profile_image: string | null;
  rating_average: number;
  rating_count: number;
  tech_stack: string;
}

export interface MentorReviewItem {
  nickname: string;
  created_at: string;
  post_title: string;
  comment: string;
  rating: number;
}

export interface RatingDistribution {
  five_star: number;
  four_star: number;
  one_star: number;
  three_star: number;
  two_star: number;
}

export interface MentorReviewSummaryResponse {
  average_rating: number | null;
  distribution: RatingDistribution;
  mentor_id: number;
  reviews: MentorReviewItem[];
  total_reviews: number;
}
