import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { ScrollView, Text, VStack, HStack, Input, IconButton, ArrowUpIcon, Center } from 'native-base';
import * as R from 'ramda';
import uuid from 'react-native-uuid';

import { Task, TaskData } from './Task';
import { FilterIcon } from '../icons';
import { storage } from '../shared/storage';

export const TasksList = () => {
	const [todoText, setTodoText] = useState<string>();
	const [isFilterEnabled, setIsFilterEnabled] = useState(false);
	const [tasks, setTasks] = useState<TaskData[]>([]);
	const didMount = useRef(false);
	const filteredTasks = useMemo(
		() => (isFilterEnabled ? R.filter<TaskData>(R.propEq('completed', false))(tasks) : [...tasks]),
		[tasks, isFilterEnabled],
	);

	const handleTaskPress = (taskId: string | number) => () => {
		const toggleCompleteProp = R.over<TaskData, boolean>(R.lensProp('completed'), R.not);
		const matchTaskId = R.propEq('id', taskId);
		const updateTasks = R.map(R.when(matchTaskId, toggleCompleteProp));
		setTasks(updateTasks);
	};

	const handleSubmitTodo = () => {
		if (!todoText) {
			return;
		}
		const checkIfTextExists = R.find(R.propEq('text', todoText));
		if (checkIfTextExists(tasks)) {
			return;
		}
		const newTodo: TaskData = { id: uuid.v4() as string | number, text: todoText, completed: false };
		const prependTodo = R.prepend<TaskData>(newTodo);
		setTasks(prependTodo);
		setTodoText('');
	};

	const handleToggleFilter = () => {
		// const filterOutCompleted = R.filter(R.propEq('completed', isFilterEnabled));
		// setTasks(filterOutCompleted);
		setIsFilterEnabled(!isFilterEnabled);
	};

	const handleTaskDelete = (taskId: string | number) => () => {
		const getTask = R.propEq('id', taskId);
		const rejectTask = R.reject<TaskData>(getTask);
		setTasks(rejectTask);
	};

	const persistTasks = useCallback(async (_tasks: TaskData[]) => {
		console.log({ storeTasks: _tasks });
		await storage.setItem('tasks', JSON.stringify(_tasks));
	}, []);

	useEffect(() => {
		if (!didMount.current) {
			didMount.current = true;
			return;
		}
		persistTasks(tasks);
	}, [tasks, persistTasks]);

	const getTasksAsync = useCallback(async () => {
		try {
			const _tasks = await storage.getItem('tasks');
			console.log({ _tasks });
			if (_tasks) {
				const tasksArr = JSON.parse(_tasks) as TaskData[];
				console.log({ tasksArr });
				setTasks(tasksArr);
			}
		} catch (e) {
			console.error(e);
		}
	}, []);

	useEffect(() => {
		getTasksAsync();
	}, [getTasksAsync]);

	return (
		<VStack pt={7} flex={1}>
			<HStack justifyContent="space-between" px={7} alignItems="center">
				<Text
					color="muted.600"
					fontWeight="400"
					fontSize="4xl"
					accessibilityLabel="TaskListHeader"
					testID="TaskListHeader"
				>
					Aguante LOS MUCHACHOS
				</Text>
				<IconButton
					_icon={{ as: FilterIcon, color: isFilterEnabled ? 'primary.500' : 'muted.500' }}
					onPress={handleToggleFilter}
				/>
			</HStack>
			<ScrollView
				_contentContainerStyle={{
					mb: '4',
					px: 7,
				}}
			>
				<VStack space="5" py="8">
					{filteredTasks.map((task) => (
						<Task key={task.id} data={task} onPress={handleTaskPress(task.id)} onDelete={handleTaskDelete(task.id)} />
					))}
				</VStack>
				{tasks?.length === 0 ? (
					<Center>
						<Text color="muted.300" fontSize="25" textAlign="center">
							No tasks yet! Add one below
						</Text>
					</Center>
				) : filteredTasks?.length === 0 ? (
					<Center>
						<Text color="muted.300" fontSize="25" textAlign="center">
							Hooray! No pending tasks. {'\n'}Remove the filter to see tasks.
						</Text>
					</Center>
				) : null}
			</ScrollView>
			<HStack space="5" py="5" px={7}>
				<Input
					placeholder="Enter a new todo"
					w="75%"
					maxWidth="300px"
					mx="0"
					flex="1"
					variant="rounded"
					pl="5"
					value={todoText}
					onChangeText={setTodoText}
					autoFocus
					accessibilityLabel="taskInput"
					testID="taskInput"
				/>
				<IconButton
					size="lg"
					variant="solid"
					icon={<ArrowUpIcon size="6" />}
					borderRadius="30"
					onPress={handleSubmitTodo}
					accessibilityLabel="submitButton"
					testID="submitButton"
				/>
			</HStack>
		</VStack>
	);
};
