// @ts-ignore Svelte shims import guard para o compilador TSimport './app.css';

import { mount } from 'svelte';
import App from './App.svelte';

const app =  mount(App, {
  target: document.body,
  props: { name: 'world' }
});

export default app;