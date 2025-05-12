export const ease = [0.4, 0, 0.2, 1];

export const transition = {
	duration: 0.2,
	ease,
};

export function getTransition(duration = 0.2, delay = 0) {
	return {
		duration,
		ease,
		delay,
	};
}
