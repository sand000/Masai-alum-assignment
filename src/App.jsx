import { useEffect, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";

function App() {
  const [productsList, setProductsList] = useState([]);
  const [filterData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [fav, setFav] = useState(0);
  const [sortBy, setSortBy] = useState("asc");

  const productsData = async () => {
    const products = await fetch("../../products.json");
    let res = await products.json();
    setProductsList(res);
    setFilteredData(res);
  };

  let updatedFavCount = () => {
    let favs = JSON.parse(localStorage.getItem("productFavs")) || [];
    setFav(favs.length);
  };

  useEffect(() => {
    productsData();
    updatedFavCount();
  }, []);

  const handleSearchText = (e) => {
    let value = e.target.value;
    setSearchText(value);
  };
  const handleSearch = () => {
    if (searchText.trim() === "") {
      setFilteredData(productsList);
    } else {
      let filteredData = productsList.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filteredData);
    }
  };

  const handleSortBy = (e) => {
    console.log(e.target.value);

    setSortBy(e.target.value);
    let sorted;
    if (sortBy === "asc") {
      sorted = filterData.sort((a, b) => b.price - a.price);
    } else {
      sorted = filterData.sort((a, b) => a.price - b.price);
    }
    setFilteredData(sorted);
  };

  const handleSearchClick = () => {
    handleSearch();
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifySelf: "start",
        alignContent: "start",
      }}
    >
      <div
        style={{
          width: "500px",
          display: "flex",
          alignSelf: "center",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <h1>PRODUCTS</h1>
        <button style={{ backgroundColor: "red", color: "white" }}>
          Liked : {fav}
        </button>
      </div>

      <div
        style={{
          display: "flex",
          width: "80%",
          justifyContent: "space-between",
          alignSelf: "center",
        }}
      >
        <input
          style={{ width: "50%" }}
          value={searchText}
          type="text"
          placeholder="search by product name"
          onChange={handleSearchText}
          onKeyDown={handleKeyDown}
        ></input>
        {"      "}
        <button onClick={handleSearchClick}>Search</button>

        {/* sort by asc desc */}
        <div>
          <label>Sort By Price</label>
          <select
            style={{ width: "100%" }}
            value={sortBy}
            onChange={handleSortBy}
          >
            <option value={"asc"}>Ascending </option>
            <option value={"desc"}>Descending</option>
          </select>
        </div>
      </div>
      <ProductCard data={filterData} onFavChange={updatedFavCount} />
    </div>
  );
}

export default App;
