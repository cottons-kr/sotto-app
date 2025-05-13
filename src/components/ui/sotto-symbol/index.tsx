interface SymbolProps {
	size?: number;
	className?: string;
}

export function SottoSymbol(props: SymbolProps) {
	const { size = 32, className } = props;

	return (
		<img
			className={className}
			src='/symbol.svg'
			alt='Sotto Symbol'
			style={{ width: size, height: size }}
		/>
	);
}
