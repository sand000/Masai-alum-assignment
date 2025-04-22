import { useEffect, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";

function App() {
  const [productsList, setProductsList] = useState([]);
  const [filterData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [fav, setFav] = useState(0);

  const productsData = async () => {
    const products = await fetch("../../products.json");
    let res = await products.json();
    setProductsList(res);
    setFilteredData(res);
  };

  useEffect(() => {
    productsData();
    let favs = JSON.parse(localStorage.getItem("productFavs"));
    setFav(favs.length);
  }, [fav]);

  const handleSearch = (e) => {
    let value = e.target.value;
    setSearchText(value);
    if (value.trim() === "") {
      setFilteredData(productsList);
    } else {
      let filteredData = productsList.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filteredData);
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

      <div>
        <input
          value={searchText}
          type="text"
          placeholder="search by product name"
          onChange={(e) => handleSearch(e)}
        ></input>
        {"      "}
        <button>Search</button>
      </div>
      <ProductCard data={filterData} />
    </div>
  );
}

export default App;
