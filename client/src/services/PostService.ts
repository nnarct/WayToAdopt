class PostService {
  async getPostDetails(postId: string): Promise<boolean> {
    try {
      console.log({ postId });
      return true;
    } catch (error) {
      console.error("Error occurred during login:", error);
      return false;
    }
  }

  async postAdoptionForm(
    values: any,
    postID: string,
    userID: string
  ): Promise<boolean> {
    try {
      console.log({ values });
      return true;
    } catch (error) {
      console.error("Error occurred during login:", error);
      return false;
    }
  }
}

export default new PostService();
