import React from 'react'

function ImageModel({ selectedImg, setSelectedImg }) {
  console.log(selectedImg)

  let serverAddress = `http://localhost:8000/`
  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) setSelectedImg(null)
  }
  return (
    <div className="backdrop" onClick={handleClick}>
      <img src={serverAddress + selectedImg.url} alt="enlarged recipe img" />
    </div>
  )
}

export default ImageModel
