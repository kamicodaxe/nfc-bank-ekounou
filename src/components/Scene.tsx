'use client';
import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";

const DynamicPanoramaViewer = dynamic(() => import('react-pannellum-next').then(c => c.PanoramaViewer), {
    ssr: false, // Disable server-side rendering for this component
});

const TOUR = [
    {
        title: "RDC",
        id: "rdc",
        images: [
            {
                id: 0,
                src: '/images/1.jpg',
                title: 'Entrée, Caisses'

            },
            {
                id: 1,
                src: '/images/2.jpg',
                title: 'BOS, Acceuil'
            }
        ]
    },
    {
        title: "Etage",
        id: "etage",
        images: [
            {
                id: 0,
                src: '/images/1.jpg',
                title: 'Entrée, Caisses'

            }
        ]
    }

]

const Scene = () => {
    const [selectedImageId, setSelectedImageId] = useState(0)
    const [selectedTourItemId, setSelectedTourItemId] = useState("rdc")

    const onImageClick = (id: number) => {
        setSelectedImageId(id)
    }

    const selectedImageSrc = useMemo(() => {
        const _selectedImage = TOUR.filter(
            tourItem => tourItem.id == selectedTourItemId
        )[0]
            .images.filter(image => image.id == selectedImageId)[0]

        return _selectedImage.src
    }, [selectedImageId]
    )

    return (
        <div className="relative w-screen h-screen">

            <div className="flex flex-col justify-center items-center absolute mb-4 top-2 left-0 right-0 pointer-events-none z-50 ">

                <div className="flex justify-center items-center p-2 space-x-4 bg-black bg-opacity-50 pointer-events-auto rounded-lg">
                    {
                        TOUR.map(
                            tourItem => (
                                <button
                                    style={{
                                        backgroundColor: selectedTourItemId == tourItem.id ? 'red' : 'initial'
                                    }}
                                    onClick={() => setSelectedTourItemId(tourItem.id)}
                                    id={tourItem.id}
                                    className="bg-black text-white p-2 px-4  rounded-lg">{tourItem.title}</button>
                            )
                        )
                    }
                </div>

                <Link href='/join'>
                    <span className="relative text-white p-2 px-4 mt-2 rounded-lg pointer-events-auto inline-block">
                        Join waiting list.
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 absolute -top-0 inline">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                    </span>
                </Link>

            </div>

            <DynamicPanoramaViewer
                // @ts-ignore
                autoLoad
                autoRotate={-2}
                imagePath={selectedImageSrc}
                hotSpots={[]}
            />

            <div className="flex justify-center items-center absolute space-x-2 mb-4 bottom-0 left-0 right-0 pointer-events-none">
                {
                    TOUR.filter(
                        tourItem => tourItem.id == selectedTourItemId
                    )[0].images.map(
                        (image, index) => (
                            <div
                                key={image.id}
                                onClick={() => onImageClick(image.id)}
                                className={`h-20 w-32 relative bg-yellow-600 bg-cover pointer-events-auto border-2`}
                                style={{
                                    backgroundImage: `url('${image.src}')`,
                                    left: 16 * (index + 1) + 'px',
                                    borderColor: selectedImageId == image.id ? 'red' : 'transparent'
                                }}
                            >
                                <p
                                    className="text-center -translate-y-8 w-full text-sm"
                                    style={{
                                        color: selectedImageId == image.id ? 'red' : 'initial'
                                    }}
                                >
                                    {
                                        image.title
                                    }
                                </p>
                            </div>
                        )
                    )

                }
            </div>

            <span className="absolute right-2 bottom-2 text-white">
                Spherical 3d by Loïc KAMI.
            </span>

        </div>
    );
}
export default Scene;