import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Titel from "../Components/Titel";
import { ShopContext } from "../Context/ShopContext";
import ProductItem from "../Components/ProductItem";

export const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOption, setSortOption] = useState("Relevant");
  const [searchQuery, setSearchQuery] = useState("");

  const applyFilters = () => {
    let filteredProducts = products?.products || [];
    // console.log("All Products:", products);

    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (selectedTypes.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedTypes.includes(product.subCategory)
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOption === "high-low") {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "low-high") {
      filteredProducts.sort((a, b) => a.price - b.price);
    }

    console.log("Filtered Products After All Filters:", filteredProducts);
    setFilter(filteredProducts);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedCategories, selectedTypes, sortOption, searchQuery, products]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) => {
      const newSelectedTypes = prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type];
      console.log("Updated Selected Types:", newSelectedTypes);
      return newSelectedTypes;
    });
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t p-5">
      <div className="w-full sm:w-1/4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <p
              onClick={() => setShowFilter((prev) => !prev)}
              className="text-xl font-semibold text-gray-700 cursor-pointer flex items-center gap-2"
            >
              FILTERS
              <img
                className={`h-4 transition-transform sm:hidden ${
                  showFilter ? "rotate-90" : ""
                }`}
                src={assets.dropdown_icon}
                alt="Toggle Filters"
              />
            </p>
          </div>

          <div className={`${showFilter ? "hidden" : "block"} sm:block`}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className="border-2 border-gray-300 p-2 w-full rounded-lg"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            <div className="mb-6">
              <p className="mb-3 text-sm font-bold text-gray-600">CATEGORIES</p>
              <div className="flex flex-col gap-3 text-sm text-gray-700">
                {["Men", "Women", "Kids"].map((category) => (
                  <label className="flex items-center gap-2" key={category}>
                    <input
                      className="w-4 h-4 text-indigo-600 rounded-md"
                      type="checkbox"
                      value={category}
                      onChange={() => handleCategoryChange(category)}
                      checked={selectedCategories.includes(category)}
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-bold text-gray-600">TYPE</p>
              <div className="flex flex-col gap-3 text-sm text-gray-700">
                {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
                  <label className="flex items-center gap-2" key={type}>
                    <input
                      className="w-4 h-4 text-indigo-600 rounded-md"
                      type="checkbox"
                      value={type}
                      onChange={() => handleTypeChange(type)}
                      checked={selectedTypes.includes(type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between mb-6 flex-col sm:flex-row">
          <Titel text1={"ALL"} text2={" COLLECTIONS"} />

          <select
            className="border-2 border-gray-300 bg-gray-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="Relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low-High</option>
            <option value="high-low">Sort by: High-Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-scroll sm:h-80 scroll-container">
          {filter.length > 0 ? (
            filter.map((item, index) => (
              // <div
              //   key={index}
              //   className="bg-white  shadow-md rounded-lg hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
              // >
              <ProductItem
                id={item._id}
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.images[0]}
              />
              // </div>
            ))
          ) : (
            <div className="sm:w-[60vw] flex items-center">
              <img
                className="m-auto sm:w-40 md:w-80"
                src="https://static.vecteezy.com/system/resources/previews/007/104/553/original/search-no-result-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
                alt="No results found"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
