import { Button, Card, CardBody, CardHeader, Carousel, Typography } from "@material-tailwind/react";

export default function NewsItemCard({ newsItem, className }) {
    let date = new Date(newsItem.created_at);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return (
        <div className="md:flex md:justify-between md:items-center w-[80%] mx-auto">
            {/* <div className="relative h-full w-full">
                {newsItem.image_cdn &&
                     <img src={newsItem.image_cdn}
                     className="h-full w-full object-cover"
                     alt="nature image"></img>
                }
                <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
                <div className="w-3/4 text-center md:w-2/4">
                   {newsItem.title &&
                    <Typography
                    variant="h1"
                    color="white"
                    className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                    >
                    {newsItem.title}
                    </Typography>
                   }
                    <Typography
                    variant="lead"
                    color="white"
                    className="opacity-80"
                    >
                    {newsItem.body}
                    </Typography>
                </div>
                </div>
            </div> */}

                <div className="md:w-[45%] max-h-full">
                    {newsItem.image_cdn &&
                        <img src={newsItem.image_cdn}
                        className="w-full max-h-[790px] rounded-md"
                        >
                        </img>
                    }
                </div>

                <div className="w-[90%] text-center md:w-[50%]">
                {newsItem.title &&
                    <Typography
                    variant="h1"
                    color="white"
                    className="mb-2 text-3xl md:text-4xl lg:text-5xl"
                    >
                    {newsItem.title}
                    </Typography>
                   }

                   <Typography
                    variant="paragraph"
                    color="white"
                    className="opacity-80"
                    >
                    Posted: {month}-{day}-{year}
                    </Typography>

                    <Typography
                    variant="lead"
                    color="white"
                    className="opacity-80"
                    >
                    {newsItem.body}
                    </Typography>
                </div>
            </div>
    );
}
