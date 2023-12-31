"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BrowserRouter, useNavigate } from "react-router-dom";
import axios from "axios";
//import { useQuery, QueryClientProvider, QueryClient } from "react-query";
import { useQuery } from "@tanstack/react-query";
import { Post } from "@prisma/client";
import {redirect} from "next/navigation";
import getPosts from "@/app/actions/getPosts";
import { SafePost, SafePostWithPlan, SafeUser } from "@/app/types";
import PostDisplay from "../PostDisplay";
import PostsGrid from "../PostsGrid";

interface SearchProps {
  posts: SafePostWithPlan[];
  currentUser?: SafeUser | null;
}

const Search : React.FC<SearchProps> = ({
  posts, 
  currentUser
}) => {
  // useNavigate() may be used only in the context of a <Router> component.
  //let navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  async function getResults(search: string) {
    console.log("Search Results: ", search);
    const body = {
      search : search,
      admin : false
    }
    axios.post("/api/searchPosts", body ).then((res) => {
      // print the response status and data
      //console.log("Search Results ASDASDASDAS");
      console.log(res.data);
      setSearchResults(res.data);
    });
  }

  // useEffect(() => {
  //   getPosts().then((posts) => setPosts(posts));
  // }, []);




  // const { data } = useQuery(
  //   ["search"], 
  //   () =>
  //   axios.get("/api/search", { params: { search } }).then((res) => {
  //     // print the response status and data
  //     console.log("Search Results ASDASDASDAS");
  //     console.log(res.data);
  //     return res.data;
  //   })
  // );

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSearching(true);
    console.log(search);
    getResults(search);
  };

  const handleSearchChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearch(e.target.value);
  };

  const handleSearchResultClick = (e: { id: any }) => {
    //navigate(`/post/${e.id}`);
    redirect(`post/${e.id}`);
  };

  return (
    <div className="w-full mx-auto pt-10 pb-5">
      <div className="w-full md:w-3/5 mx-auto rounded-lg shadow-2xl px-5 md:px-10 py-5 mb-10">
        {/* search bar here */}
        <form onSubmit={handleSearch}>
          <div className="pb-5">
            <div className="flex w-full">
              <input
                type="search"
                id="search-dropdown"
                className="p-2.5 w-full h-14 text-sm text-gray-400 bg-gray-100 rounded-lg  focus:outline focus:outline-violet-300"
                placeholder="Search Notes..."
                required
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <button
                type="submit"
                className="text-sm font-medium text-white bg-violet-800 rounded-r-lg border-violet-800 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-800 px-5"
              >
                <AiOutlineSearch size={25} />
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>

          {/* clear button to the right of search bar */}
          { searching ?
            (<div className='flex justify-end'>
                <button 
                  className='text-xs font-light text-violet-800 px-5'
                  onClick={() => {
                      setSearching(false);
                      setSearchResults([]);
                      setSearch("");
                    }
                  }
                  >
                    Clear
                </button>
            </div>) :
            (
              <div></div>
            )
          }

          
        </form>
      </div>
      {searching ? (
        <PostsGrid posts={searchResults} currentUser={currentUser} />
       ) : (
        <PostsGrid posts={posts} currentUser={currentUser}/>
        )
      } 
    </div>
  );
};

export default Search;
