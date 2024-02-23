import './style.css'
import van from "vanjs-core";
import { Route, routeTo } from 'vanjs-router'
import { Login } from './components/login';
import { Assistant } from './components/assistant';

const { button, div, header } = van.tags
console.log('import.meta.env', import.meta.env);
const App = () => {
  return div(
      header(
        button({ onclick: () => routeTo('home') }, 'Back To Home'),
        button({ onclick: () => routeTo('assistant') }, 'Go To Assistant'),
      ),
      Route({ name: 'home' },Login(),),
      Route({ name: 'assistant' }, Assistant()),
  )
}

van.add(document.body, App());
