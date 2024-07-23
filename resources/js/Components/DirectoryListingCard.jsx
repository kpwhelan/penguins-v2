import { Card, CardBody, Typography } from "@material-tailwind/react";

export default function DirectoryListingCard({ user }) {
    return (
        <Card className="mt-6 w-96">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {user.first_name} {user.last_name}
                </Typography>
                <Typography>
                    {user.street_address}
                </Typography>
                <Typography>
                    {user.city} {user.state}
                </Typography>
                <Typography>
                    {user.zipcode}
                </Typography>
                <Typography>
                    {user.phone_number}
                </Typography>
                <p className="text-blue">
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                </p>
            </CardBody>
        </Card>
    );
}
