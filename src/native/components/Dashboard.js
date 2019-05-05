/* eslint-disable */
import React, { Component } from 'react';
import Animation from 'lottie-react-native';
import Image from 'react-native-scalable-image';
import {
  View, Segment, Picker, Form, Container, Content, H1, H2, H3,
  Header, List, ListItem, Button, Left, Body, Right, Thumbnail,
  Text, Icon, Switch, Spinner, Separator, Tab, Tabs, ScrollableTab,
} from 'native-base';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


let anim = {"v":"4.5.9","fr":29.9700012207031,"ip":0,"op":150.000006109625,"w":60,"h":60,"ddd":0,"assets":[{"id":"comp_2","layers":[{"ddd":0,"ind":0,"ty":4,"nm":"Dot 8","ks":{"o":{"a":0,"k":33},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":75,"s":[15.5,44,0],"e":[10.812,28.25,0],"to":[-0.00000190734863,-10,0],"ti":[0,8.75,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":90.569,"s":[10.812,28.25,0],"e":[18.125,13.75,0],"to":[0,-8.4999885559082,0],"ti":[0,7.37499237060547,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":106.221,"s":[18.125,13.75,0],"e":[11.375,-4.5,0],"to":[0,-9.375,0],"ti":[0,8.49999809265137,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":124.638,"s":[11.375,-4.5,0],"e":[18.125,-19.5,0],"to":[0,-8.75,0],"ti":[0,6.75,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":140.361,"s":[18.125,-19.5,0],"e":[18.125,-19.5,0],"to":[0,-8,0],"ti":[-0.41666665673256,0,0]},{"t":147.000005987433}]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"st","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"w":{"a":0,"k":2},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"fl","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[5.27,5.27]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-0.365,8.885],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":2,"mn":"ADBE Vector Group"}],"ip":47.0000019143492,"op":197.000008023974,"st":47.0000019143492,"bm":0,"sr":1},{"ddd":0,"ind":1,"ty":4,"nm":"Dot 3","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":28,"s":[15.5,44,0],"e":[10.812,28.25,0],"to":[-0.00000190734863,-10,0],"ti":[0,8.75,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":44.65,"s":[10.812,28.25,0],"e":[18.125,13.75,0],"to":[0,-8.4999885559082,0],"ti":[0,7.37499237060547,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":61.39,"s":[18.125,13.75,0],"e":[11.375,-4.5,0],"to":[0,-9.375,0],"ti":[0,8.49999809265137,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":81.085,"s":[11.375,-4.5,0],"e":[18.125,-19.5,0],"to":[0,-8.75,0],"ti":[0,6.75,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":97.9,"s":[18.125,-19.5,0],"e":[18.125,-19.5,0],"to":[0,-8,0],"ti":[-0.41666665673256,0,0]},{"t":105.000004276738}]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"st","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"w":{"a":0,"k":2},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"fl","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[5.27,5.27]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-0.365,8.885],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":2,"mn":"ADBE Vector Group"}],"ip":0,"op":150.000006109625,"st":0,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"Dot 7","ks":{"o":{"a":0,"k":33},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":26,"s":[44,45.25,0],"e":[39.312,29.5,0],"to":[-0.00000190734863,-10,0],"ti":[0,8.75,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":52.598,"s":[39.312,29.5,0],"e":[46.625,15,0],"to":[0,-8.4999885559082,0],"ti":[0,7.37499237060547,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":79.338,"s":[46.625,15,0],"e":[39.875,-3.25,0],"to":[0,-9.375,0],"ti":[0,8.49999809265137,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":110.798,"s":[39.875,-3.25,0],"e":[46.625,-18.25,0],"to":[0,-8.75,0],"ti":[0,6.75,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":137.659,"s":[46.625,-18.25,0],"e":[46.625,-18.25,0],"to":[0,-8,0],"ti":[-0.41666665673256,0,0]},{"t":149.000006068894}]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"st","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"w":{"a":0,"k":2},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"fl","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[5.27,5.27]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-0.365,8.885],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":2,"mn":"ADBE Vector Group"}],"ip":16.0000006516934,"op":166.000006761319,"st":16.0000006516934,"bm":0,"sr":1},{"ddd":0,"ind":3,"ty":4,"nm":"Dot 2","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":44,"s":[44,45.25,0],"e":[39.312,29.5,0],"to":[-0.00000190734863,-10,0],"ti":[0,8.75,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":65.191,"s":[39.312,29.5,0],"e":[46.625,15,0],"to":[0,-8.4999885559082,0],"ti":[0,7.37499237060547,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":86.496,"s":[46.625,15,0],"e":[39.875,-3.25,0],"to":[0,-9.375,0],"ti":[0,8.49999809265137,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":111.563,"s":[39.875,-3.25,0],"e":[46.625,-18.25,0],"to":[0,-8.75,0],"ti":[0,6.75,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":132.964,"s":[46.625,-18.25,0],"e":[46.625,-18.25,0],"to":[0,-8,0],"ti":[-0.41666665673256,0,0]},{"t":142.000005783779}]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"st","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"w":{"a":0,"k":2},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"fl","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[5.27,5.27]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-0.365,8.885],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":2,"mn":"ADBE Vector Group"}],"ip":34.0000013848484,"op":184.000007494474,"st":34.0000013848484,"bm":0,"sr":1},{"ddd":0,"ind":4,"ty":4,"nm":"Dot 6","ks":{"o":{"a":0,"k":33},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":63,"s":[30,51.25,0],"e":[25.312,35.5,0],"to":[-0.00000190734863,-10,0],"ti":[0,8.75,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":75.863,"s":[25.312,35.5,0],"e":[32.625,21,0],"to":[0,-8.4999885559082,0],"ti":[0,7.37499237060547,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":88.794,"s":[32.625,21,0],"e":[25.875,2.75,0],"to":[0,-9.375,0],"ti":[0,8.49999809265137,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":104.009,"s":[25.875,2.75,0],"e":[32.625,-12.25,0],"to":[0,-8.75,0],"ti":[0,6.75,0]},{"t":117.000004765508}]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"st","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"w":{"a":0,"k":2},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"fl","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[5.27,5.27]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-0.365,8.885],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":2,"mn":"ADBE Vector Group"}],"ip":63.0000025660426,"op":213.000008675668,"st":63.0000025660426,"bm":0,"sr":1},{"ddd":0,"ind":5,"ty":4,"nm":"Dot 4","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":69,"s":[30,51.25,0],"e":[25.312,35.5,0],"to":[-0.00000190734863,-10,0],"ti":[0,8.75,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":74.716,"s":[25.312,35.5,0],"e":[32.625,21,0],"to":[0,-8.4999885559082,0],"ti":[0,7.37499237060547,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":80.464,"s":[32.625,21,0],"e":[25.875,2.75,0],"to":[0,-9.375,0],"ti":[0,8.49999809265137,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":87.226,"s":[25.875,2.75,0],"e":[32.625,-12.25,0],"to":[0,-8.75,0],"ti":[0,6.75,0]},{"t":93.0000037879676}]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"st","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"w":{"a":0,"k":2},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"fl","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[5.27,5.27]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-0.365,8.885],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":2,"mn":"ADBE Vector Group"}],"ip":69.0000028104276,"op":219.000008920053,"st":69.0000028104276,"bm":0,"sr":1},{"ddd":0,"ind":6,"ty":4,"nm":"Dot 5","ks":{"o":{"a":0,"k":33},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":14,"s":[30,51.25,0],"e":[25.312,35.5,0],"to":[-0.00000190734863,-10,0],"ti":[0,8.75,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":26.863,"s":[25.312,35.5,0],"e":[32.625,21,0],"to":[0,-8.4999885559082,0],"ti":[0,7.37499237060547,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":39.794,"s":[32.625,21,0],"e":[25.875,2.75,0],"to":[0,-9.375,0],"ti":[0,8.49999809265137,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"n":"0p833_0p833_0p167_0p167","t":55.009,"s":[25.875,2.75,0],"e":[32.625,-12.25,0],"to":[0,-8.75,0],"ti":[0,6.75,0]},{"t":68.0000027696968}]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"st","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"w":{"a":0,"k":2},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"fl","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[5.27,5.27]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"fl","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[-0.365,8.885],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":2,"mn":"ADBE Vector Group"}],"ip":14.0000005702317,"op":164.000006679857,"st":14.0000005702317,"bm":0,"sr":1}]}],"layers":[{"ddd":0,"ind":0,"ty":1,"nm":"White Solid 1","td":1,"ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[30,30,0]},"a":{"a":0,"k":[30,30,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"hasMask":true,"masksProperties":[{"inv":false,"mode":"a","pt":{"a":0,"k":{"i":[[12.703,0],[0,-12.703],[-12.703,0],[0,12.703]],"o":[[-12.703,0],[0,12.703],[12.703,0],[0,-12.703]],"v":[[30,7],[7,30],[30,53],[53,30]],"c":true}},"o":{"a":0,"k":100},"x":{"a":0,"k":0},"nm":"Mask 1"}],"sw":60,"sh":60,"sc":"#ffffff","ip":0,"op":150.000006109625,"st":0,"bm":0,"sr":1},{"ddd":0,"ind":1,"ty":0,"nm":"Pre-comp 1","tt":1,"refId":"comp_2","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[30,30,0]},"a":{"a":0,"k":[30,30,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":60,"h":60,"ip":0,"op":150.000006109625,"st":0,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"Circle","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[30,30,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":1,"k":[{"i":{"x":[0,0,1],"y":[1,1,1]},"o":{"x":[1,1,0.167],"y":[0,0,0.167]},"n":["0_1_1_0","0_1_1_0","1_1_0p167_0p167"],"t":0,"s":[0,0,100],"e":[100,100,100]},{"i":{"x":[0,0,0.833],"y":[0,0,0.833]},"o":{"x":[1,1,0.167],"y":[1,1,0.167]},"n":["0_0_1_1","0_0_1_1","0p833_0p833_0p167_0p167"],"t":15,"s":[100,100,100],"e":[100,100,100]},{"i":{"x":[0,0,0.833],"y":[1,1,0.833]},"o":{"x":[1,1,0],"y":[0,0,0]},"n":["0_1_1_0","0_1_1_0","0p833_0p833_0_0"],"t":129,"s":[100,100,100],"e":[0,0,100]},{"t":149.000006068894}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":2,"ty":"el","s":{"a":0,"k":[50,50]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"st","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"w":{"a":0,"k":2},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":2,"mn":"ADBE Vector Group"}],"ip":0,"op":150.000006109625,"st":0,"bm":0,"sr":1}]}

// import TabOne from './TabOne';
// import TabTwo from './TabTwo';
// import Head from '../app/Header';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FooterBar from './FooterBar';
import Spacer from './Spacer';
import styles from './style.js';

import { getTransactions, getBalance } from '../../actions/bank';
import { logout, getUserData } from '../../actions/member';

global.lastDate = 'date';
global.pieDictionaryData = new Object();
global.data2 = [
  {
    name: 'Food/Drink', amount: 7134.37, color: '#393e46', legendFontColor: '#393e46', legendFontSize: 12,
  },
  {
    name: 'Payment', amount: 47721, color: '#085f63', legendFontColor: '#085f63', legendFontSize: 12,
  },
  {
    name: 'Recreation', amount: 471, color: '#ffb677', legendFontColor: '#ffb677', legendFontSize: 12,
  },
  {
    name: 'Shops', amount: 3500, color: '#5e0a0a', legendFontColor: '#5e0a0a', legendFontSize: 12,
  },
  {
    name: 'Transfer', amount: 5974.68, color: '#145374', legendFontColor: '#145374', legendFontSize: 12,
  },
  {
    name: 'Travel', amount: 576.71, color: '#616f39', legendFontColor: '#616f39', legendFontSize: 12,
  },

];
const data = [, , 0.27];

const screenWidth = Dimensions.get('window').width;


class Dashboard extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    member: PropTypes.shape({
      error: PropTypes.string,
    }).isRequired,
  }

  static defaultProps = {
    match: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      entryItems: [
        {
          title: 'Item 1',
          balance: 0,
        },
        {
          title: 'Item 2',
        },
        {
          title: 'Item 3',
        },
      ],
      selected: 'key1',
      transactions: {},
    };
  }

  onValueChange(value: string) {
    this.setState({
      selected: value,
    });
  }

  componentWillMount() {
    const { member } = this.props;
    // getUserData(member);
    // console.log('dispatched member');
    // if (!member.bankSet) {
    //   Actions.replace('linkBank');
    // }
    // console.log('Trying to get member');
    // const { member } = this.props;
    // console.log(member);
    // getUserData(member.token);
  }

  componentDidMount = () => {
    this.animation.play();
    const { member } = this.props;
    getUserData(member);
    console.log('dispatched member');
    if (!member.bankSet) {
      Actions.replace('linkBank');
    }

    getTransactions(member.token,
      (res) => {
        this.setState({ transactions: res });
        const { transactions } = this.state;
        console.log("Got transactions");
        console.log(member)
      });

    getBalance(member.token,
      (res) => {
        console.log('reached balance update')
        const entryItems = this.state.entryItems.slice() //copy the array
        entryItems[0].balance = res; //execute the manipulations
        this.setState({ entryItems })
        console.log(this.state.entryItems);
      }
    );
  }

  renderJSXAmount(transactionAmount) {
    if (transactionAmount <= 0) {
      return (
        <Text style={styles.redTransactionText}>
$
          {transactionAmount}
        </Text>
      );
    }
    return (
      <Text style={styles.greenTransactionText}>
$
        {transactionAmount}
      </Text>
    );
  }

  formatDate(transactionDate) {
    const month = new Array();
    month[1] = 'January';
    month[2] = 'February';
    month[3] = 'March';
    month[4] = 'April';
    month[5] = 'May';
    month[6] = 'June';
    month[7] = 'July';
    month[8] = 'August';
    month[9] = 'September';
    month[10] = 'October';
    month[11] = 'November';
    month[12] = 'December';
    const splitDate = String(transactionDate).split('-');
    return `${month[splitDate[1].replace(/^0+/, '')]} ${splitDate[2]}`;
  }

  renderJSXDividers(transactionDate) {
    if (transactionDate != global.lastDate) {
      global.lastDate = transactionDate;
      return (
        <ListItem style={styles.listDividerBackgroundColor} itemDivider>
          <Text style={styles.listDividerText}>{this.formatDate(transactionDate)}</Text>
        </ListItem>
      );
    }
  }

  renderJSXPieChartData(transactions) {
    for (x in transactions) {
      if (transactions[x].category[0] in global.pieDictionaryData) {
        global.pieDictionaryData[transactions[x].category[0]] = global.pieDictionaryData[transactions[x].category[0]] + transactions[x].amount;
      } else {
        global.pieDictionaryData[transactions[x].category[0]] = transactions[x].amount;
      }
    }
    console.log(pieDictionaryData);
    // Object.entries(global.pieDictionaryData).forEach(([key, value]) => {
    //   var pieChartObject = new Object();
    //   pieChartObject.amount = value.toFixed(2);
    //   pieChartObject.color = 'rgba(131, 167, 234, 1)';
    //   pieChartObject.legendFontColor = '#7F7F7F';
    //   pieChartObject.legendFontSize = 15;
    //   pieChartObject.name = key;
    //   global.data2.push(pieChartObject);
    // });
  }

  _renderItem = ({ item, index }) => {
    const { member } = this.props;
    let { balance } = this.state;

    // console.log(item);
    if (index == 0) {

      if (!member.active){
        console.log('this is balance');
        console.log(member.active);
          return (
            <View style={styles.slide}>
              <View>
                <Text style={styles.name}>
                  Hello {member.firstname},
                </Text>
                <View style={styles.spacer}>
                </View>
                <Text style={styles.balance}>
                  ${item.balance.toFixed(2)}
                </Text>
                <Text style={styles.balanceTitle}>
                  Current Bank Balance
                </Text>
                <View style={styles.spacer}>
                </View>
                <Text style={styles.nonActiveText}>
                  [Name] helps you stay on top of your bills and keep your account positive. Borrow $250 now and pay us back interest-free automatically next paycheck.
                </Text>
                <View style={{ display: 'flex', height: 1, justifyContent: 'flex-start', alignItems: 'center'}} >
                <Image width={scale(130)} style={{opacity: 0.6}} source={require('../../images/monyCircle.png')} />
                </View>
              </View>
            </View>
          );
      }


    } if (index == 1) {
      // return (
      //   <View style={styles.slide}>
      //     <PieChart
      //       data={global.data2}
      //       width={screenWidth}
      //       height={220}
      //       chartConfig={{
      //         backgroundColor: '#eae9ef',
      //         backgroundGradientFrom: '#eae9ef',
      //         backgroundGradientTo: '#eae9ef',
      //         decimalPlaces: 2, // optional, defaults to 2dp
      //         color: (opacity = 1) => `rgba(46,139,87, ${opacity})`,
      //         style: {
      //           borderRadius: 16,
      //         },
      //       }}
      //       accessor="amount"
      //       backgroundColor="transparent"
      //       paddingLeft="15"
      //       absolute
      //     />
      //   </View>
      // );
      return (
        <View style={styles.slide}>
          <View style={styles.name}>
            <Text>
              Hello {member.firstname}
            </Text>
          </View>
        </View>
      );
    }
    // return (
    //   <View style={styles.slide}>
    //     <LineChart
    //       data={{
    //         labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    //         datasets: [{
    //           data: [
    //             Math.random() * 100,
    //             Math.random() * 100,
    //             Math.random() * 100,
    //             Math.random() * 100,
    //             Math.random() * 100,
    //             Math.random() * 100,
    //           ],
    //           color: (opacity = 1) => `rgba(255,255,255, ${opacity})`, // optional
    //           // strokeWidth: 5 // optional
    //           // strokeWidth = 2;
    //         }],
    //       }}
    //       width={Dimensions.get('window').width} // from react-native
    //       height={220}
    //       yAxisLabel="$"
    //       chartConfig={{
    //         backgroundColor: '#e20071',
    //         backgroundGradientFrom: '#11267a',
    //         backgroundGradientTo: '#253d93',
    //         decimalPlaces: 2, // optional, defaults to 2dp
    //         color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
    //         style: {
    //           borderRadius: 16,
    //         },
    //       }}
    //       bezier
    //       style={{
    //         marginVertical: 8,
    //         borderRadius: 16,
    //       }}
    //     />
    //   </View>
    // );
    return (
      <View style={styles.slide}>
        <View style={styles.name}>
          <Text>
            Hello {member.firstname}
          </Text>
        </View>
      </View>
    );
  }

  render = () => {
    const transactions = this.state.transactions.transactions;
    let transactionsListItems = [];
    { this.renderJSXPieChartData(transactions); }
    if (transactions) {
      transactionsListItems = // console.log(transaction);
                              transactions.map(transaction => (
                                <View key={JSON.stringify(transaction)}>
                                  { this.renderJSXDividers(transaction.date) }
                                  <ListItem style={styles.ListItemStyling} avatar>
                                    <Left style={styles.ListItemStyling}>
                                      <Thumbnail small square source={{ uri: transaction.uri }} />
                                    </Left>
                                    <Body style={styles.ListItemStyling}>
                                      <Text style={styles.TransactionText}>{transaction.name}</Text>
                                      <Text style={styles.LeftNoteText} note>{transaction.category[0]}</Text>
                                    </Body>
                                    <Right style={styles.RightNoteText}>
                                      { this.renderJSXAmount(transaction.amount) }
                                    </Right>
                                  </ListItem>
                                </View>
                              ));
    } else {
      transactionsListItems = (
        <ListItem>
          <Text>No transactions</Text>
        </ListItem>
      );
    }
    return (
      <Container style={{backgroundColor: 'white'}}>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.state.entryItems}
          renderItem={this._renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          height={verticalScale(50)}
          marginTop={20}
        />
        <Content style={{ flex: 1 }}>
          <Text>
            {this.state.balance}
          </Text>
          <List style={{ flex: 1 }}>
            {transactionsListItems}
          </List>
          <View>
          <Animation
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 80,
              height: 80,
            }}
            loop={true}
            source={anim}
          />
        </View>
          <Button onPress={() => {
            // this.props.logout(() => {
            //   Actions.replace('entry');
            // });
            console.log(this.state.entryItems.balance)
          }}
          >
            <Text>
              Log Out
            </Text>
          </Button>
        </Content>
        <FooterBar/>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(Dashboard);
