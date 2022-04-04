import React from 'react';
import { NativeBaseProvider, Box } from 'native-base';

import { theme } from './core/theme';
import { TasksList } from './components/TasksList';

export const Shell = () => {
	return (
		<NativeBaseProvider theme={theme}>
			<Box safeArea flex={1} bg="purple.50">
				<TasksList />
			</Box>
		</NativeBaseProvider>
	);
};
