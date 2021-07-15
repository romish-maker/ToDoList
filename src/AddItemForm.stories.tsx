import React from 'react';
import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";

// @ts-ignore
import {ComponentMeta, ComponentStory} from "@storybook/react";
// @ts-ignore
import {action} from "@storybook/addon-actions";

export default {
    title: 'AddItemForm',
    component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args: AddItemFormPropsType) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({})
AddItemFormExample.args = {
    addItem: action('button inside form clicked')
}
