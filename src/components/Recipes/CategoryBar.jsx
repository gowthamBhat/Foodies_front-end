import React, { useEffect, useState } from 'react'
import './CategoryBar.css'
import { v4 as uuidv4 } from 'uuid'
import Axios from 'axios'
function CategoryBar({ onCategoryClick }) {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    getCategory()
  }, [])
  const getCategory = async () => {
    const { data } = await Axios.get('http://localhost:8000/recipe/category')
    setCategories(data)
  }

  return (
    <div className="category-Container">
      <ul className="categorybar-head">
        <li
          className="categorybar-nodes"
          onClick={() => onCategoryClick('all')}
        >
          All
        </li>
        {categories &&
          categories.map((x) => (
            <li
              className="categorybar-nodes"
              key={uuidv4()}
              onClick={() => onCategoryClick(x.cuisineType)}
            >
              {x.cuisineType}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default CategoryBar
