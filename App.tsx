import React from 'react';
import { Shell } from './src/Shell';
import codePush from 'react-native-code-push';

const App = () => {
	return <Shell />;
};

export default codePush(App);
