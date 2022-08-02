import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { storage } from '../shared/firebase';
import {
  uploadBytes,
  ref,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import apis from '../api';

import { categories } from '../data';
import { MdAddAPhoto } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';

const Post = () => {
  const navigate = useNavigate();
  const [isGosu, setIsGosu] = useState(true);
  const [imgList, setImgList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [tag, setTag] = useState('');
  const [isShown, setIsShown] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'all',
  });

  const onSubmitPost = async (data) => {
    const newData = {
      subject: data.subject,
      title: data.title,
      tagList,
      content: data.content,
      imgurlList: imgList.map((v) => v.src),
    };
    console.log(newData);

    try {
      const res = await apis.addPost(newData);
      console.log(res);
      // alert('글작성 성공');
      navigate('/community/soomgo-life');
    } catch (e) {
      console.log(e);
    }
  };

  const checkKeyDown = (e) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  const previewImage = async (e) => {
    if (imgList.length >= 2) {
      alert('이미지는 2장까지 업로드할 수 있습니다.');
      return;
    }
    const image = e.target.files[0];
    const uploadedFile = await uploadBytes(
      ref(storage, `images/${image.name}`),
      image,
    );
    const imageUrl = await getDownloadURL(uploadedFile.ref);
    setImgList((state) => [...state, { name: image.name, src: imageUrl }]);
  };

  const removeImage = async (imgName) => {
    setImgList(imgList.filter((img) => img.name !== imgName));
    try {
      const imgRef = ref(storage, `images/${imgName}`);
      await deleteObject(imgRef);
    } catch (e) {
      console.log(e);
    }
  };

  const addTag = (e) => {
    setTag(e.target.value);
  };

  const removeTag = (i) => {
    setTagList((state) => state.filter((_, idx) => state[idx] !== state[i]));
    // FIXME: 성능최적화 필요
  };

  const handleKeyUp = (e) => {
    e.target.style.width = e.target.value.length + 0.7 + 'em';
    if (e.key === 'Enter' || e.key === ' ') {
      handleTags();
      e.target.style.width = '88px';
    }
  };

  const handleTags = () => {
    if (!tag || tag === ' ') {
      setIsShown(false);
    } else {
      tagList.length === 4 && setIsShown(false);
      setTagList((state) => [...state, tag]);
    }
    setTag('');
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmitPost)}
        onKeyDown={(e) => checkKeyDown(e)}
      >
        <Row>
          <select
            name="subject"
            id="subject"
            defaultValue=""
            {...register('subject', {
              required: true,
            })}
          >
            <option disabled value="">
              주제 선택
            </option>
            {categories.slice(1).map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.text}
              </option>
            ))}
            {isGosu && <option value="KNOWHOW">고수의노하우</option>}
          </select>
          <button disabled={!isValid}>등록</button>
        </Row>

        <Row className="row-photo">
          <label htmlFor="postImgs">
            <MdAddAPhoto />
          </label>
          <span>{imgList.length}/2</span>
          <input
            id="postImgs"
            type="file"
            accept="image/*"
            onChange={(e) => previewImage(e)}
            hidden
          />
        </Row>

        <Row>
          <input
            type="text"
            id="input-title"
            placeholder="제목을 입력해주세요."
            autoComplete="off"
            {...register('title', {
              required: true,
            })}
          />
        </Row>

        {/* TODO: 노하우 카테고리 선택했을 때 안보이기 */}
        <RowTag
          onClick={() => {
            tagList.length < 5 && setIsShown(true);
          }}
        >
          <ul>
            {tagList.map((v, i) => (
              <TagItem key={i}>
                # {v}
                <button onClick={() => removeTag(i)}>
                  <IoClose />
                </button>
              </TagItem>
            ))}
            {isShown ? (
              <TagItem>
                #
                <input
                  type="text"
                  id="input-title"
                  value={tag}
                  onChange={(e) => addTag(e)}
                  onKeyUp={(e) => handleKeyUp(e)}
                  onBlur={() => handleTags()}
                  autoComplete="off"
                  placeholder="연관 태그 입력"
                  autoFocus
                />
              </TagItem>
            ) : tagList.length === 0 ? (
              <TagPlaceholder>
                #인테리어시공 #신림동 #최대5개태그
              </TagPlaceholder>
            ) : null}
          </ul>
        </RowTag>

        <RowPreview>
          {imgList &&
            imgList.map((img) => (
              <PreviewImg key={img.name}>
                <img src={img.src} alt="" />
                <button onClick={() => removeImage(img.name)}>
                  <IoClose alt="첨부한 사진 삭제" />
                </button>
              </PreviewImg>
            ))}
        </RowPreview>

        <Row>
          <textarea
            wrap="hard"
            spellCheck="false"
            placeholder={`요청 서비스 정보를 공유하거나 숨고인과 고수님들에게 물어보세요.\n주제에 맞지 않는 글이나 커뮤니티 이용정책에 위배되어 일정 수 이상 신고를 받는 경우 글이 숨김 및 삭제될 수 있습니다.`}
            {...register('content', {
              required: true,
              minLength: 2,
            })}
          />
        </Row>
      </form>
    </section>
  );
};

export default Post;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f4f4f4;
  font-size: 14px;
  &:last-child {
    border: none;
  }
  &.row-photo {
    justify-content: flex-start;
    padding: 16px 10px;
    border-top: 1px solid #f4f4f4;
    background: #fafafa;
    svg {
      width: 20px;
      height: 20px;
      margin-right: 7px;
      cursor: pointer;
    }
    span {
      color: #888;
      font-size: 15px;
      font-weight: 500;
    }
  }
  select {
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
  }
  button {
    background: none;
    color: #00c7ae;
    font-size: 16px;
    font-weight: 500;
    &:disabled {
      color: #c5c5c5;
      cursor: default;
      &:hover {
        filter: none;
      }
    }
  }
  #input-title {
    width: 100%;
    padding: 4px 0;
    border: none;
    outline: none;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.3px;
    &::placeholder {
      color: #888;
    }
  }
  textarea {
    width: 100%;
    height: 325px;
    padding: 10px 0;
    font-size: 14px;
    resize: none;
    &::placeholder {
      color: #888;
    }
  }
`;

const RowPreview = styled.div`
  display: flex;
  gap: 12px;
  padding-top: 12px;
`;

const PreviewImg = styled.div`
  position: relative;
  margin-top: 10px;
  img {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    object-fit: cover;
  }
  button {
    position: absolute;
    top: -9px;
    left: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px;
    border-radius: 50%;
    background: #ff5861;
    svg {
      fill: #fff;
    }
  }
`;

const RowTag = styled.div`
  overflow-x: auto;
  display: flex;
  width: 100%;
  padding: 13px 0;
  border-bottom: 1px solid #f4f4f4;
  ul {
    display: flex;
    gap: 8px;
    button {
      padding: 0;
      background: none;
      color: #a9a9a9;
      font-size: 15px;
    }
  }
`;

const TagItem = styled.li`
  width: max-content;
  padding: 6px 8px 6px 12px;
  border-radius: 8px;
  background: #f4f4f4;
  font-size: 14px;
  letter-spacing: -0.3px;
  input {
    display: inline-block;
    width: 88px;
    margin-left: 4px;
    padding: 0;
    border: none;
    background: none;
    outline: none;
    transition: all 0.1s ease-out;
  }
`;

const TagPlaceholder = styled.p`
  padding: 6px 0;
  color: #888;
  font-size: 14px;
`;
