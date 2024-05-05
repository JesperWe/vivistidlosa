import {gql} from '@/__generated__/gql'
import {GraphQLClient} from 'graphql-request'
import React from "react"
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel"
import {ArrowLeftCircleIcon, ArrowRightCircleIcon} from '@heroicons/react/24/solid'

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
    let iconStyles = {color: "red", fontSize: "1.5em"}

    return (
        <main className="relative">
            <div className="absolute z-10 top-2 right-2 md:top-12 md:right-20">
                <p><img src="/logo.svg" alt="" width={300}/></p>
            </div>

            <Carousel className="w-full h-screen">
                <CarouselContent>
                    {b.bouquet.map(bouquet => (
                        <CarouselItem key={bouquet.id}>
                            <div className="relative w-full h-screen">

                                <img
                                    alt="Slide 1"
                                    className="w-full h-full object-cover object-center"
                                    src={"https://cms.vivistidlosa.se/assets/"+bouquet.hero_image?.filename_disk}
                                />

                                <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-4 md:px-6">

                                    <p className="text-3xl md:text-5xl tracking-tight">
                                        {bouquet.name}
                                    </p>
                                    <p className="mb-2 max-w-md text-xl md:text-2xl tracking-tight">
                                        {bouquet.price}kr inkl moms
                                    </p>
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
