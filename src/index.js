import './index.css';
import * as serviceWorker from './serviceWorker';

import {renderChat} from './Chat/deffer';
renderChat('root');

// import('./Chat/deffer').then(({renderChat}) => {
// 	renderChat('root');
// });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
