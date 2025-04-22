import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

function ProductCard({ data }) {
  const [favIds, setFavIds] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("productFavs")) || [];
      setFavIds(stored);
    } catch (error) {
      console.error("Failed to parse favs:", error);
      localStorage.removeItem("productFavs");
      setFavIds([]); 
    }
  }, []);

  const toggleFav = (id) => {
    let updatedFavs;
    if (favIds.includes(id)) {
      updatedFavs = favIds.filter((fid) => fid !== id);
    } else {
      updatedFavs = [...favIds, id];
    }
    if (JSON.stringify(favIds) !== JSON.stringify(updatedFavs)) {
      setFavIds(updatedFavs);
      localStorage.setItem("productFavs", JSON.stringify(updatedFavs));
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        margin: "20px",
        padding: "20px",
        borderRadius: "5px",
      }}
    >
      {data.map((item) => (
        <div
          key={item.id}
          style={{
            backgroundColor: "white",
            margin: "10px",
            border: "1px",
            boxShadow: "0px 5px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "5px",
            padding: "5px",
          }}
        >
          <div onClick={() => toggleFav(item.id)} style={{ cursor: "pointer" }}>
            <FaHeart color={favIds.includes(item.id) ? "red" : "grey"} />
          </div>
          <h4> {item.name}</h4>
          <p>Category: {item.category}</p>
          <p>Price: ₹{item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductCard;
