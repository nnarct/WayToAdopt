export interface AuthContextType {
  token: string | null;
  expires: string | null;
  setAuth: (token: string, expires: string) => void;
  clearAuth: () => void;
}

export interface LoginCredentialsType {
  email: string;
  password: string;
}
export interface SignupFormType {
  firstName: string;
  lastName: string;
  dob: number;
  gender: 0 | 1 | 2;
  tel: any;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface SignupType {
  firstName: string;
  lastName: string;
  dob: number;
  gender: 0 | 1 | 2;
  tel: string;
  email: string;
  password: string;
}

export interface UserProfileType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  dob: number;
  gender: 0 | 1; //0male 1female
}

export interface PostDetailsType {
  id: string;
  postTitle: string;
  petType: string;
  petBreed: string;
  petDob: number;
  status: number;
  petPic: string;
}

export interface PostCard {
  id: string;
  postTitle: string;
  petType: string | null;
  petBreed: string;
  petDob: number;
  petPic: string;
}

export interface AnswerListType {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: number;
}

export interface PostListItemType {
  id: string;
  postTitle: string;
  petType: string;
  petDob: number;
  petPic: string;
}
export interface QuestionType {
  id: string;
  question: string;
}
export interface AnswersType {
  questionId: string;
  answer: string;
}
// export interface Post {
//   postTitle: string;
//   petPic: string;
//   petGender: string;
//   petDetail: string;
//   petDOB: string;
//   petType: string;
//   petBreed: string;
//   petHouseBreaking: string;
//   petSterilized: string;
//   petVaccinated: string;
//   petWean: string;
// }

export interface ImageDraggerPhotoType {
  file: File | null;
  filename: string;
  image: string;
}
// todo : create post data type
