import Web3 from 'web3';
import HelloWorld from '../build/contracts/HelloWorld.json';

let web3;
let helloWorld;

const initWeb3 = () => {
	return new Promise((resolve, reject) => {
		if (typeof window.ethereum !== 'undefined') {
			const web3 = new Web3(window.ethereum);
			window.ethereum.enable()
				.then(() => {
					resolve(
						new Web3(window.ethereum)
					);
				})
				.catch(e => {
					reject(e);
				});
			return;
		}
		if (typeof window.web3 !== 'undefined') {
			return resolve(
				new Web3(window.web3.currentProvider)
			);
		}
		resolve(new Web3('http://localhost:9545'));
	});
};


const initContract = () => {
	const deploymentKey = Object.keys(HelloWorld.networks)[0];
	return new web3.eth.Contract(
		HelloWorld.abi,
		HelloWorld
			.networks[deploymentKey]
			.address
	);
};

const initApp = () => {

	const $hello = document.getElementById('hello');

	helloWorld.methods.hello().call()
		.then(result => {
			$hello.innerHTML = result;
		});
};

document.addEventListener('DOMContentLoaded', () => {
	initWeb3()
		.then(_web3 => {
			web3 = _web3;
			helloWorld = initContract();
			initApp();
		})
		.catch(e => console.log(e.message));
});
