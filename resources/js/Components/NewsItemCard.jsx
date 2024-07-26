import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";

export default function NewsItemCard({ newsItem, className }) {
    return (
        <div className={className}>
            {newsItem.image_cdn &&
                <img src={newsItem.image_cdn} className="rounded-lg h-72 object-cover object-center"

                alt="nature image"></img>
            }
            {newsItem.title &&
                    <Typography variant="h3" color="white" className="mb-2">
                        {newsItem.title}
                    </Typography>
                }

                <Typography variant="h6" color="white">
                    {newsItem.body}
                </Typography>
        </div>
    );
}
