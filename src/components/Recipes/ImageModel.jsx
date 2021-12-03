import React from 'react'
import { v4 as uuidv4 } from 'uuid'
function ImageModel({ selectedImg, setSelectedImg }) {
  console.log(selectedImg)

  let serverAddress = `http://localhost:8000/`
  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) setSelectedImg(null)
  }
  return (
    <div className="backdrop" onClick={handleClick}>
      <div className="model-image-wrap">
        <img src={serverAddress + selectedImg.url} alt="enlarged recipe img" />
      </div>

      <div className="model-recipe-info">
        <div className="model-recipe-content">
          <p className="model-recipeLabel">{selectedImg.label}</p>
          <p>author-{selectedImg.authorUsername} </p>
          <p>Recipe Source:{selectedImg.source}</p>
          <p>
            <i> ingredients </i>
          </p>
          {selectedImg.ingredients.map((x) => (
            <p key={uuidv4()}>
              {x.text}:{x.weight}
            </p>
          ))}

          <p>
            <i> dietLabels</i>
          </p>
          {selectedImg.dietLabels.map((x) => (
            <span key={uuidv4()}>{x + ' '}</span>
          ))}
          <p>
            <i> healthLabels</i>
          </p>
          {selectedImg.healthLabels.map((x) => (
            <span key={uuidv4()}>{x + ' '}</span>
          ))}
          <p>
            <i> meal type</i>
          </p>
          {selectedImg.mealType.map((x) => (
            <span key={uuidv4()}>{x + ' '}</span>
          ))}
          <p>
            <i> cuisine type</i>
          </p>
          {selectedImg.cuisineType.map((x) => (
            <span key={uuidv4()}>{x + ' '}</span>
          ))}
          <p>making description</p>
          <p>{selectedImg.makingDescription}</p>
        </div>
      </div>
    </div>
  )
}

export default ImageModel
