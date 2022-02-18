import { RedoOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import 'antd/dist/antd.css';
import { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import * as React from 'react';
import './App.css';
import * as backendService from './backendService';
import TweetsContainerDTO from './DTO/TweetsContainerDTO';
import UserContainerDTO from './DTO/UserContainerDTO';
import Timeline from './Timeline';
import { raiseError } from './utils';

const SIDER_WIDTH = "4rem";

function App() {
  const [userMeContainer, setUserMeContainer] = React.useState<UserContainerDTO>();
  const [homeTweetsContainer, setHomeTweetsContainer] = React.useState<TweetsContainerDTO>();
  const [userTweetsContainer, setUserTweetsContainer] = React.useState<TweetsContainerDTO>();
  const [userMentionsTweetsContainer, setUserMentionsTweetsContainer] = React.useState<TweetsContainerDTO>();
  const [refresh, setRefresh] = React.useState<number>();

  React.useEffect(() => { // Home Tweets
    backendService.getHomeTimeline() // get home timeline tweet Ids
    .then(miniTweets => {
        const tweetIds = miniTweets.map(miniTweet => miniTweet.id_str);
        return backendService.getTweetsByIds(tweetIds) // get tweets with tweet ids
    })
    .then(setHomeTweetsContainer)
    .catch(raiseError);
  }, []);

  React.useEffect(() => {
    backendService.getMe()
      .then(userMeContainer => {
        setUserMeContainer(userMeContainer);
        return backendService.getUserTweets(userMeContainer.data.id);
      })
      .then(userTweetsContainer => {
        setUserTweetsContainer(userTweetsContainer);
        return backendService.getUserMentionsTweets(userMeContainer!.data.id);
      })
      .then(setUserMentionsTweetsContainer)
      .catch(raiseError);
  }, [userMeContainer]);


  return (
    <Layout >
      <Sider width={SIDER_WIDTH} style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0}}>
        <div className="sider">
          <img alt="me" src={userMeContainer?.data.profile_image_url} className="avatar sider-item-menu"/>
          <Button type="primary" icon={<RedoOutlined/>} onClick={() => setRefresh(refresh ? 0 : 1)} />
        </div>
      </Sider>
      <Content key={refresh} className="content" style={{marginLeft: SIDER_WIDTH}}>
        <Timeline tweetsContainer={homeTweetsContainer} label="Home"/>
        <Timeline tweetsContainer={userTweetsContainer} label="Utilisateur"/>
        <Timeline tweetsContainer={userMentionsTweetsContainer} label="Mentions"/>
      </Content>
    </Layout>
  );
}

export default App;
