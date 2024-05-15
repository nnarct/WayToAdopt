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
  postID: string;
  postTitle: string;
  petType: string;
  petBreed: string;
  petDob: number;
  status: number;
  petPic: string;
}
