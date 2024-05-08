import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { useEffect, useRef, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { BarcodeDetector } from 'barcode-detector/pure'

function Root() {
	const [isCameraOpen, setCameraOpen] = useState(false)
	const camRef = useRef<HTMLVideoElement>(null)
	const [stream, setStream] = useState<MediaStream | null>(null)
	const [, setScannedQrCode] = useState<string>('')
	// const navigate = useNavigate()

	const handleOpenCamera = async () => {
		setCameraOpen(true)
		setStream(
			await navigator.mediaDevices.getUserMedia({
				video: {
					facingMode: { ideal: 'environment' },
				},
				audio: false,
			}),
		)
	}

	useEffect(() => {
		if (!camRef.current || !stream) return

		const camEl = camRef.current
		if (!camEl) return
		camEl.srcObject = stream
		camEl.play()
	}, [isCameraOpen, stream])

	const handleCloseCamera = () => {
		setCameraOpen(false)
		setStream(null)
	}

	useEffect(() => {
		const videoEl = camRef.current
		if (!isCameraOpen || !videoEl) return
		const barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] })
		const intervalId = window.setInterval(async () => {
			const barcodes = await barcodeDetector.detect(videoEl)
			if (barcodes[0]?.rawValue) {
				setScannedQrCode(barcodes[0]?.rawValue)
				window.alert(barcodes[0]?.rawValue)
				clearInterval(intervalId)
				return
			}
		}, 1000)

		return () => clearInterval(intervalId)
	}, [isCameraOpen])

	return (
		<>
			<div className="rootImg " />
			<div className="container mx-auto text-white">
				<Navbar />
				<div className="h-[60rem] w-full flex flex-col bg-stone-950 bg-opacity-50 justify-center items-center gap-5">
					<div className="h-[75%] xl:h-4/5 w-full flex flex-col justify-center items-start px-[10%] pt-20 gap-5">
						<h1 className="text-4xl md:text-7xl text-white tracking-wider">
							Podróż LARP
						</h1>
						<p className="text-2xl md:text-5xl text-white tracking-wider">
							Zaczyna się teraz
						</p>
						<button className="btn bg-red-500 hover:bg-red-700 border-none text-white mt-5 md:mt-10 md:ml-10 md:scale-150">
							Zarezerwuj
						</button>
					</div>
					<div className="flex justify-center items-center flex-col w-full min-h-[25%] xl:h-1/5 bg-black border-t-white border-t-2">
						<div className="flex flex-col items-center md:w-3/5">
							<div className="divider divider-error text-red-600 font-semibold md:text-xl italic">
								DEKRETEM KRÓLEWSKIM
							</div>
							<p className="w-2/3 text-center md:text-xl">
								Królowa Dworu Królewskiego zaprasza Cię na podróż przez mglę
								czasu na wydarzenie LARP, gdzie brać udział będzie grupa rycerzy
								i ich majestatyczne konie.
							</p>
						</div>
						<div className="flex pt-5 gap-5">
							<div className="navbar-end">
								<button
									onClick={isCameraOpen ? handleCloseCamera : handleOpenCamera}
									className="btn bg-red-500 hover:bg-red-600 text-white"
								>
									Skanuj kod QR
								</button>
							</div>
							<div className="navbar-end">
								<button className="btn bg-red-500 hover:bg-red-600 text-white">
									Skanuj NFC
								</button>
							</div>
						</div>
					</div>
					{isCameraOpen && (
						<video ref={camRef} id="stream" className="w-full h-[400px]" />
					)}
				</div>
				<div className="h-full w-full flex flex-col bg-stone-950 bg-opacity-50 justify-center items-center gap-5">
					<div className="flex flex-col md:flex-row h-full w-full bg-stone-900 ">
						<div className="md:w-1/2 flex flex-col justify-center items-center text-center md:text-2xl gap-10 p-20">
							<p>WITAJ W XXXXXXXXXXXXXXX</p>
							<p>
								Najwyżsi rycerze naszego królestwa stawią czoła wyzwaniu,
								walcząc z siłą stalowych mieczy oraz mocą serc, aby wyłonić
								zwycięzcę, który zasługuje na miano obroncy tronu. Dołącz do nas
								podczas uczty pełnej okazałych przyjęć i podniesienia kielicha
								dla naszej Władczyni.
							</p>
							<p>XXXXXXXXXXXXXXXXX</p>
							<p>
								Wspomnienia czekają, by je wcielić w życie, a niezapomniana
								bitwa na wieki oczekuje na Twój przyjazd.
							</p>
							<p className="text-red-500 italic text-xl md:text-3xl pt-10">
								Niech żyje Królowa!
							</p>
						</div>
						<div className="md:w-1/2 md:pl-48 flex items-end bg-black rootMask">
							<img className="bg-stone-900" src="/root/queen.png" />
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	)
}

export default Root
