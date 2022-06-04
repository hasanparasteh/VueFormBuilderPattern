import { Ref, VNode } from "vue";

export enum InputTypes {
    Email = "email",
    Text = "text",
    Password = "password",
    Number = "number"
}

export interface FormStructure {
    readonly type: InputTypes,
    readonly model: Ref,
    readonly min?: number
    readonly max?: number
}

export interface FormBuilderInterface {
    createInput(index: number, emit: any, structure: FormStructure): VNode,
    createInputs(inputs: FormStructure[], emit: any): this,
    createForm(formName: string, slots: any): VNode
}