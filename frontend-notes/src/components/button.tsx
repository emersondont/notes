import { MouseEventHandler, ReactNode } from 'react';

interface Props {
	children: ReactNode,
	onClick?: MouseEventHandler<HTMLButtonElement>
	className?: string
}

export default function Button(props: Props) {

	return (
		<button
			className={props.className +
			' flex gap-3 p-1 items-center justify-end hover:bg-secondary rounded-md duration-200 ease-out'}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}

