type InputProps = {
	label: string
	description?: string
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>
	isHorizontal?: boolean
}

export default function Input({
	label,
	description,
	inputProps,
	isHorizontal,
}: InputProps) {
	return (
		<div
			className={` w-full flex justify-between gap-3 flex-col ${isHorizontal ? 'md:flex-row md:items-center' : ''}`}
		>
			<Label label={label} description={description} />
			<input
				type="text"
				placeholder="Type here"
				{...inputProps}
				className={`input input-bordered w-full max-w-xs ${inputProps?.className}`}
			/>
		</div>
	)
}

export const Label = ({
	label,
	description,
	...labelProps
}: Pick<InputProps, 'description' | 'label'> &
	React.LabelHTMLAttributes<HTMLLabelElement>) => {
	return (
		<div className="flex flex-col flex-1">
			<label className="p-0 m-0 font-bold whitespace-nowrap" {...labelProps}>
				{label}
			</label>
			<span className="p-0 m-0 text-stone-500 whitespace-nowrap">
				{description}
			</span>
		</div>
	)
}
