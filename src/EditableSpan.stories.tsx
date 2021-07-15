import React from 'react';
// @ts-ignore
import {ComponentMeta, ComponentStory} from "@storybook/react";
// @ts-ignore
import {action} from "@storybook/addon-actions";
import {EditableSpan, EditableSpanPropType} from "./EditableSpan";

export default {
    title: 'EditableSpan',
    component: EditableSpan,
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args:EditableSpanPropType ) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({})
EditableSpanExample.args = {
    onChange: action("Value EditablSpan changed"),
    title: "any word would say"
};
