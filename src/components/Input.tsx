type InputProps = {
	label: string
	description: string
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export default function Input({ label, description, inputProps }: InputProps) {
	return (
		<div className="w-full flex md:items-center justify-between gap-3 flex-col md:flex-row">
			<Label label={label} description={description} />
			<input
				{...inputProps}
				type="text"
				placeholder="Type here"
				className="input input-bordered w-full max-w-xs"
			/>
		</div>
	)
}

export const Label = ({
	label,
	description,
}: Pick<InputProps, 'description' | 'label'>) => {
	return (
		<div className="flex flex-col flex-1">
			<span className="p-0 m-0 font-bold whitespace-nowrap">{label}</span>
			<span className="p-0 m-0 text-stone-500 whitespace-nowrap">
				{description}
			</span>
		</div>
	)
}
