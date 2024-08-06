import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function SwimmerBioCard({ bio }) {
  return (
    <Card key={bio.id} className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={bio.image_cdn}
          alt="card-image"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {bio.swimmer_name}
        </Typography>
        <Typography>
         {bio.body}
        </Typography>
      </CardBody>
    </Card>
  );
}
