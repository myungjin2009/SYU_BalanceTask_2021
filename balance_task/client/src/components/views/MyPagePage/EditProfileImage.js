import React from 'react';
import styled from 'styled-components';
import Header from '../Header/Header';
import Button from '@material-ui/core/Button';      //버튼
import { updateImage, chooseLoading } from '../../../_actions/user_action';
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { withRouter } from 'react-router-dom';


const OnImgChange = (dispatch, props, detailImageFile) => {
  
    const formData = new FormData();
    if(detailImageFile === null) {
        formData.append('image',"DEFAULT");
    }else{
        formData.append('image',detailImageFile);
    }

    const config = {
      headers: {
        'content-type': "multipart/form-data"
      }
    }
    
    dispatch(updateImage(formData, config)).then((res) => {
        if(res.payload.success) {
            dispatch(chooseLoading(true));
            alert('변경이 완료되었습니다.');
            props.history.push('/my_page');
        } else {
            alert('변경을 실패하였습니다. 나중에 다시 시도해주세요.');
        }
    });
}
/*
const onImgDefault = (dispatch, props) => {
    dispatch(updateImage(null, config)).then((res) => {
        if(res.payload.success) {
            dispatch(chooseLoading(true));
            alert('변경이 완료되었습니다.');
            props.history.push('/my_page');
        }
    });
}
*/


const EditProfileImage = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const [detailImageFile, setDetailImageFile] = React.useState(null);   //프로필 이미지
    const [detailImageUrl, setDetailImageUrl] = React.useState(null);     //프로필 이미지

    const ImgBtn = React.useRef();                                //프로필 수정 버튼
    const ImgBtnClick = () => {
        ImgBtn.current.click();
    }  

    React.useEffect(()=>{
        setDetailImageUrl(location.state.image);
        setDetailImageFile(location.state.image);
    },[]);

    const profileImgChange = (event) => {                         //프로필 이미지
        let reader = new FileReader();
    
        reader.onloadend = () => {
          const base64 = reader.result;
          if (base64) {
            setDetailImageUrl(base64.toString());
          }
        };
        if (event.target.files[0]) {
          reader.readAsDataURL(event.target.files[0]);
          setDetailImageFile(event.target.files[0]);
        } else {
          setDetailImageUrl(null);
          setDetailImageFile(null);
        }
      };                                         
    return(
    <div>
        <Header title = "이미지 수정" message="변경된 이미지를 적용하지 않고 나가시겠습니까?"></Header>
        <Content>
              {detailImageUrl ? <UserProfile url = {detailImageUrl} onClick={ImgBtnClick}></UserProfile>:<img className="Profile" alt="Profile"/>}
              <input type="file" ref={ImgBtn} id="input_file" style={{display:"none"}} accept='image/*' name='file' onChange={profileImgChange} />
            <Button className="applyButton" variant="contained" color="primary" onClick={() => OnImgChange(dispatch, props, detailImageFile)}>
              적용하기
            </Button>
            <Button className="DefaultButton" variant="contained" color="secondary" onClick={() => OnImgChange(dispatch, props, null)}>
              기본프로필로 변경
            </Button>
        </Content>

    </div>);
    return(null);
}

const Content = styled.div`
    margin-top: 120px;           //헤더가 가림
    width: 100%;
    text-align: center;

    & > Button {
        margin-top: 5vh;
        width: 70%;
    }
`;

const UserProfile = styled.div`
  background-image: url('${(props) => props.url}');
  width: 40vh;
  height: 40vh;
  background-size: cover;
  border: 2px solid red;
  margin: 0 auto;
`;

export default withRouter(EditProfileImage);