import Image from 'next/image'
import { FC } from 'react'

type Props = {
	imgSrc: string
	imgSrc2?: string
	imgAlt?: string
	children?: React.ReactNode
}

const OverlayContainer: FC<Props> = ({ imgSrc, imgSrc2, imgAlt, children }) => (
	<div className="relative overflow-hidden flex justify-center items-center group transition-opacity duration-[5000ms]">
		{imgSrc2 ? (
			<>
				{/* Desktop image */}
				<div className="hidden sm:block w-full">
					<Image
						className="transition-transform duration-500 group-hover:scale-110"
						src={imgSrc}
						alt={imgAlt || ''}
						width={858}
						height={414}
						layout="responsive"
					/>
				</div>

				{/* Mobile image */}
				<div className="block sm:hidden w-full">
					<Image
						className="transition-transform duration-500 group-hover:scale-110"
						src={imgSrc2}
						alt={imgAlt || ''}
						width={710}
						height={710}
						layout="responsive"
					/>
				</div>
			</>
		) : (
			<Image
				className="transition-transform duration-500 group-hover:scale-110"
				src={imgSrc}
				alt={imgAlt || ''}
				width={710}
				height={710}
			/>
		)}

		{children}

		{/* Overlay background */}
		<div className="absolute top-0 w-full h-full bg-gray-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300" />

		{/* Overlay border bottom-left */}
		<div
			className="
      absolute w-0 h-0
      right-[10%] bottom-[10%]
      transition-all duration-300
      group-hover:w-[80%] group-hover:h-[80%]
      group-hover:border-l group-hover:border-b group-hover:border-white
    "
			style={{
				transitionDelay: '0s, 0.3s',
				transitionProperty: 'width, height',
			}}
		/>

		{/* Overlay border top-right */}
		<div
			className="
      absolute w-0 h-0
      left-[10%] top-[10%]
      transition-all duration-300
      group-hover:w-[80%] group-hover:h-[80%]
      group-hover:border-r group-hover:border-t group-hover:border-white
    "
			style={{
				transitionDelay: '0.6s, 0.9s',
				transitionProperty: 'width, height',
			}}
		/>
	</div>
)

export default OverlayContainer
