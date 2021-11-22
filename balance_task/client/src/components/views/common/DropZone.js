import React from "react";
import Dropzone from 'react-dropzone';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

function DropZone(props) {
  const {images, setImages, margin, setDetailImageFile, detailImageFile} = props;
  const styles = {margin};
  const [imgAdvice, setImgAdvice] = React.useState(false);

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
    (images) ? setImgAdvice(true) : setImgAdvice(false);
  }

  const deleteHandler = (image) =>{
    const currentIndex = images.indexOf(image);
    let newImages = [...images];
    let newImagesFile = [...detailImageFile];
    newImages.splice(currentIndex, 1);
    newImagesFile.splice(currentIndex, 1);
    setImages(newImages);
    setDetailImageFile(newImagesFile);
    (images) ? setImgAdvice(true) : setImgAdvice(false);
  }

  return (
    <div>
      <div style={{display: "flex", ...styles}}>
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
        {imgAdvice && <div style={{width:'auto', height: '50px', padding: '12.5px'}}>  이미지를 클릭하면 삭제됩니다.</div>}
      </div>
      <div style={{margin: "0 auto 0 auto", display: 'flex', width: '90vw', height: 'auto', overflowX: 'auto'}}>
        {
          images.map((image, index) =>(
            <div onClick={() => deleteHandler(image)} key={index}>
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