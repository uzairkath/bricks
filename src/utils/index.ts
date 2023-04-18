import { BigNumber } from 'ethers';
import Swal2 from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const Swal = withReactContent(Swal2);

export const Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener('mouseenter', Swal.stopTimer);
		toast.addEventListener('mouseleave', Swal.resumeTimer);
	},
});

export function getBalance(balance: BigNumber, decimals = 18): number {
	return Number(balance.div(BigNumber.from(10).pow(decimals)));
}

export const getDisplayBalance = (
	balance: BigNumber,
	decimals = 18,
	fractionDigits = 3
) => {
	if (decimals < 3) {
		fractionDigits = 0;
	}
	const value = getBalance(balance, decimals - fractionDigits);
	return value / 10 ** fractionDigits;
};

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
	return getDisplayBalance(balance, decimals, 4);
};
