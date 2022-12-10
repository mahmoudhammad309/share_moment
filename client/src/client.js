import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

console.log(process.env.REACT_APP_PUBLIC_GOOGLE_API_KEY_TOKEN)
export const client = sanityClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2021-08-31',
    useCdn: true,
    token: process.env.REACT_APP_SANITY_TOKEN
});

console.log('*********',client);
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source)