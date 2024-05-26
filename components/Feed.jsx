'use client';

import PromptCard  from './PromptCard';
import { useState, useEffect } from "react";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setPosts(data);
    // setSearchedResults(posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
      clearTimeout(searchTimeout);
      setSearchText(e.target.value);
      // debounce method 
      setSearchTimeout(
        setTimeout(() => {
          const searchResult = filterSearchedData(e.target.value);
          setSearchedResults(searchResult);
        }, 500)
      );
  }

  const filterSearchedData = (text) => {
      return posts.filter(item => {
        const postContainsTerm = new RegExp(text, 'i').test(item.prompt);
        const tagContainsTerm = new RegExp(text, 'i').test(item.tag);
        return postContainsTerm || tagContainsTerm;
      });
  };

  const handleTagClick = (tag) => {
      console.log("Clicked!")
      console.log(tag);
      if (tag.indexOf('#') !== -1) {
        tag = tag.replace('#', '');
      }
      setSearchText(tag);
      const searchResult = filterSearchedData(tag);
      setSearchedResults(searchResult);
  }

  

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text" 
          placeholder="Search for a tag or username"
          value={searchText} 
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {
        searchText ? (
          <PromptCardList
            data = {searchedResults}
            handleTagClick = {handleTagClick}
          />
        ):(
          <PromptCardList
            data={posts}
            handleTagClick={handleTagClick}
          />
        )
      }


    </section>
  )
}

export default Feed