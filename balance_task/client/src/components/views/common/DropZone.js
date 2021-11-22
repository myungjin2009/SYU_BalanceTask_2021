import React from "react";
import Dropzone from 'react-dropzone';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CancelIcon from '@material-ui/icons/Cancel';

function DropZone(props) {
  const {images, setImages, margin, setDetailImageFile, detailImageFile} = props;
  const styles = {margin};
  const dropHandler = (files) =>{
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImages([...images, base64.toString()]);
      }
    };
    if (files[0]) {
      reader.readAsDataURL(files[0]);
      console.log(files[0]);
      setDetailImageFile([...detailImageFile, files[0]]);
    }
  }
  const deleteHandler = (image) =>{
    const currentIndex = images.indexOf(image);
    let newImages = [...images];
    let newImagesFile = [...detailImageFile];
    newImages.splice(currentIndex, 1);
    newImagesFile.splice(currentIndex, 1);
    setImages(newImages);
    setDetailImageFile(newImagesFile);
  }

  return (
    <div style={{display: "block", ...styles}}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
            <div 
              style={{margin: "0 0 1vh 5vw",
                width: 50, height: 50, border: "1px solid lightgray",
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
              {...getRootProps()}>
              <input {...getInputProps()} />
              <AddAPhotoIcon/>
            </div>
        )}
      </Dropzone>

      <div style={{margin: "-2vh auto 0 auto", display: 'flex', width: '90vw', height: 'auto', overflowX: 'auto'}}>
        {
          images.map((image, index) =>(
            <div onClick={() => deleteHandler(image)} key={index}>
              <CancelIcon style={{position: 'relative', color: 'rgb(250,80,0)', width: '3.6vh', height: '3.6vh', transform: 'translate(0, 120%)'}}/>
              <img style={{ minWidth: '150px', width: '150px', height: 'auto', marginRight: '1vh'}} 
              src={image} 
              />
            </div>
          ))  
        }
      </div>
    </div>
  )
}

export default DropZone;