import {gql} from '@/__generated__/gql'
import {GraphQLClient} from 'graphql-request'
import React from "react"
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel"
import {ArrowLeftCircleIcon, ArrowRightCircleIcon, Bars3Icon} from '@heroicons/react/24/solid'
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,} from "@/components/ui/sheet"
import {Separator} from "@/components/ui/separator"
import Link from "next/link"

const bouquets = gql(`
		query Bouquets {
			bouquet {
				id
				name
				price
				hero_image {
					filename_disk
					filename_download
					title
					focal_point_x
					focal_point_y
				}
			}
		}
    `)

async function getData() {
    const endpoint = `https://cms.vivistidlosa.se/graphql`
    const client = new GraphQLClient(endpoint)
    const res = await client.request(bouquets)
    return res
}

export default async function Home() {
    const b = await getData()

    return (
        <main>
            <Sheet>
                <SheetTrigger className="absolute z-10 px-4 py-2">
                    <Bars3Icon className={"size-10 text-black opacity-60"}/>
                </SheetTrigger>

                <SheetContent side="left">
                    {/* Steal the "Focus on first interactive element" so it doesn't focus the X */}
                    <button/>
                    <SheetHeader>
                        <SheetTitle>
                            <img src="/logo.svg" alt="" className="w-[calc(150px+8dvw)]"/>
                        </SheetTitle>
                    </SheetHeader>
                    <div className={"py-4 text-2xl text-left"}>
                        <Link href="/">Prislista</Link>
                    </div>
                    <Separator/>
                    <div className={"py-4 text-2xl text-left"}>
                        <Link href="/">Vanliga frågor</Link>
                    </div>
                </SheetContent>
            </Sheet>

            <div className="absolute right-2 md:right-8 bottom-2 z-10 p-2">
                <p><img src="/logo.svg" alt="" className="w-[calc(100px+10dvw)]"/></p>
            </div>

            <Carousel className="w-full h-[calc(100dvh)]">
                <CarouselContent>
                    {b.bouquet.map(bouquet => (
                        <CarouselItem key={bouquet.id}>
                            <div className="relative w-full h-[calc(100dvh)]">

                                <picture className="w-full h-full">
                                    <source media="(min-width: 2000px)"
                                            srcSet={"https://cms.vivistidlosa.se/assets/" + bouquet.hero_image?.filename_disk}/>
                                    <source media="(min-width: 500px)"
                                            srcSet={"https://cms.vivistidlosa.se/assets/" + bouquet.hero_image?.filename_disk + '?key=2k'}/>
                                    <img
                                        alt="Slide 1"
                                        className="w-full h-full object-cover object-center"
                                        src={"https://cms.vivistidlosa.se/assets/" + bouquet.hero_image?.filename_disk + '?key=1k'}
                                    />
                                </picture>

                                <div
                                    className="absolute bottom-2 z-10 p-2 w-full bg-white bg-opacity-30 backdrop-blur-md"
                                >
                                    <div
                                        className="flex flex-col items-start lg:items-center justify-end text-center px-4 md:px-6">
                                        <p className="text-lg sm:text-2xl lg:text-4xl tracking-tight">
                                            {bouquet.name}
                                        </p>
                                        <p className="mb-2 max-w-md text-sm sm:text-xl lg:text-1xl tracking-tight">
                                            {bouquet.price}kr inkl moms
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hover:text-gray-300 focus:text-gray-300 transition-colors">
                    <ArrowLeftCircleIcon/>
                </CarouselPrevious>
                <CarouselNext
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hover:text-gray-300 focus:text-gray-300 transition-colors">
                    <ArrowRightCircleIcon/>
                </CarouselNext>
            </Carousel>
        </main>
    )
}
