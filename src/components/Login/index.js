import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import firebase, { auth } from '../../firebase/config';
import { addDocument, generateKeywords } from '../../firebase/services';

const { Title } = Typography;

const googleProvider = new firebase.auth.GoogleAuthProvider();

function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export default function Login() {
  const handleLogin = async (provider) => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
    (async () => {
      const resp = await fetch(user.photoURL);
      // yes.. from a Blob to a Blob...
      const blob1 = await resp.blob();
      const bmp = await createImageBitmap(blob1);
      console.log(bmp); // ImageBitmap
      // create a canvas
      const canvas = document.createElement('canvas');
      // resize it to the size of our ImageBitmap
      canvas.width = bmp.width;
      canvas.height = bmp.height;
      // get a bitmaprenderer context
      const ctx = canvas.getContext('bitmaprenderer');
      ctx.transferFromImageBitmap(bmp);
      // get it back as a Blob
      const blob2 = await new Promise((res) => canvas.toBlob(res));
      console.log(blob2); // Blob
      const base64 = await blobToBase64(blob2)
      console.log(btoa(base64));
    })().catch(console.error);
    // if (additionalUserInfo?.isNewUser) {
    //   addDocument('users', {
    //     availability: 0,
    //     email: user.email,
    //     image: user.photoURL,
    //     name: user.displayName,
    //     onChat: 0,
    //     password: ""
    //   });
    // }
  };

  return (
    <div>
      <Row justify='center' style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: 'center' }} level={3}>
            Chat Application
          </Title>
          <Button
            style={{ width: '100%', marginBottom: 5 }}
            onClick={() => handleLogin(googleProvider)}
          >
            Đăng nhập bằng Google
          </Button>
        </Col>
      </Row>
    </div>
  );
}
