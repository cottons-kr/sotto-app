interface SymbolProps {
	size?: number;
}

export function SottoSymbol(props: SymbolProps) {
	const { size = 32 } = props;

	return (
		<img
			src='/symbol.svg'
			alt='Sotto Symbol'
			style={{ width: size, height: size }}
		/>
	);
}
