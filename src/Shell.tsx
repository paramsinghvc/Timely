import React from 'react';
import { NativeBaseProvider, Box } from 'native-base';
// import codePush from 'react-native-code-push';

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
// 	checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
// 	mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
// 	installMode: codePush.InstallMode.IMMEDIATE,
// 	updateDialog: {
// 		appendReleaseDescription: true,
// 		title: 'A new update is available!',
// 	},
// };

// export const Shell = codePush(codePushOptions)(ShellComp);
export const Shell = ShellComp;
