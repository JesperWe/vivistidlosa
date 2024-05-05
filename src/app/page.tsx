import {gql} from '@/__generated__/gql'
import {GraphQLClient} from 'graphql-request'

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
        <main className="">
            <div className="flex h-screen justify-center items-center">
                <div className="a">
                    <p><img src="/logo.svg" alt="" width={400}/></p>
                </div>
                {b.bouquet.map(bouquet => (
                    <div key={bouquet.id}>
                        {bouquet.name}
                    </div>
                ))}
            </div>
        </main>
    )
}

