"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};
const Feed = () => {
  const [search, setsearch] = useState("");
  const [posts, setPosts] = useState([]);
  console.log(search);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
      const searchResult = [];
      posts.map((post) => {
        if (
          post.prompt.includes(search) ||
          post.tag.includes(search) ||
          post.creator.username.includes(search)
        ) {
          if (!searchResult.includes(post)) {
            searchResult.push(post);
            console.log(post);
          }
        }
        setPosts(searchResult);
      });
    };
    fetchPosts();
  }, [search]);

  return (
    <section className="feed">
      <form className="relatiev w-full flex-center">
        <input
          type="text"
          placeholder="Search fo a tag or a username"
          onChange={(e) => {
            setsearch(e.target.value);
          }}
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts}  handleChangeClick={() => {}} />
    </section>
  );
};

export default Feed;
