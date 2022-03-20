import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const InputViewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const InputBox = styled.input`
  /* width: 100%;
  flex: 1;
  border-radius: 100px;
  margin-bottom: 20px; */
  /* position: absolute; */
  width: 100%;
  height: 100%;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: 100px;
  opacity: 0;
`;

const Preview = styled.img`
  width: 95%;
  height: 95%;
  background-color: #fff;
  padding: 0 10px;
`;

export const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (!selectedFile) {
      setPreview('');
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  return (
    <InputViewContainer>
      <InputBox
        id="profile-image"
        type={'file'}
        // style={!selectedFile ? {} : { display: 'none' }}
        onChange={onSelectFile}
        accept="image/*"
      />
      {selectedFile && (
        <Preview
          src={preview}
          onClick={() => {
            setSelectedFile(undefined);
          }}
        />
      )}
    </InputViewContainer>
  );
};
