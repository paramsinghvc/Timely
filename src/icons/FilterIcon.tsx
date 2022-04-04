import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const FilterIcon = (props: SvgProps) => (
	<Svg
		width={24}
		height={24}
		fill="none"
		stroke="currentColor"
		strokeWidth={2.5}
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
	>
		<Path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
	</Svg>
);
