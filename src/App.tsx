import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import * as React from 'react';
import './App.css';
import * as backendService from './backendService';
import UserContainerDTO from './DTO/UserContainerDTO';
import Timeline from './Timeline';

const SIDER_WIDTH = "5rem";

function App() {
  const [userMeContainer, setUserMeContainer] = React.useState<UserContainerDTO>();

  React.useEffect(() => {
    backendService.getMe()
      .then(setUserMeContainer)
      .catch(error => console.log("errorMe = " , error))
  }, []);

  return (
    <Layout >
      <Sider width={SIDER_WIDTH} style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}>
        <div className="sider">
          <img alt="me" src={userMeContainer?.data.profile_image_url} className="avatar"/>
        </div>
      </Sider>
      <Content style={{ marginLeft: SIDER_WIDTH}}>
        <Timeline/>
      </Content>
    </Layout>
  );
}

export default App;
