// // const config = require('./config.json');
// import React, { Component } from 'react';
// import config from './config.json';
// module.exports = function () {
// 	const greet = document.createElement('div');
// 	greet.textContent = config.greetText;
// 	return greet;
// }

import React from 'react';
import config from './config.json';
// import styles from './Greeter.css';
import styles from './GreeterStyle.css';

class Greeter extends React.Component {
	render () {
		return (
			<div className={styles.roots}>
				{
					config.greetText
				}
			</div>
		);
	}
}
export default Greeter;
