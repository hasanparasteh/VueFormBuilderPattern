<script setup lang="ts">
import { ref } from 'vue';
import FormBuilder from './components/FormBuilder';
import { FormBuilderInterface, FormStructure, InputTypes } from "./types/FormBuilder";

const email = ref<string>("");
const password = ref<string>("");
const age = ref<number | null>(null);

const structure = ref<FormStructure[]>([
  {
    type: InputTypes.Email,
    model: email,
  },
  {
    type: InputTypes.Password,
    model: password
  },
  {
    type: InputTypes.Number,
    model: age,
    min: 18,
    max: 100
  }
])

function handleFormUpdate({ index, data }: { index: number, data: any }) {
  if (index === 0) {
    email.value = data
  }
  if (index === 1) {
    password.value = data
  }

  if (index === 2) {
    age.value = data;
  }
}

function submitForm() {
  if (email.value.length === 0 || age.value === null || password.value.length === 0) {
    alert("Please fill all the fields")
  } else {
    alert(`You submitted form successfully! email is ${email.value} and your age is ${age.value}...`)
  }
}
</script>

<template>
  <main>
    <h1>Form Builder</h1>
    <h2 style="font-weight: 400;font-size: 1.2rem;margin-bottom: 8px;margin-top: 4px;">This is form builder! please use
      inspector tools of your favorite browser to check how it generates forms and
      inputs...</h2>
    <FormBuilder form-name="login" v-model:structure="structure" @formUpdate="handleFormUpdate">
      <template v-slot:actions>
        <button type="button" @click="submitForm">
          Submit
        </button>
      </template>
    </FormBuilder>

    <h2 style="margin-top: 25px">Here is the reactive values in parent component</h2>
    <div class="result">
      <p>Email is: <span>{{ email }}</span></p>
      <p>Password is: <span>{{ password }}</span></p>
      <p>Age is: <span>{{ age }}</span></p>
    </div>
  </main>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Lucida Sans',
    'Lucida Sans Regular',
    'Lucida Grande',
    'Lucida Sans Unicode',
    Geneva,
    Verdana,
    sans-serif;
}

::selection {
  background: firebrick;
  color: white;
}

body {
  background-color: #121212;
  color: white;
}

h1 {
  font-family: fantasy;
  font-size: 2rem;
}

h2 {
  font-family: fantasy;
  font-size: 1.5rem;
}

button {
  margin: 10px 0;
  background: none;
  border: none;
  font-size: 1rem;
  background-color: wheat;
  padding: 15px 25px;
  border-radius: 4px;
  color: #151515;
  font-weight: bold;
  cursor: pointer;
  width: 100%;

}

main {
  display: grid;
  place-content: center;
  max-width: 1000px;
  margin: 0 auto;
  height: 100vh;

}

.result {
  padding: 25px;
  background: wheat;
  border-radius: 4px;
  color: #181818;
}

.result p {
  font-size: 1.2rem;
  font-weight: bold;
}

.result span {
  font-size: 1.2rem;
  font-family: fantasy;
  font-weight: lighter;
}

form {
  display: block;
  margin: 0 auto;
  min-width: 100%;
}

input {
  background: none;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 2px 8px;

  display: block;
  min-width: 100%;
  margin: 10px auto;
  min-height: 42px;
  color: wheat;

}
</style>
