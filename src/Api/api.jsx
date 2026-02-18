import axios from "axios";
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPosts = () => {
  return api.get("/posts");
};

export const getPostData = async (page) => {
  const res = await api.get(`/posts?_page=${page}&_limit=5`);
  return res.data;
};

export const getIndvPostData = async (id) => {
  try {
    const res = await api.get(`/posts/${id}`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    throw new Error("Failed to fetch individual post data");
  }
};

export const deletePost = async (id) => {
  try {
    const res = await api.delete(`/posts/${id}`);
  } catch (error) {
    throw new Error("Failed to delete post");
  }
};

export const updatePost = async (id) => {
  try {
    const res = await api.patch(`/posts/${id}`, { title: "Updated Title" });
    return res.data;
  } catch (error) {
    throw new Error("Failed to delete post");
  }
};

export const fetchPage = async ({ pageParam }) => {
  try {
    const res = await api.get(
      `https://api.github.com/users?per_page=10&page=${pageParam}`,
    );
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch post");
  }
};
