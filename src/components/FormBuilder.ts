import { h, VNode } from "vue";
import { FormBuilderInterface, FormStructure } from "../types/FormBuilder";

class FormBuilder implements FormBuilderInterface {
    protected form: VNode[] = [];

    createInput(index: number, emit: any, structure: FormStructure): VNode {
        const inputProps = {
            type: structure.type,
            value: structure.model,
            'data-index': index,
            onInput: (event: InputEvent) => {
                const input = event.target as HTMLInputElement;
                emit('formUpdate', {
                    index,
                    data: input.value
                })
            }
        };

        if (structure.max !== undefined) {
            Object.assign(inputProps, {max: structure.max})
        }

        if (structure.min !== undefined) {
            Object.assign(inputProps, { min: structure.min });
        }

        return h(
            "input",
            inputProps    
        )
    }

    createInputs(inputs: FormStructure[], emit: any): this {
        for (let i = 0; i < inputs.length; i++) {
            this.form.push(this.createInput(i, emit, inputs[i]))
        }

        return this;
    }

    createForm(formName: string, slots: any): VNode {
        return h(
            "form",
            {
                id: formName,
                onSubmit: () => {
                    console.log("Submited");
                }
            },

            [
                ...this.form,
                slots.actions()
            ],
        )
    }
}


export default {
    props: {
        structure: Array<FormStructure>,
        formName: String,
    },
    emits: ["formUpdate"],
    render(props: { structure: FormStructure[]; formName: string; }): any {
        const builder = new FormBuilder().createInputs(props.structure, this.$emit)
        return builder.createForm(props.formName, this.$slots);
    }
}