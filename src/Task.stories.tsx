import React from 'react';
// @ts-ignore
import {ComponentMeta, ComponentStory} from "@storybook/react";
// @ts-ignore
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";
import {ReduxStoreProviderDecorator} from "./stories/decorators/ReduxStoreProviderDecorators";

export default {
    title: 'Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args: TaskPropsType) => <Task {...args} />;

export const TaskIsDoneStories = Template.bind({})
TaskIsDoneStories.args = {
    task: {id: '11', isDone: true, title: 'JS'},
    todolistID: "1"
};

export const TaskNotDoneStories = Template.bind({})
TaskNotDoneStories.args = {
    task: {id: '12', isDone: false, title: 'React'},
    todolistID: "1"
}
