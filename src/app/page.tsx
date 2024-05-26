import {gql} from '@/__generated__/gql'
import {GraphQLClient} from 'graphql-request'
import React from "react"
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel"
import {ArrowLeftCircleIcon, ArrowRightCircleIcon, Bars3Icon} from '@heroicons/react/24/solid'
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,} from "@/components/ui/sheet"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"

const bouquets = gql(`
		query cms {
			bouquet(sort: ["sort"]) {
				id
				name
				price
				size
				hero_image {
					filename_disk
					filename_download
					title
					focal_point_x
					focal_point_y
				}
			}
			info(sort: ["sort"]) {
                id
                headline
                content
            }
		}
    `)

async function getData() {
    const endpoint = `https://cms.vivistidlosa.se/graphql`
    const client = new GraphQLClient(endpoint, {
        fetch: (url, options) => fetch(url, {...options, next: {tags: ['cms']}})
    })
    return await client.request(bouquets)
}

export default async function Home() {
    const cms = await getData()

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
                    <Accordion type="single" collapsible className="w-full">
                        {cms.info.map(info => (
                            <AccordionItem value={"item-" + info.id} key={info.id}>
                                <AccordionTrigger>{info.headline}</AccordionTrigger>
                                <AccordionContent>
                                    <div dangerouslySetInnerHTML={{__html: info.content ?? ''}}/>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </SheetContent>
            </Sheet>

            <Carousel className="w-full h-[calc(100dvh)]">
                <CarouselContent>
                    {cms.bouquet.map(bouquet => (
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
                                    className="absolute bottom-2 z-10 py-2 px-4 md:px-6 w-full bg-white bg-opacity-30 backdrop-blur-md flex justify-between items-center"
                                >
                                    <div className="flex items-baseline">
                                        <span className="text-lg sm:text-2xl lg:text-4xl tracking-tight">
                                            {bouquet.name}
                                        </span>
                                        <div>
                                        <span
                                            className="mb-2 max-w-md text-xs sm:text-s lg:text-xl tracking-tight px-2 flex items-center opacity-60"
                                        >
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg"><path
                                                d="M11.5 3.04999C11.7485 3.04999 11.95 3.25146 11.95 3.49999V7.49999C11.95 7.74852 11.7485 7.94999 11.5 7.94999C11.2515 7.94999 11.05 7.74852 11.05 7.49999V4.58639L4.58638 11.05H7.49999C7.74852 11.05 7.94999 11.2515 7.94999 11.5C7.94999 11.7485 7.74852 11.95 7.49999 11.95L3.49999 11.95C3.38064 11.95 3.26618 11.9026 3.18179 11.8182C3.0974 11.7338 3.04999 11.6193 3.04999 11.5L3.04999 7.49999C3.04999 7.25146 3.25146 7.04999 3.49999 7.04999C3.74852 7.04999 3.94999 7.25146 3.94999 7.49999L3.94999 10.4136L10.4136 3.94999L7.49999 3.94999C7.25146 3.94999 7.04999 3.74852 7.04999 3.49999C7.04999 3.25146 7.25146 3.04999 7.49999 3.04999L11.5 3.04999Z"
                                                fill="currentColor" fill-rule="evenodd"
                                                clip-rule="evenodd"></path>
                                            </svg>
                                            {bouquet.size}
                                        </span>
                                        </div>
                                    </div>

                                    <div>
                                        <p><img src="/logo.svg" alt="" className="w-[calc(100px+10dvw)]"/></p>
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
