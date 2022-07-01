import React from 'react';
import { NativeBaseProvider, Box } from 'native-base';
// import CodePush from 'react-native-code-push';

import { theme } from './core/theme';
import { TasksList } from './components/TasksList';

const ShellComp = () => {
	return (
		<NativeBaseProvider theme={theme}>
			<Box safeArea flex={1} bg="purple.50">
				<TasksList />
			</Box>
		</NativeBaseProvider>
	);
};

// const codePushOptions = {
// 	checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
// 	mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
// 	installMode: CodePush.InstallMode.IMMEDIATE,
// 	updateDialog: {
// 		appendReleaseDescription: true,
// 		title: 'A new update is available!',
// 	},
// };

// export const Shell = CodePush(codePushOptions)(ShellComp);
export const Shell = ShellComp;
