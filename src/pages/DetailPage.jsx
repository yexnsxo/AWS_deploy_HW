import styled from "styled-components";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [comment, setComment] = useState("");

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const [detail, setDetail] = useState([]);
  const getDetail = (id) => {
    axios
      .get(`${baseURL}/entries/${id}/`)
      .then((response) => {
        console.log(response);
        setDetail(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteComment = () => {
    axios
      .delete(`${baseURL}/entries/${id}/`)
      .then((response) => {
        console.log(response);
        alert("게시글 삭제가 완료되었습니다.");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert("게시글을 삭제하지 못했습니다.");
      });
  };
  const changeComment = () => {
    axios
      .put(`${baseURL}/entries/${id}/`, {
        author: detail.author,
        comment: comment,
      })
      .then((response) => {
        console.log(response);
        alert("게시글 수정이 완료되었습니다.");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert("게시글을 수정하지 못했습니다.");
      });
  };

  useEffect(() => {
    getDetail(id);
  }, [id]);

  useEffect(() => {
    if (detail) {
      setComment(detail.comment || "");
    }
  }, [detail]);
  return (
    <Wrapper>
      <Button txt="게시글 작성하기" onBtnClick={() => navigate("/write")} />
      <DetailWrapper>
        <Author>{detail.author}</Author>
        <Time>{detail.timestamp}</Time>
        <FormGroup>
          <StyledTxtarea value={comment} onChange={onChangeComment} />
        </FormGroup>
        <BtnWrapper>
          <Button txt="수정" onBtnClick={changeComment} fontSize="1.875rem" />
          <Button txt="삭제" onBtnClick={deleteComment} fontSize="1.875rem" />
        </BtnWrapper>
      </DetailWrapper>
    </Wrapper>
  );
};

export default DetailPage;

const Wrapper = styled.div`
  margin-top: 1.25rem;
  color: var(--text-black);
`;

const DetailWrapper = styled.div`
  /* width: calc(100% - 12.5rem); */
  height: fit-content;
  background-color: white;
  border-radius: 1.25rem;
  padding: 6.25rem;
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.15);
  margin-top: 3.125rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Author = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
`;

const Time = styled.div`
  color: var(--text-grey);
  font-weight: 600;
  font-size: 1.25rem;
`;

const Comment = styled.div`
  font-size: 1.875rem;
  font-weight: 700;
  margin: 3.125rem 0;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

const StyledTxtarea = styled.textarea`
  border: none;
  outline: none;
  width: 100%;
  height: 12.5rem;
  background-color: white;
  padding: 1.875rem;
  border-radius: 0.9375rem;
  font-size: 1.875rem;
  font-weight: 700;
  margin: 3.125rem 0;
  resize: none;
  color: var(--text-black);
  &::placeholder {
    color: #acacac;
    font-weight: 700;
  }
`;
