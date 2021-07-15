import React from 'react';
// @ts-ignore
import {ComponentMeta, Story} from "@storybook/react";
// @ts-ignore
import {ReduxStoreProviderDecorator} from "./stories/decorators/ReduxStoreProviderDecorators";
import AppWithRedux from "./AppWithRedux";

export default {
    title: 'AppWithRedux',
    component: AppWithRedux,
    argTypes: {},
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;


const Template: Story = (args: any) => <AppWithRedux/>;

export const AppWithReduxStories = Template.bind({})
AppWithReduxStories.args = {};