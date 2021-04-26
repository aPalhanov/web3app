import Web3 from 'web3';
import SimpleSmartContract from '../build/contracts/SimpleSmartContract.json';

let web3;
let simpleSmartContract;

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
	const deploymentKey = Object.keys(SimpleSmartContract.networks)[0];
	return new web3.eth.Contract(
		SimpleSmartContract.abi,
		SimpleSmartContract
			.networks[deploymentKey]
			.address
	);
};

const initApp = () => {
	web3.eth.getAccounts()
		.then(console.log);
};

document.addEventListener('DOMContentLoaded', () => {
	initWeb3()
		.then(_web3 => {
			web3 = _web3;
			simpleSmartContract = initContract();
			initApp();
		})
		.catch(e => console.log(e.message));
});
