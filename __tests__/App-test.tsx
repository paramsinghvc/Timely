/**
 * @format
 */

import 'react-native';
import React from 'react';
import { Shell } from '../src/Shell';

import { render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';

it('renders correctly', async () => {
	const { getByText } = await render(
		<NativeBaseProvider
			initialWindowMetrics={{
				frame: {
					width: 320,
					height: 640,
					x: 0,
					y: 0,
				},
				insets: {
					left: 0,
					right: 0,
					bottom: 0,
					top: 0,
				},
			}}
		>
			<Shell />
		</NativeBaseProvider>,
	);

	await getByText('My Tasks');
	// expect(true).toBeTruthy();
});
