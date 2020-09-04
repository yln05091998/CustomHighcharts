import React from "react";
import {View} from "react-native";
import {WebView} from "react-native-webview";

const highchartsLayout = require("./index.html");
import loadScript from "./loadScripts";
import {serialize} from "./serialize";

export default function ChartComponent(props) {
  var webviewRef = null;
  const scriptsPath = "./scripts/";
  const [runFirst, updateFirst] = React.useState("");
  React.useEffect(() => {
    const newFirst = loadScript({
      data: props.data,
      options: props.options,
      scriptsPath: scriptsPath,
      serialize: serialize,
    });
    updateFirst(newFirst);
    webviewRef && webviewRef.postMessage(serialize(props.options, true));
  });
  return (
    <View style={[props.styles]}>
      <WebView
        ref={(ref) => {
          webviewRef = ref;
        }}
        onMessage={
          props.onMessage
            ? (event) => props.onMessage(event.nativeEvent.data)
            : () => {}
        }
        source={highchartsLayout}
        injectedJavaScript={runFirst}
        originWhitelist={["*"]}
        automaticallyAdjustContentInsets={true}
        allowFileAccess={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        useWebKit={true}
        scrollEnabled={false}
        mixedContentMode="always"
        allowFileAccessFromFileURLs={true}
        startInLoadingState={true}
        style={props.webviewStyles}
      />
    </View>
  );
}
