import SanityClient  from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";


export const client =SanityClient({
    projectId:`${process.env.SANITY_PROJECT_ID}`,
    dataset:"production",
    apiVersion:"2021-12-16",
    useCdn:true,
    token:`${process.env.SANITY_TOCKEN}`,


});




const builder=ImageUrlBuilder(client);

export const urlFor =(source)=>builder.image(source)