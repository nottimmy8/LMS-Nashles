import React from "react";

const Search = () => {
  return (
    <div className=" px-3 py-2 rounded-md border border-primary/50 ">
      <input
        type="text"
        placeholder="search courses"
        className="outline-none w-full"
      />
    </div>
  );
};

export default Search;
