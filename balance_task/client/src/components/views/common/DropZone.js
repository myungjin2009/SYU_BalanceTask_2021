import React, { useState } from "react";
import Dropzone from 'react-dropzone';
import axios from 'axios';

function DropZone(props) {
  
  const {images, setImages, margin} = props;
  const styles = {margin};
  const dropHandler = (files) =>{
    let formData = new FormData();
    const config = {
      header:{'content-type': 'multipart/form-data'}
    }
    formData.append("file", files[0]);
    axios.post('/api/group/post/image', formData, config)
    .then(response => {
      if(response.data.success){
        setImages([...images, response.data.filePath]);
      }else{
        alert('저장을 하는데 실패했습니다.');
      }
    });
  }
  const deleteHandler = (image) =>{
    const currentIndex = images.indexOf(image);
    let newImages = [...images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
  }

  return (
    <div style={{display: "flex", justifyContent: "space-between", ...styles}}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
            <div 
              style={{
                width: 300, height: 240, border: "1px solid lightgray",
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
              {...getRootProps()}>
              <input {...getInputProps()} />
              <i className="fas fa-plus"></i>
            </div>
        )}
      </Dropzone>

      <div style={{display: 'flex', width: '350px', height: '240px', overflowX: 'auto'}}>
        {
          images.map((image, index) =>(
            <div onClick={() => deleteHandler(image)} key={index}>
              <img style={{ minWidth: '300px', width: '300px', height: '240px'}} 
              // src={`http://localhost:5000/${image}`} 
              />
            </div>
          ))  
        }
      </div>
    </div>
  )
}

export default DropZone;