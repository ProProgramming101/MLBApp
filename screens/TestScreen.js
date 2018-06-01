import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List } from 'react-native-elements';
var XMLParser = require('react-xml-parser');

import MLBGamedayApi from './../api/MLBGamedayApi';
import { DateBar } from './../components/app';

export default class TestScreen extends React.Component {

  constructor(props) {
    super(props);

    //var url = MLBGamedayApi.getDayURL(2018, 5, 24);
    //MLBGamedayApi.getListOfGamesForDay(2018, 5, 24).then(function(urls) { });



    var text = '<highlights xmlns:xs="http://www.w3.org/2001/XMLSchema"><media id="2067458883" date="2018-05-21T19:24:45-0400" type="video" top-play="true" media-type="T" team_id="144"><player player_id="542255">Ender Inciarte</player><team team_id="144">Atlanta Braves</team><headline><![CDATA[Inciarte nabs Hernandez for DP]]></headline><duration>00:00:35</duration><playId>ad3c7595-cedd-4a08-bb92-5df012ee9b95</playId><blurb><![CDATA[ATL@PHI: Inciarte fires a strike to second to turn DP]]></blurb><bigblurb><![CDATA[Ender Inciarte reels in a fly ball in deep center, then fires a strong throw to second to double up Cesar Hernandez trying to tag from first]]></bigblurb><keywords><keyword type="sv_id" value="5575a664-7a6f-4624-bb0c-44f82f147fe9"/><keyword type="closed_captions_location_vtt" value="https://mediadownloads.mlb.com/mlbam/mp4/2018/05/21/2067458883/1526945229021/asset.vtt"/><keyword type="closed_captions_location_ttml" value="http://mediadownloads.mlb.com/mlbam/mp4/2018/05/21/2067458883/1526945229021/asset.ttml"/><keyword type="team_id" value="144"/><keyword type="mmtax" value="shareable"/><keyword type="subject" value="MLBCOM_REALTIME_HIGHLIGHT"/></keywords><thumb type="8">http://mediadownloads.mlb.com/mlbam/2018/05/21/images/mlbf_2067458883_th_8.jpg</thumb><thumbnails><thumb type="1">http://mediadownloads.mlb.com/mlbam/2018/05/21/images/mlbf_2067458883_th_1.jpg</thumb><thumb type="2">http://mediadownloads.mlb.com/mlbam/2018/05/21/images/mlbf_2067458883_th_2.jpg</thumb><thumb type="86">http://mediadownloads.mlb.com/mlbam/2018/05/21/images/mlbf_2067458883_th_86.jpg</thumb></thumbnails><url playback-scenario="FLASH_1200K_640X360">http://mediadownloads.mlb.com/mlbam/mp4/2018/05/21/2067458883/1526945229021/asset_1200K.mp4</url><url playback-scenario="HTTP_CLOUD_MOBILE">http://mediadownloads.mlb.com/mlbam/hls/2018/05/21/2067458883/1526945229409/master_mobile.m3u8</url><url playback-scenario="3GP_H264_550K_320X240">http://mediadownloads.mlb.com/mlbam/hls/2018/05/21/2067458883/1526945229409/master_mobile.m3u8</url><url playback-scenario="HTTP_CLOUD_TABLET">http://mediadownloads.mlb.com/mlbam/hls/2018/05/21/2067458883/1526945229409/master_tablet.m3u8</url><url playback-scenario="HTTP_CLOUD_TABLET_60">http://mediadownloads.mlb.com/mlbam/hls/2018/05/21/2067458883/1526945229409/master_tablet_60.m3u8</url><url playback-scenario="HTTP_CLOUD_WIRED">http://mediadownloads.mlb.com/mlbam/hls/2018/05/21/2067458883/1526945229409/master_wired.m3u8</url></media></highlights>';
    //var text = '<highlights xmlns:xs="http://www.w3.org/2001/XMLSchema"><media id="2067458883" date="2018-05-21T19:24:45-0400" type="video" top-play="true" media-type="T" team_id="144"><keywords><keyword type="sv_id" value="5575a664-7a6f-4624-bb0c-44f82f147fe9"/><keyword type="closed_captions_location_vtt" value="https://mediadownloads.mlb.com/mlbam/mp4/2018/05/21/2067458883/1526945229021/asset.vtt"/><keyword type="closed_captions_location_ttml" value="http://mediadownloads.mlb.com/mlbam/mp4/2018/05/21/2067458883/1526945229021/asset.ttml"/><keyword type="team_id" value="144"/><keyword type="mmtax" value="shareable"/><keyword type="subject" value="MLBCOM_REALTIME_HIGHLIGHT"/></keywords><thumb type="8">http://mediadownloads.mlb.com/mlbam/2018/05/21/images/mlbf_2067458883_th_8.jpg</thumb><thumbnails><thumb type="1">http://mediadownloads.mlb.com/mlbam/2018/05/21/images/mlbf_2067458883_th_1.jpg</thumb><thumb type="2">http://mediadownloads.mlb.com/mlbam/2018/05/21/images/mlbf_2067458883_th_2.jpg</thumb><thumb type="86">http://mediadownloads.mlb.com/mlbam/2018/05/21/images/mlbf_2067458883_th_86.jpg</thumb></thumbnails><url playback-scenario="FLASH_1200K_640X360">http://mediadownloads.mlb.com/mlbam/mp4/2018/05/21/2067458883/1526945229021/asset_1200K.mp4</url><url playback-scenario="HTTP_CLOUD_MOBILE">http://mediadownloads.mlb.com/mlbam/hls/2018/05/21/2067458883/1526945229409/master_mobile.m3u8</url><url playback-scenario="3GP_H264_550K_320X240">http://mediadownloads.mlb.com/mlbam/hls/2018/05/21/2067458883/1526945229409/master_mobile.m3u8</url><url playback-scenario="HTTP_CLOUD_TABLET">http://mediadownloads.mlb.com/mlbam/hls/2018/05/21/2067458883/1526945229409/master_tablet.m3u8</url><url playback-scenario="HTTP_CLOUD_TABLET_60">http://mediadownloads.mlb.com/mlbam/hls/2018/05/21/2067458883/1526945229409/master_tablet_60.m3u8</url><url playback-scenario="HTTP_CLOUD_WIRED">http://mediadownloads.mlb.com/mlbam/hls/2018/05/21/2067458883/1526945229409/master_wired.m3u8</url></media></highlights>';
    //var text = '<highlights xmlns:xs="http://www.w3.org/2001/XMLSchema"><media id="2067458883" date="2018-05-21T19:24:45-0400" type="video" top-play="true" media-type="T" team_id="144"><keywords><keyword type="subject" value="MLBCOM_REALTIME_HIGHLIGHT"></keyword></keywords><thumb type="8">http://mediadownloads.mlb.com/mlbam/2018/05/21/images/mlbf_2067458883_th_8.jpg</thumb><thumbnails><thumb type="1">http://mediadownloads.mlb.com/mlbam/2018/05/21/images/mlbf_2067458883_th_1.jpg</thumb><thumb type="2">http://mediadownloads.mlb.com/mlbam/2018/05/21/images/mlbf_2067458883_th_2.jpg</thumb><thumb type="86">http://mediadownloads.mlb.com/mlbam/2018/05/21/images/mlbf_2067458883_th_86.jpg</thumb></thumbnails><url playback-scenario="FLASH_1200K_640X360">http://mediadownloads.mlb.com/mlbam/mp4/2018/05/21/2067458883/1526945229021/asset_1200K.mp4</url><url playback-scenario="HTTP_CLOUD_MOBILE">http://mediadownloads.mlb.com/mlbam/hls/2018/05/21/2067458883/1526945229409/master_mobile.m3u8</url><url playback-scenario="3GP_H264_550K_320X240">http://mediadownloads.mlb.com/mlbam/hls/2018/05/21/2067458883/1526945229409/master_mobile.m3u8</url><url playback-scenario="HTTP_CLOUD_TABLET">http://mediadownloads.mlb.com/mlbam/hls/2018/05/21/2067458883/1526945229409/master_tablet.m3u8</url><url playback-scenario="HTTP_CLOUD_TABLET_60">http://mediadownloads.mlb.com/mlbam/hls/2018/05/21/2067458883/1526945229409/master_tablet_60.m3u8</url><url playback-scenario="HTTP_CLOUD_WIRED">http://mediadownloads.mlb.com/mlbam/hls/2018/05/21/2067458883/1526945229409/master_wired.m3u8</url></media></highlights>';


    //text = text.replace(/\/>/, "></keyword>");
    //text = text.split("/>").join("></keyword>");
    //console.log(text);

    //var xml = new XMLParser().parseFromString(text);
    
    //var media = xml.getElementsByTagName("media");
    //console.log(media.length);
    //console.log(media[0].children.length);

  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Test Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
