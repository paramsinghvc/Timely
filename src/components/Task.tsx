import React, { FC } from 'react';
import { HStack, Text, CheckCircleIcon, CircleIcon, IconButton } from 'native-base';
import * as R from 'ramda';
import { TouchableOpacity } from 'react-native';
import { TrashIcon } from '../icons';

export type TaskData = { id: string | number; text: string; completed: boolean };

export const Task: FC<{ data: TaskData; onPress: () => void; onDelete: () => void }> = ({
	data: { text, completed },
	onPress,
	onDelete,
}) => {
	const isCompleted = R.equals(completed, true);
	return (
		<TouchableOpacity onPress={onPress}>
			<HStack
				borderWidth="1"
				p="5"
				borderRadius="xl"
				borderColor={isCompleted ? 'primary.500' : 'muted.200'}
				alignItems="center"
				justifyContent="flex-start"
			>
				<HStack flex="1" alignItems="center">
					{isCompleted ? <CheckCircleIcon color="primary.500" size="4" /> : <CircleIcon color="muted.200" size="4" />}
					<Text ml="3" color={isCompleted ? 'primary.500' : 'muted.700'}>
						{text}
					</Text>
				</HStack>
				<IconButton
					icon={<TrashIcon width="18" height="18" viewBox="0 0 24 24" stroke="#ff9393" />}
					onPress={onDelete}
				/>
			</HStack>
		</TouchableOpacity>
	);
};
