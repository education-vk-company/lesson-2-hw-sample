const KB = Math.pow(2, 10);
const MB = Math.pow(KB, 2);

const sizes = [
	{
		name: 'Кбайт',
		size: KB
	},
	{
		name: 'Мбайт',
		size: MB
	}
];

const imagePattern = /^image\.*/;

function getReadableSize (size) {
	return sizes.reduce((result, current, index, array) => {
		if (!result.length && (
				100 * current.size > size || index === array.length - 1
		)) {
			result = (size / current.size);
			result = [result.toFixed(result > 1 ? 0 : 2), current.name].join(' ');
		}
		return result;
	}, '');
}


export {getReadableSize, KB, MB, imagePattern};